import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { races, entries, horses, results, stakes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { simulateRace } from "@/lib/races/simulate";
import { credit } from "@/lib/db/ledger";

/**
 * Payout structure: pool all stakes for the race, distribute to winners.
 * 1st place stakers split 60% of the pool proportional to their stake.
 * 2nd place stakers split 25%.
 * 3rd place stakers split 15%.
 * If nobody staked on a placing horse, that share rolls up to the next tier.
 * If no stakes at all, nothing to pay out.
 */
const PAYOUT_SHARES = [
  { position: 1, share: 0.6 },
  { position: 2, share: 0.25 },
  { position: 3, share: 0.15 },
];

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: raceId } = await params;

  const [race] = await db.select().from(races).where(eq(races.id, raceId));
  if (!race) {
    return NextResponse.json({ error: "Race not found" }, { status: 404 });
  }
  if (race.status === "finished") {
    return NextResponse.json(
      { error: "Race already finished" },
      { status: 400 }
    );
  }

  const raceEntries = await db
    .select({
      entryId: entries.id,
      horseId: entries.horseId,
      lane: entries.lane,
      acceleration: horses.acceleration,
      stamina: horses.stamina,
      topSpeed: horses.topSpeed,
      leftLegsStrength: horses.leftLegsStrength,
      rightLegsStrength: horses.rightLegsStrength,
      flexibility: horses.flexibility,
      height: horses.height,
      length: horses.length,
    })
    .from(entries)
    .innerJoin(horses, eq(entries.horseId, horses.id))
    .where(eq(entries.raceId, raceId));

  if (raceEntries.length < 2) {
    return NextResponse.json(
      { error: "Need at least 2 entries to run a race" },
      { status: 400 }
    );
  }

  const placements = simulateRace(
    raceEntries.map((e) => ({ ...e, lane: e.lane ?? 1 })),
    { lengthFurlongs: race.lengthFurlongs, surface: race.surface }
  );

  const [result] = await db
    .insert(results)
    .values({ raceId, placements })
    .returning();

  await db
    .update(races)
    .set({ status: "finished" })
    .where(eq(races.id, raceId));

  // --- Payouts ---
  const raceStakes = await db
    .select()
    .from(stakes)
    .where(eq(stakes.raceId, raceId));

  if (raceStakes.length > 0) {
    const totalPool = raceStakes.reduce((sum, s) => sum + s.amount, 0);
    const winningEntryIds = new Map(
      placements.map((p) => [p.entryId, p.position])
    );

    let unclaimedShare = 0;

    for (const tier of PAYOUT_SHARES) {
      const tierStakes = raceStakes.filter(
        (s) => winningEntryIds.get(s.entryId) === tier.position
      );

      if (tierStakes.length === 0) {
        unclaimedShare += tier.share;
        continue;
      }

      const tierPool =
        Math.floor(totalPool * (tier.share + unclaimedShare));
      unclaimedShare = 0;

      const tierTotal = tierStakes.reduce((sum, s) => sum + s.amount, 0);

      for (const stake of tierStakes) {
        const payout = Math.floor(
          tierPool * (stake.amount / tierTotal)
        );
        if (payout > 0) {
          await credit({
            userId: stake.userId,
            amount: payout,
            referenceType: "stake_payout",
            referenceId: raceId,
          });
          await db
            .update(stakes)
            .set({ payout })
            .where(eq(stakes.id, stake.id));
        }
      }
    }
  }

  return NextResponse.json(result, { status: 201 });
}

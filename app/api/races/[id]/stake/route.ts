import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { races, entries, stakes } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth/config";
import { debit } from "@/lib/db/ledger";

const MIN_STAKE = 10;
const MAX_STAKE = 500;

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: raceId } = await params;
  const { entryId, amount } = await req.json();

  if (!entryId || !amount) {
    return NextResponse.json(
      { error: "entryId and amount are required" },
      { status: 400 }
    );
  }

  if (amount < MIN_STAKE || amount > MAX_STAKE) {
    return NextResponse.json(
      { error: `Stake must be between ${MIN_STAKE} and ${MAX_STAKE} credits` },
      { status: 400 }
    );
  }

  const [race] = await db.select().from(races).where(eq(races.id, raceId));
  if (!race) {
    return NextResponse.json({ error: "Race not found" }, { status: 404 });
  }
  if (race.status !== "open") {
    return NextResponse.json(
      { error: "Race is not accepting stakes" },
      { status: 400 }
    );
  }

  const [entry] = await db
    .select()
    .from(entries)
    .where(and(eq(entries.id, entryId), eq(entries.raceId, raceId)));
  if (!entry) {
    return NextResponse.json(
      { error: "Entry not found in this race" },
      { status: 404 }
    );
  }

  const existing = await db
    .select()
    .from(stakes)
    .where(
      and(
        eq(stakes.raceId, raceId),
        eq(stakes.userId, session.user.id),
        eq(stakes.entryId, entryId)
      )
    );
  if (existing.length > 0) {
    return NextResponse.json(
      { error: "You already have a stake on this horse in this race" },
      { status: 409 }
    );
  }

  const success = await debit({
    userId: session.user.id,
    amount,
    referenceType: "stake",
    referenceId: raceId,
  });

  if (!success) {
    return NextResponse.json(
      { error: "Insufficient credits" },
      { status: 400 }
    );
  }

  const [stake] = await db
    .insert(stakes)
    .values({
      raceId,
      userId: session.user.id,
      entryId,
      amount,
    })
    .returning();

  return NextResponse.json(stake, { status: 201 });
}

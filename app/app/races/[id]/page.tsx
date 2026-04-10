import { db } from "@/lib/db";
import {
  races,
  entries,
  horses,
  results,
  weeks,
  stakes,
  balances,
  type RaceResult,
} from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth/config";
import { EnterHorseForm } from "@/components/races/enter-horse-form";
import { PlaceStakeForm } from "@/components/races/place-stake-form";
import { RunRaceButton } from "@/components/races/run-race-button";
import Link from "next/link";

const MEDAL = ["", "\u{1F947}", "\u{1F948}", "\u{1F949}"];

export default async function RaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const [race] = await db.select().from(races).where(eq(races.id, id));
  if (!race) notFound();

  const [week] = await db
    .select()
    .from(weeks)
    .where(eq(weeks.id, race.weekId));

  const raceEntries = await db
    .select({
      entryId: entries.id,
      horseId: entries.horseId,
      guardianId: entries.guardianId,
      lane: entries.lane,
      horseName: horses.name,
      baseColor: horses.baseColor,
    })
    .from(entries)
    .innerJoin(horses, eq(entries.horseId, horses.id))
    .where(eq(entries.raceId, id));

  const [raceResult] = await db
    .select()
    .from(results)
    .where(eq(results.raceId, id));

  const placements: RaceResult[] | null = raceResult?.placements ?? null;

  // Stakes data
  const raceStakes = await db
    .select()
    .from(stakes)
    .where(eq(stakes.raceId, id));

  const totalPool = raceStakes.reduce((sum, s) => sum + s.amount, 0);

  const userStakes = session?.user?.id
    ? raceStakes.filter((s) => s.userId === session.user!.id)
    : [];

  const stakesByEntry = new Map<string, number>();
  for (const s of raceStakes) {
    stakesByEntry.set(s.entryId, (stakesByEntry.get(s.entryId) ?? 0) + s.amount);
  }

  // User balance and eligible horses
  const balance = session?.user?.id
    ? await db
        .select()
        .from(balances)
        .where(eq(balances.userId, session.user.id))
        .then((rows) => rows[0]?.amount ?? 0)
    : 0;

  const enteredHorseIds = new Set(raceEntries.map((e) => e.horseId));
  const userHorses = session?.user?.id
    ? await db
        .select({ id: horses.id, name: horses.name })
        .from(horses)
        .where(eq(horses.guardianId, session.user.id))
    : [];
  const eligibleHorses = userHorses.filter((h) => !enteredHorseIds.has(h.id));

  const userStakedEntryIds = new Set(userStakes.map((s) => s.entryId));
  const stakableEntries = raceEntries.filter(
    (e) => !userStakedEntryIds.has(e.entryId)
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/app/races"
        className="text-xs text-foreground/40 hover:text-foreground/60 transition-colors"
      >
        &larr; All races
      </Link>

      <div className="mt-4 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{race.name}</h1>
          <p className="text-sm text-foreground/50 mt-1">
            {week?.label} &middot; {race.trackName} &middot; {race.surface}{" "}
            &middot; {race.lengthFurlongs}f
          </p>
          <p className="text-xs text-foreground/40 mt-1">
            {new Date(race.scheduledAt).toLocaleString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        </div>

        {race.status === "open" && raceEntries.length >= 2 && (
          <RunRaceButton raceId={race.id} />
        )}
      </div>

      {/* Pool info */}
      {totalPool > 0 && (
        <div className="mt-4 inline-block rounded-lg border border-foreground/10 bg-foreground/[0.03] px-4 py-2">
          <span className="text-xs text-foreground/40">Stake pool: </span>
          <span className="text-sm font-mono text-foreground/80">
            {totalPool}
          </span>
          <span className="text-xs text-foreground/40"> credits</span>
        </div>
      )}

      {/* Results */}
      {placements && (
        <section className="mt-10">
          <h2 className="text-sm font-mono uppercase tracking-widest text-foreground/40 mb-4">
            Results
          </h2>
          <div className="space-y-2">
            {placements.map((p) => {
              const entry = raceEntries.find((e) => e.entryId === p.entryId);
              const entryStakeTotal = stakesByEntry.get(p.entryId) ?? 0;
              return (
                <div
                  key={p.entryId}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
                    p.position === 1
                      ? "border-yellow-500/30 bg-yellow-500/5"
                      : "border-foreground/10 bg-foreground/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg w-8">
                      {MEDAL[p.position] || `#${p.position}`}
                    </span>
                    <div
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: entry?.baseColor ?? "#666" }}
                    />
                    <span className="font-medium">
                      {entry?.horseName ?? p.horseId}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    {entryStakeTotal > 0 && (
                      <span className="text-xs text-foreground/40">
                        {entryStakeTotal} staked
                      </span>
                    )}
                    <span className="text-sm font-mono text-foreground/50">
                      {p.finishTime}s
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Your stakes */}
      {userStakes.length > 0 && (
        <section className="mt-10">
          <h2 className="text-sm font-mono uppercase tracking-widest text-foreground/40 mb-4">
            Your Stakes
          </h2>
          <div className="space-y-2">
            {userStakes.map((s) => {
              const entry = raceEntries.find((e) => e.entryId === s.entryId);
              const isWinner = s.payout > 0;
              const net = s.payout - s.amount;
              return (
                <div
                  key={s.id}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
                    isWinner
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : "border-foreground/10 bg-foreground/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: entry?.baseColor ?? "#666" }}
                    />
                    <span className="text-sm font-medium">
                      {entry?.horseName ?? s.entryId}
                    </span>
                    <span className="text-xs text-foreground/40">
                      {s.amount} credits
                    </span>
                  </div>
                  {race.status === "finished" && (
                    <span
                      className={`text-sm font-mono ${
                        net > 0
                          ? "text-emerald-400"
                          : net < 0
                            ? "text-red-400"
                            : "text-foreground/50"
                      }`}
                    >
                      {net > 0 ? `+${net}` : net === 0 ? "broke even" : net}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Entries */}
      <section className="mt-10">
        <h2 className="text-sm font-mono uppercase tracking-widest text-foreground/40 mb-4">
          Entries ({raceEntries.length})
        </h2>
        {raceEntries.length === 0 ? (
          <p className="text-foreground/40 text-sm">No entries yet.</p>
        ) : (
          <div className="space-y-2">
            {raceEntries.map((e) => (
              <div
                key={e.entryId}
                className="flex items-center justify-between rounded-lg border border-foreground/10 bg-foreground/[0.02] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-foreground/40 w-8">
                    L{e.lane}
                  </span>
                  <div
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: e.baseColor }}
                  />
                  <Link
                    href={`/app/stable/${e.horseId}`}
                    className="font-medium hover:text-white transition-colors"
                  >
                    {e.horseName}
                  </Link>
                </div>
                {(stakesByEntry.get(e.entryId) ?? 0) > 0 && (
                  <span className="text-xs text-foreground/40">
                    {stakesByEntry.get(e.entryId)} staked
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Place a stake */}
      {race.status === "open" &&
        session?.user?.id &&
        stakableEntries.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-mono uppercase tracking-widest text-foreground/40 mb-4">
              Place a stake
            </h2>
            <PlaceStakeForm
              raceId={race.id}
              entries={stakableEntries}
              balance={balance}
            />
          </section>
        )}

      {/* Enter a horse */}
      {race.status === "open" && session?.user?.id && (
        <section className="mt-10">
          <h2 className="text-sm font-mono uppercase tracking-widest text-foreground/40 mb-4">
            Enter a horse
          </h2>
          <EnterHorseForm raceId={race.id} horses={eligibleHorses} />
        </section>
      )}
    </div>
  );
}

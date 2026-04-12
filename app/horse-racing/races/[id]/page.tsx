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
import { eq, sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth/config";
import { EnterHorseForm } from "@/components/races/enter-horse-form";
import { PlaceStakeForm } from "@/components/races/place-stake-form";
import { RunRaceButton } from "@/components/races/run-race-button";
import Link from "next/link";
import styles from "../../horse-racing.module.css";

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
    <div className={styles.pageContainerNarrow}>
      <Link href="/horse-racing/races" className="text-xs text-tertiary">
        &larr; All races
      </Link>

      <div className="margin-top display-flex items-start justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${styles.trackingTight}`}>
            {race.name}
          </h1>
          <p className="text-sm text-secondary margin-top-xs">
            {week?.label} &middot; {race.trackName} &middot; {race.surface}{" "}
            &middot; {race.lengthFurlongs}f
          </p>
          <p className="text-xs text-tertiary margin-top-xs">
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

      {totalPool > 0 && (
        <div className="margin-top border-radius-lg border bg-surface padding padding-left-lg padding-right-lg" style={{ display: "inline-block" }}>
          <span className="text-xs text-tertiary">Stake pool: </span>
          <span className="text-sm mono text-secondary">{totalPool}</span>
          <span className="text-xs text-tertiary"> credits</span>
        </div>
      )}

      {placements && (
        <section className="margin-top-xxl">
          <h2 className={`text-sm mono uppercase text-tertiary margin-bottom ${styles.sectionHeading}`}>
            Results
          </h2>
          <div className={styles.stack2}>
            {placements.map((p) => {
              const entry = raceEntries.find((e) => e.entryId === p.entryId);
              const entryStakeTotal = stakesByEntry.get(p.entryId) ?? 0;
              return (
                <div
                  key={p.entryId}
                  className={`display-flex items-center justify-between border-radius-lg border padding padding-left-lg padding-right-lg ${
                    p.position === 1 ? "bg-surface" : "bg-surface"
                  }`}
                  style={p.position === 1 ? { borderColor: "rgba(234, 179, 8, 0.3)", backgroundColor: "rgba(234, 179, 8, 0.05)" } : undefined}
                >
                  <div className="display-flex items-center gap">
                    <span className="text-lg" style={{ width: "2rem" }}>
                      {MEDAL[p.position] || `#${p.position}`}
                    </span>
                    <div
                      className={styles.colorSwatch}
                      style={{ backgroundColor: entry?.baseColor ?? "#666" }}
                    />
                    <span className="font-medium">
                      {entry?.horseName ?? p.horseId}
                    </span>
                  </div>
                  <div className="display-flex items-center gap-lg">
                    {entryStakeTotal > 0 && (
                      <span className="text-xs text-tertiary">
                        {entryStakeTotal} staked
                      </span>
                    )}
                    <span className="text-sm mono text-secondary">
                      {p.finishTime}s
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {userStakes.length > 0 && (
        <section className="margin-top-xxl">
          <h2 className={`text-sm mono uppercase text-tertiary margin-bottom ${styles.sectionHeading}`}>
            Your Stakes
          </h2>
          <div className={styles.stack2}>
            {userStakes.map((s) => {
              const entry = raceEntries.find((e) => e.entryId === s.entryId);
              const isWinner = s.payout > 0;
              const net = s.payout - s.amount;
              return (
                <div
                  key={s.id}
                  className="display-flex items-center justify-between border-radius-lg border padding padding-left-lg padding-right-lg bg-surface"
                  style={isWinner ? { borderColor: "rgba(16, 185, 129, 0.3)", backgroundColor: "rgba(16, 185, 129, 0.05)" } : undefined}
                >
                  <div className="display-flex items-center gap">
                    <div
                      className={styles.colorSwatch}
                      style={{ backgroundColor: entry?.baseColor ?? "#666" }}
                    />
                    <span className="text-sm font-medium">
                      {entry?.horseName ?? s.entryId}
                    </span>
                    <span className="text-xs text-tertiary">
                      {s.amount} credits
                    </span>
                  </div>
                  {race.status === "finished" && (
                    <span
                      className={`text-sm mono ${
                        net > 0
                          ? "color-green"
                          : net < 0
                            ? "color-red"
                            : "text-secondary"
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

      <section className="margin-top-xxl">
        <h2 className={`text-sm mono uppercase text-tertiary margin-bottom ${styles.sectionHeading}`}>
          Entries ({raceEntries.length})
        </h2>
        {raceEntries.length === 0 ? (
          <p className="text-tertiary text-sm">No entries yet.</p>
        ) : (
          <div className={styles.stack2}>
            {raceEntries.map((e) => (
              <div
                key={e.entryId}
                className="display-flex items-center justify-between border-radius-lg border bg-surface padding padding-left-lg padding-right-lg"
              >
                <div className="display-flex items-center gap">
                  <span className={`text-xs mono text-tertiary ${styles.laneLabel}`}>
                    L{e.lane}
                  </span>
                  <div
                    className={styles.colorSwatch}
                    style={{ backgroundColor: e.baseColor }}
                  />
                  <Link
                    href={`/horse-racing/stable/${e.horseId}`}
                    className="font-medium no-link-style"
                  >
                    {e.horseName}
                  </Link>
                </div>
                {(stakesByEntry.get(e.entryId) ?? 0) > 0 && (
                  <span className="text-xs text-tertiary">
                    {stakesByEntry.get(e.entryId)} staked
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {race.status === "open" &&
        session?.user?.id &&
        stakableEntries.length > 0 && (
          <section className="margin-top-xxl">
            <h2 className={`text-sm mono uppercase text-tertiary margin-bottom ${styles.sectionHeading}`}>
              Place a stake
            </h2>
            <PlaceStakeForm
              raceId={race.id}
              entries={stakableEntries}
              balance={balance}
            />
          </section>
        )}

      {race.status === "open" && session?.user?.id && (
        <section className="margin-top-xxl">
          <h2 className={`text-sm mono uppercase text-tertiary margin-bottom ${styles.sectionHeading}`}>
            Enter a horse
          </h2>
          <EnterHorseForm raceId={race.id} horses={eligibleHorses} />
        </section>
      )}
    </div>
  );
}

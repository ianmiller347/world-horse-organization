import { db } from "@/lib/db";
import { races, weeks, entries } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import Link from "next/link";
import styles from "../horse-racing.module.css";

const STATUS_LABELS: Record<string, string> = {
  upcoming: "Upcoming",
  open: "Open for entries",
  locked: "Locked",
  running: "Running",
  finished: "Finished",
};

const STATUS_COLORS: Record<string, string> = {
  upcoming: "text-tertiary",
  open: "color-green",
  locked: "color-yellow",
  running: "color-blue",
  finished: "text-secondary",
};

export default async function RacesPage() {
  const raceList = await db
    .select({
      id: races.id,
      name: races.name,
      status: races.status,
      scheduledAt: races.scheduledAt,
      surface: races.surface,
      trackName: races.trackName,
      lengthFurlongs: races.lengthFurlongs,
      weekLabel: weeks.label,
      entryCount: sql<number>`count(${entries.id})::int`,
    })
    .from(races)
    .leftJoin(weeks, eq(races.weekId, weeks.id))
    .leftJoin(entries, eq(races.id, entries.raceId))
    .groupBy(races.id, weeks.label)
    .orderBy(desc(races.scheduledAt));

  return (
    <div className={styles.pageContainer}>
      <div className="display-flex items-center justify-between margin-bottom-xl">
        <div>
          <Link href="/" className="text-xs text-tertiary">
            &larr; Home
          </Link>
          <h1 className={`text-3xl font-bold margin-top-xs ${styles.trackingTight}`}>
            Races
          </h1>
        </div>
      </div>

      {raceList.length === 0 ? (
        <div className="align-center padding-top-xxl padding-bottom-xxl text-tertiary">
          <p className="text-lg">No races scheduled yet.</p>
          <p className="text-sm margin-top-sm">Check back soon.</p>
        </div>
      ) : (
        <div className={styles.stack3}>
          {raceList.map((race) => (
            <Link
              key={race.id}
              href={`/horse-racing/races/${race.id}`}
              className="display-block border-radius-lg border bg-surface padding-lg no-link-style"
            >
              <div className="display-flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{race.name}</h3>
                  <p className="text-xs text-tertiary margin-top-xs">
                    {race.weekLabel} &middot; {race.trackName} &middot;{" "}
                    {race.surface} &middot; {race.lengthFurlongs}f
                  </p>
                </div>
                <span
                  className={`text-xs mono uppercase ${STATUS_COLORS[race.status] ?? "text-tertiary"}`}
                >
                  {STATUS_LABELS[race.status] ?? race.status}
                </span>
              </div>
              <div className="margin-top display-flex items-center gap-lg text-sm text-secondary">
                <span>{race.entryCount} entries</span>
                <span>
                  {new Date(race.scheduledAt).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

import { db } from "@/lib/db";
import { races, weeks, entries } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import Link from "next/link";

const STATUS_LABELS: Record<string, string> = {
  upcoming: "Upcoming",
  open: "Open for entries",
  locked: "Locked",
  running: "Running",
  finished: "Finished",
};

const STATUS_COLORS: Record<string, string> = {
  upcoming: "text-foreground/40",
  open: "text-emerald-400",
  locked: "text-yellow-400",
  running: "text-blue-400",
  finished: "text-foreground/50",
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
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/"
            className="text-xs text-foreground/40 hover:text-foreground/60 transition-colors"
          >
            &larr; Home
          </Link>
          <h1 className="text-3xl font-bold mt-1">Races</h1>
        </div>
      </div>

      {raceList.length === 0 ? (
        <div className="text-center py-20 text-foreground/40">
          <p className="text-lg">No races scheduled yet.</p>
          <p className="text-sm mt-2">Check back soon.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {raceList.map((race) => (
            <Link
              key={race.id}
              href={`/app/races/${race.id}`}
              className="block rounded-xl border border-foreground/10 bg-foreground/[0.03] p-5 hover:border-foreground/20 hover:bg-foreground/[0.06] transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{race.name}</h3>
                  <p className="text-xs text-foreground/40 mt-0.5">
                    {race.weekLabel} &middot; {race.trackName} &middot;{" "}
                    {race.surface} &middot; {race.lengthFurlongs}f
                  </p>
                </div>
                <span
                  className={`text-xs font-mono uppercase ${STATUS_COLORS[race.status] ?? "text-foreground/40"}`}
                >
                  {STATUS_LABELS[race.status] ?? race.status}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-4 text-sm text-foreground/50">
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

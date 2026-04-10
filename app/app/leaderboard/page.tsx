import { db } from "@/lib/db";
import { stakes, users } from "@/lib/db/schema";
import { eq, sql, desc } from "drizzle-orm";
import Link from "next/link";

export default async function LeaderboardPage() {
  const leaders = await db
    .select({
      userId: stakes.userId,
      userName: users.name,
      totalStaked: sql<number>`sum(${stakes.amount})::int`,
      totalWon: sql<number>`sum(${stakes.payout})::int`,
      netProfit: sql<number>`(sum(${stakes.payout}) - sum(${stakes.amount}))::int`,
      raceCount: sql<number>`count(distinct ${stakes.raceId})::int`,
    })
    .from(stakes)
    .innerJoin(users, eq(stakes.userId, users.id))
    .groupBy(stakes.userId, users.name)
    .orderBy(desc(sql`sum(${stakes.payout}) - sum(${stakes.amount})`))
    .limit(50);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="text-xs text-foreground/40 hover:text-foreground/60 transition-colors"
        >
          &larr; Home
        </Link>
        <h1 className="text-3xl font-bold mt-1">Leaderboard</h1>
        <p className="text-sm text-foreground/50 mt-1">
          Top guardians by net profit from stakes
        </p>
      </div>

      {leaders.length === 0 ? (
        <div className="text-center py-20 text-foreground/40">
          <p className="text-lg">No stakes placed yet.</p>
          <p className="text-sm mt-2">
            Enter a race and place your first stake.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="grid grid-cols-[2rem_1fr_5rem_5rem_5rem] gap-4 px-4 py-2 text-xs font-mono uppercase tracking-widest text-foreground/40">
            <span>#</span>
            <span>Guardian</span>
            <span className="text-right">Staked</span>
            <span className="text-right">Won</span>
            <span className="text-right">Net</span>
          </div>
          {leaders.map((leader, i) => (
            <div
              key={leader.userId}
              className={`grid grid-cols-[2rem_1fr_5rem_5rem_5rem] gap-4 rounded-lg border px-4 py-3 items-center ${
                i === 0
                  ? "border-yellow-500/30 bg-yellow-500/5"
                  : "border-foreground/10 bg-foreground/[0.02]"
              }`}
            >
              <span className="text-sm font-mono text-foreground/50">
                {i + 1}
              </span>
              <div>
                <span className="font-medium text-sm">
                  {leader.userName ?? "Anonymous"}
                </span>
                <span className="text-xs text-foreground/40 ml-2">
                  {leader.raceCount} race{leader.raceCount === 1 ? "" : "s"}
                </span>
              </div>
              <span className="text-sm font-mono text-foreground/50 text-right">
                {leader.totalStaked}
              </span>
              <span className="text-sm font-mono text-foreground/50 text-right">
                {leader.totalWon}
              </span>
              <span
                className={`text-sm font-mono text-right ${
                  leader.netProfit > 0
                    ? "text-emerald-400"
                    : leader.netProfit < 0
                      ? "text-red-400"
                      : "text-foreground/50"
                }`}
              >
                {leader.netProfit > 0 ? "+" : ""}
                {leader.netProfit}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

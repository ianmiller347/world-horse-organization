import { db } from "@/lib/db";
import { stakes, users } from "@/lib/db/schema";
import { eq, sql, desc } from "drizzle-orm";
import Link from "next/link";
import styles from "../horse-racing.module.css";

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
    <div className={styles.pageContainerNarrow}>
      <div className="margin-bottom-xl">
        <Link href="/" className="text-xs text-tertiary">
          &larr; Home
        </Link>
        <h1 className={`text-3xl font-bold margin-top-xs ${styles.trackingTight}`}>
          Leaderboard
        </h1>
        <p className="text-sm text-secondary margin-top-xs">
          Top guardians by net profit from stakes
        </p>
      </div>

      {leaders.length === 0 ? (
        <div className="align-center padding-top-xxl padding-bottom-xxl text-tertiary">
          <p className="text-lg">No stakes placed yet.</p>
          <p className="text-sm margin-top-sm">
            Enter a race and place your first stake.
          </p>
        </div>
      ) : (
        <div className={styles.stack2}>
          <div className={`${styles.leaderboardRow} padding-left-lg padding-right-lg padding-top-sm padding-bottom-sm text-xs mono uppercase text-tertiary ${styles.sectionHeading}`}>
            <span>#</span>
            <span>Guardian</span>
            <span className="align-right">Staked</span>
            <span className="align-right">Won</span>
            <span className="align-right">Net</span>
          </div>
          {leaders.map((leader, i) => (
            <div
              key={leader.userId}
              className={`${styles.leaderboardRow} border-radius-lg border bg-surface padding padding-left-lg padding-right-lg`}
              style={i === 0 ? { borderColor: "rgba(234, 179, 8, 0.3)", backgroundColor: "rgba(234, 179, 8, 0.05)" } : undefined}
            >
              <span className="text-sm mono text-secondary">
                {i + 1}
              </span>
              <div>
                <span className="font-medium text-sm">
                  {leader.userName ?? "Anonymous"}
                </span>
                <span className="text-xs text-tertiary margin-left-sm">
                  {leader.raceCount} race{leader.raceCount === 1 ? "" : "s"}
                </span>
              </div>
              <span className="text-sm mono text-secondary align-right">
                {leader.totalStaked}
              </span>
              <span className="text-sm mono text-secondary align-right">
                {leader.totalWon}
              </span>
              <span
                className={`text-sm mono align-right ${
                  leader.netProfit > 0
                    ? "color-green"
                    : leader.netProfit < 0
                      ? "color-red"
                      : "text-secondary"
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

import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { horses, balances } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { HorseCard } from "@/components/horses/horse-card";
import { RescueButton } from "@/components/horses/rescue-button";
import Link from "next/link";
import styles from "../horse-racing.module.css";

export default async function StablePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  const [userHorses, balance] = await Promise.all([
    db.select().from(horses).where(eq(horses.guardianId, session.user.id)),
    db
      .select()
      .from(balances)
      .where(eq(balances.userId, session.user.id))
      .then((rows) => rows[0]),
  ]);

  return (
    <div className={styles.pageContainer}>
      <div className="display-flex items-center justify-between margin-bottom-xl">
        <div>
          <Link href="/" className="text-xs text-tertiary">
            &larr; Home
          </Link>
          <h1 className={`text-3xl font-bold margin-top-xs ${styles.trackingTight}`}>
            Your Stable
          </h1>
          <p className="text-sm text-secondary margin-top-xs">
            Balance:{" "}
            <span className="mono text-secondary">
              {balance?.amount ?? 0}
            </span>{" "}
            credits
          </p>
        </div>
        <RescueButton />
      </div>

      {userHorses.length === 0 ? (
        <div className="align-center padding-top-xxl padding-bottom-xxl text-tertiary">
          <p className="text-lg">No horses in your care yet.</p>
          <p className="text-sm margin-top-sm">
            Rescue your first horse to bring them into the WHO.
          </p>
        </div>
      ) : (
        <div className={styles.gridCols2}>
          {userHorses.map((horse) => (
            <HorseCard key={horse.id} horse={horse} />
          ))}
        </div>
      )}
    </div>
  );
}

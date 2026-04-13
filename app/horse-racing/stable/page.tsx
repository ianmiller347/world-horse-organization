import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { horses, balances, listings } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { redirect } from "next/navigation";
import { HorseCard } from "@/components/horses/horse-card";
import { RescueButton } from "@/components/horses/rescue-button";
import { ListHorseForm } from "@/components/marketplace/list-horse-form";
import Link from "next/link";
import styles from "../horse-racing.module.css";

export default async function StablePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  const [userHorses, balance, activeListings] = await Promise.all([
    db.select().from(horses).where(eq(horses.guardianId, session.user.id)),
    db
      .select()
      .from(balances)
      .where(eq(balances.userId, session.user.id))
      .then((rows) => rows[0]),
    db
      .select({ horseId: listings.horseId, listingId: listings.id })
      .from(listings)
      .where(
        and(
          eq(listings.sellerId, session.user.id),
          eq(listings.status, "active")
        )
      ),
  ]);

  const listedHorseIds = new Set(activeListings.map((l) => l.horseId));
  const unlistedHorses = userHorses.filter((h) => !listedHorseIds.has(h.id));

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
          {userHorses.map((horse) => {
            const isListed = listedHorseIds.has(horse.id);
            return (
              <div key={horse.id} style={{ position: "relative" }}>
                {isListed && (
                  <div
                    className="text-xs mono uppercase padding-left-sm padding-right-sm padding-top-xs padding-bottom-xs border-radius-sm color-yellow"
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      zIndex: 1,
                      backgroundColor: "rgba(234, 179, 8, 0.1)",
                      border: "1px solid rgba(234, 179, 8, 0.3)",
                    }}
                  >
                    Listed
                  </div>
                )}
                <HorseCard horse={horse} />
              </div>
            );
          })}
        </div>
      )}

      {userHorses.length > 0 && (
        <section className="margin-top-xxl">
          <h2 className={`text-sm mono uppercase text-tertiary margin-bottom ${styles.sectionHeading}`}>
            List a Horse for Transfer
          </h2>
          <div className="border border-radius-lg bg-surface padding-lg" style={{ maxWidth: "28rem" }}>
            <ListHorseForm
              horses={unlistedHorses.map((h) => ({ id: h.id, name: h.name }))}
            />
          </div>
          {activeListings.length > 0 && (
            <p className="text-xs text-tertiary margin-top">
              {activeListings.length} horse{activeListings.length === 1 ? "" : "s"} currently listed on the{" "}
              <Link href="/horse-racing/marketplace" className="text-secondary">
                marketplace
              </Link>
              .
            </p>
          )}
        </section>
      )}
    </div>
  );
}

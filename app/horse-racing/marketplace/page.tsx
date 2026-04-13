import { db } from "@/lib/db";
import { listings, horses, users, balances } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth/config";
import { StatBar } from "@/components/horses/stat-bar";
import { AssumeGuardianshipButton } from "@/components/marketplace/assume-guardianship-button";
import { CancelListingButton } from "@/components/marketplace/cancel-listing-button";
import Link from "next/link";
import styles from "../horse-racing.module.css";

export default async function MarketplacePage() {
  const session = await auth();

  const activeListings = await db
    .select({
      id: listings.id,
      price: listings.price,
      createdAt: listings.createdAt,
      sellerId: listings.sellerId,
      sellerName: users.name,
      horseId: horses.id,
      horseName: horses.name,
      acceleration: horses.acceleration,
      stamina: horses.stamina,
      topSpeed: horses.topSpeed,
      flexibility: horses.flexibility,
      height: horses.height,
      length: horses.length,
      baseColor: horses.baseColor,
      secondaryColor: horses.secondaryColor,
      maneColor: horses.maneColor,
      preferredHairStyle: horses.preferredHairStyle,
    })
    .from(listings)
    .innerJoin(horses, eq(listings.horseId, horses.id))
    .innerJoin(users, eq(listings.sellerId, users.id))
    .where(eq(listings.status, "active"))
    .orderBy(desc(listings.createdAt));

  const balance = session?.user?.id
    ? await db
        .select()
        .from(balances)
        .where(eq(balances.userId, session.user.id))
        .then((rows) => rows[0]?.amount ?? 0)
    : 0;

  return (
    <div className={styles.pageContainer}>
      <div className="margin-bottom-xl">
        <Link href="/" className="text-xs text-tertiary">
          &larr; Home
        </Link>
        <h1 className={`text-3xl font-bold margin-top-xs ${styles.trackingTight}`}>
          Marketplace
        </h1>
        <p className="text-sm text-secondary margin-top-xs">
          Horses available for guardianship transfer
        </p>
        {session?.user?.id && (
          <p className="text-xs text-tertiary margin-top-xs">
            Your balance:{" "}
            <span className="mono">{balance}</span> credits
          </p>
        )}
      </div>

      {activeListings.length === 0 ? (
        <div className="align-center padding-top-xxl padding-bottom-xxl text-tertiary">
          <p className="text-lg">No horses listed right now.</p>
          <p className="text-sm margin-top-sm">
            List one of yours from{" "}
            <Link href="/horse-racing/stable" className="text-secondary">
              your stable
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className={styles.gridCols2}>
          {activeListings.map((listing) => {
            const isSeller = listing.sellerId === session?.user?.id;
            return (
              <div
                key={listing.id}
                className="border border-radius-lg bg-surface padding-lg"
              >
                <div className="display-flex items-start gap-lg">
                  <div className="display-flex gap-xs" style={{ flexShrink: 0 }}>
                    <div
                      style={{
                        backgroundColor: listing.baseColor,
                        width: "2rem",
                        height: "3rem",
                        borderRadius: "0.125rem",
                      }}
                    />
                    <div
                      style={{
                        backgroundColor: listing.secondaryColor,
                        width: "1rem",
                        height: "3rem",
                        borderRadius: "0.125rem",
                      }}
                    />
                    <div
                      style={{
                        backgroundColor: listing.maneColor,
                        width: "1rem",
                        height: "3rem",
                        borderRadius: "0.125rem",
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link
                      href={`/horse-racing/stable/${listing.horseId}`}
                      className="font-semibold text-lg no-link-style truncate display-block"
                    >
                      {listing.horseName}
                    </Link>
                    <p className="text-xs text-tertiary margin-top-xs">
                      {listing.height} cm &middot; {listing.length} cm &middot;{" "}
                      {listing.preferredHairStyle}
                    </p>
                    <p className="text-xs text-tertiary margin-top-xs">
                      Guardian: {listing.sellerName ?? "Anonymous"}
                    </p>
                  </div>
                </div>

                <div
                  className="margin-top-lg"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.5rem 1.5rem",
                  }}
                >
                  <StatBar label="Speed" value={listing.topSpeed} />
                  <StatBar label="Accel" value={listing.acceleration} />
                  <StatBar label="Stamina" value={listing.stamina} />
                  <StatBar label="Flex" value={listing.flexibility} />
                </div>

                <div className="margin-top-lg padding-top border-top display-flex items-center justify-between">
                  <span className="mono font-bold text-lg">
                    {listing.price}
                    <span className="text-xs text-tertiary font-normal margin-left-xs">
                      credits
                    </span>
                  </span>

                  {isSeller ? (
                    <CancelListingButton listingId={listing.id} />
                  ) : session?.user?.id ? (
                    <AssumeGuardianshipButton
                      listingId={listing.id}
                      price={listing.price}
                      horseName={listing.horseName}
                      balance={balance}
                    />
                  ) : (
                    <Link href="/sign-in" className="btn btn-secondary-outline text-xs">
                      Sign in to trade
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

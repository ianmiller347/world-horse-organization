import { db } from "@/lib/db";
import { horses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { StatBar } from "@/components/horses/stat-bar";
import Link from "next/link";
import styles from "../../horse-racing.module.css";

export default async function HorseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [horse] = await db.select().from(horses).where(eq(horses.id, id));

  if (!horse) notFound();

  return (
    <div className={styles.pageContainerNarrow}>
      <Link href="/horse-racing/stable" className="text-xs text-tertiary">
        &larr; Back to stable
      </Link>

      <div className="margin-top display-flex items-start gap-lg">
        <div className={`${styles.noShrink} display-flex gap-xs`}>
          <div
            className={styles.colorSwatchLg}
            style={{ backgroundColor: horse.baseColor }}
            title="Base"
          />
          <div
            className={styles.colorSwatchMd}
            style={{ backgroundColor: horse.secondaryColor }}
            title="Secondary"
          />
          <div
            className={styles.colorSwatchMd}
            style={{ backgroundColor: horse.maneColor }}
            title="Mane"
          />
        </div>

        <div>
          <h1 className={`text-3xl font-bold ${styles.trackingTight}`}>
            {horse.name}
          </h1>
          <p className="text-sm text-secondary margin-top-xs">
            {horse.height} cm tall &middot; {horse.length} cm long &middot;{" "}
            {horse.preferredHairStyle}
          </p>
        </div>
      </div>

      <section className="margin-top-xxl">
        <h2 className={`text-sm mono uppercase text-tertiary margin-bottom ${styles.sectionHeading}`}>
          Performance
        </h2>
        <div className={styles.stack3}>
          <StatBar label="Top Speed" value={horse.topSpeed} />
          <StatBar label="Acceleration" value={horse.acceleration} />
          <StatBar label="Stamina" value={horse.stamina} />
          <StatBar label="Flexibility" value={horse.flexibility} />
          <StatBar label="Left Legs Strength" value={horse.leftLegsStrength} />
          <StatBar
            label="Right Legs Strength"
            value={horse.rightLegsStrength}
          />
        </div>
      </section>

      {(horse.sireId || horse.damId) && (
        <section className="margin-top-xxl">
          <h2 className={`text-sm mono uppercase text-tertiary margin-bottom ${styles.sectionHeading}`}>
            Lineage
          </h2>
          <div className={`text-sm text-secondary ${styles.stack2}`}>
            {horse.sireId && <p>Sire: {horse.sireId}</p>}
            {horse.damId && <p>Dam: {horse.damId}</p>}
          </div>
        </section>
      )}

      {horse.spots && (horse.spots as unknown[]).length > 0 && (
        <section className="margin-top-xxl">
          <h2 className={`text-sm mono uppercase text-tertiary margin-bottom-sm ${styles.sectionHeading}`}>
            Spots
          </h2>
          <p className="text-sm text-secondary">
            {(horse.spots as unknown[]).length} spot
            {(horse.spots as unknown[]).length === 1 ? "" : "s"}
          </p>
        </section>
      )}
    </div>
  );
}

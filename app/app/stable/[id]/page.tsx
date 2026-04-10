import { db } from "@/lib/db";
import { horses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { StatBar } from "@/components/horses/stat-bar";
import Link from "next/link";

export default async function HorseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [horse] = await db.select().from(horses).where(eq(horses.id, id));

  if (!horse) notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Link
        href="/app/stable"
        className="text-xs text-foreground/40 hover:text-foreground/60 transition-colors"
      >
        &larr; Back to stable
      </Link>

      <div className="mt-4 flex items-start gap-5">
        <div className="shrink-0 flex gap-1.5">
          <div
            className="w-12 h-20 rounded"
            style={{ backgroundColor: horse.baseColor }}
            title="Base"
          />
          <div
            className="w-6 h-20 rounded"
            style={{ backgroundColor: horse.secondaryColor }}
            title="Secondary"
          />
          <div
            className="w-6 h-20 rounded"
            style={{ backgroundColor: horse.maneColor }}
            title="Mane"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{horse.name}</h1>
          <p className="text-sm text-foreground/50 mt-1">
            {horse.height} cm tall &middot; {horse.length} cm long &middot;{" "}
            {horse.preferredHairStyle}
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-sm font-mono uppercase tracking-widest text-foreground/40 mb-4">
          Performance
        </h2>
        <div className="grid gap-3">
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
        <section className="mt-10">
          <h2 className="text-sm font-mono uppercase tracking-widest text-foreground/40 mb-4">
            Lineage
          </h2>
          <div className="text-sm text-foreground/60 space-y-1">
            {horse.sireId && <p>Sire: {horse.sireId}</p>}
            {horse.damId && <p>Dam: {horse.damId}</p>}
          </div>
        </section>
      )}

      {horse.spots && (horse.spots as unknown[]).length > 0 && (
        <section className="mt-10">
          <h2 className="text-sm font-mono uppercase tracking-widest text-foreground/40 mb-2">
            Spots
          </h2>
          <p className="text-sm text-foreground/60">
            {(horse.spots as unknown[]).length} spot
            {(horse.spots as unknown[]).length === 1 ? "" : "s"}
          </p>
        </section>
      )}
    </div>
  );
}

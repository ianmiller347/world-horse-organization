import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { races, entries, horses, results } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const [race] = await db.select().from(races).where(eq(races.id, id));
  if (!race) {
    return NextResponse.json({ error: "Race not found" }, { status: 404 });
  }

  const raceEntries = await db
    .select({
      entryId: entries.id,
      horseId: entries.horseId,
      guardianId: entries.guardianId,
      lane: entries.lane,
      horseName: horses.name,
      baseColor: horses.baseColor,
      secondaryColor: horses.secondaryColor,
      topSpeed: horses.topSpeed,
      acceleration: horses.acceleration,
      stamina: horses.stamina,
    })
    .from(entries)
    .innerJoin(horses, eq(entries.horseId, horses.id))
    .where(eq(entries.raceId, id));

  const [raceResult] = await db
    .select()
    .from(results)
    .where(eq(results.raceId, id));

  return NextResponse.json({
    ...race,
    entries: raceEntries,
    results: raceResult?.placements ?? null,
  });
}

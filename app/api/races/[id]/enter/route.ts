import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { races, entries, horses } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth/config";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: raceId } = await params;
  const { horseId } = await req.json();

  if (!horseId) {
    return NextResponse.json(
      { error: "horseId is required" },
      { status: 400 }
    );
  }

  const [race] = await db.select().from(races).where(eq(races.id, raceId));
  if (!race) {
    return NextResponse.json({ error: "Race not found" }, { status: 404 });
  }
  if (race.status !== "open") {
    return NextResponse.json(
      { error: "Race is not accepting entries" },
      { status: 400 }
    );
  }

  const [horse] = await db
    .select()
    .from(horses)
    .where(eq(horses.id, horseId));
  if (!horse || horse.guardianId !== session.user.id) {
    return NextResponse.json(
      { error: "Horse not found or not in your care" },
      { status: 403 }
    );
  }

  const existing = await db
    .select()
    .from(entries)
    .where(and(eq(entries.raceId, raceId), eq(entries.horseId, horseId)));
  if (existing.length > 0) {
    return NextResponse.json(
      { error: "This horse is already entered" },
      { status: 409 }
    );
  }

  const currentEntries = await db
    .select()
    .from(entries)
    .where(eq(entries.raceId, raceId));
  const lane = currentEntries.length + 1;

  const [entry] = await db
    .insert(entries)
    .values({
      raceId,
      horseId,
      guardianId: session.user.id,
      lane,
    })
    .returning();

  return NextResponse.json(entry, { status: 201 });
}

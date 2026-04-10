import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { races, weeks, entries, results, horses } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const rows = await db
    .select({
      id: races.id,
      name: races.name,
      status: races.status,
      scheduledAt: races.scheduledAt,
      surface: races.surface,
      trackName: races.trackName,
      lengthFurlongs: races.lengthFurlongs,
      weekId: races.weekId,
      weekLabel: weeks.label,
    })
    .from(races)
    .leftJoin(weeks, eq(races.weekId, weeks.id))
    .orderBy(desc(races.scheduledAt));

  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, weekId, scheduledAt, surface, trackName, lengthFurlongs } =
    body;

  if (!name || !weekId || !scheduledAt) {
    return NextResponse.json(
      { error: "name, weekId, and scheduledAt are required" },
      { status: 400 }
    );
  }

  const [race] = await db
    .insert(races)
    .values({
      name,
      weekId,
      scheduledAt: new Date(scheduledAt),
      status: "open",
      ...(surface && { surface }),
      ...(trackName && { trackName }),
      ...(lengthFurlongs && { lengthFurlongs }),
    })
    .returning();

  return NextResponse.json(race, { status: 201 });
}

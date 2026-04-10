import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { weeks } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const rows = await db.select().from(weeks).orderBy(desc(weeks.startDate));
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { label, startDate, endDate } = body;

  if (!label || !startDate || !endDate) {
    return NextResponse.json(
      { error: "label, startDate, and endDate are required" },
      { status: 400 }
    );
  }

  const [week] = await db
    .insert(weeks)
    .values({
      label,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    })
    .returning();

  return NextResponse.json(week, { status: 201 });
}

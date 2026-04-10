import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { horses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [horse] = await db.select().from(horses).where(eq(horses.id, id));

  if (!horse) {
    return NextResponse.json({ error: "Horse not found" }, { status: 404 });
  }

  return NextResponse.json(horse);
}

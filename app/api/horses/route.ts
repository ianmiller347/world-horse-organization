import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { horses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth/config";
import { generateHorse } from "@/lib/horses/generate";

export async function GET(req: NextRequest) {
  const guardianId = req.nextUrl.searchParams.get("guardian");

  const rows = guardianId
    ? await db.select().from(horses).where(eq(horses.guardianId, guardianId))
    : await db.select().from(horses);

  return NextResponse.json(rows);
}

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = generateHorse();
  const [horse] = await db
    .insert(horses)
    .values({ ...data, guardianId: session.user.id })
    .returning();

  return NextResponse.json(horse, { status: 201 });
}

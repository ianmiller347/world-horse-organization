import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { listings, horses, users } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { auth } from "@/lib/auth/config";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "active";

  const rows = await db
    .select({
      id: listings.id,
      price: listings.price,
      status: listings.status,
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
    .where(eq(listings.status, status as "active" | "sold" | "cancelled"))
    .orderBy(desc(listings.createdAt));

  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { horseId, price } = await req.json();

  if (!horseId || typeof price !== "number" || price < 1) {
    return NextResponse.json(
      { error: "horseId and a positive price are required" },
      { status: 400 }
    );
  }

  const [horse] = await db
    .select()
    .from(horses)
    .where(eq(horses.id, horseId));

  if (!horse) {
    return NextResponse.json({ error: "Horse not found" }, { status: 404 });
  }

  if (horse.guardianId !== session.user.id) {
    return NextResponse.json(
      { error: "You are not this horse's guardian" },
      { status: 403 }
    );
  }

  const existing = await db
    .select()
    .from(listings)
    .where(
      and(eq(listings.horseId, horseId), eq(listings.status, "active"))
    );

  if (existing.length > 0) {
    return NextResponse.json(
      { error: "This horse is already listed" },
      { status: 409 }
    );
  }

  const [listing] = await db
    .insert(listings)
    .values({
      horseId,
      sellerId: session.user.id,
      price,
    })
    .returning();

  return NextResponse.json(listing, { status: 201 });
}

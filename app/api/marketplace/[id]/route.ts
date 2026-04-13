import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth/config";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const [listing] = await db
    .select()
    .from(listings)
    .where(eq(listings.id, id));

  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  if (listing.sellerId !== session.user.id) {
    return NextResponse.json(
      { error: "Only the seller can cancel a listing" },
      { status: 403 }
    );
  }

  if (listing.status !== "active") {
    return NextResponse.json(
      { error: "Listing is no longer active" },
      { status: 400 }
    );
  }

  await db
    .update(listings)
    .set({ status: "cancelled" })
    .where(and(eq(listings.id, id), eq(listings.status, "active")));

  return NextResponse.json({ ok: true });
}

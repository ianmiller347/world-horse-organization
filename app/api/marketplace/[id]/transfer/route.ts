import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { listings, horses } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth/config";
import { debit, credit } from "@/lib/db/ledger";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: listingId } = await params;
  const buyerId = session.user.id;

  const [listing] = await db
    .select()
    .from(listings)
    .where(eq(listings.id, listingId));

  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  if (listing.status !== "active") {
    return NextResponse.json(
      { error: "Listing is no longer available" },
      { status: 400 }
    );
  }

  if (listing.sellerId === buyerId) {
    return NextResponse.json(
      { error: "You cannot assume guardianship of your own horse" },
      { status: 400 }
    );
  }

  const debited = await debit({
    userId: buyerId,
    amount: listing.price,
    referenceType: "guardianship_assumed",
    referenceId: listingId,
  });

  if (!debited) {
    return NextResponse.json(
      { error: "Insufficient credits" },
      { status: 402 }
    );
  }

  await credit({
    userId: listing.sellerId,
    amount: listing.price,
    referenceType: "guardianship_transferred",
    referenceId: listingId,
  });

  await db
    .update(horses)
    .set({ guardianId: buyerId })
    .where(eq(horses.id, listing.horseId));

  await db
    .update(listings)
    .set({ status: "sold", buyerId, soldAt: new Date() })
    .where(and(eq(listings.id, listingId), eq(listings.status, "active")));

  return NextResponse.json({ ok: true, horseId: listing.horseId });
}

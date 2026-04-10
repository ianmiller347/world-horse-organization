import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { horses, balances } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { HorseCard } from "@/components/horses/horse-card";
import { RescueButton } from "@/components/horses/rescue-button";
import Link from "next/link";

export default async function StablePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  const [userHorses, balance] = await Promise.all([
    db.select().from(horses).where(eq(horses.guardianId, session.user.id)),
    db
      .select()
      .from(balances)
      .where(eq(balances.userId, session.user.id))
      .then((rows) => rows[0]),
  ]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/"
            className="text-xs text-foreground/40 hover:text-foreground/60 transition-colors"
          >
            &larr; Home
          </Link>
          <h1 className="text-3xl font-bold mt-1">Your Stable</h1>
          <p className="text-sm text-foreground/50 mt-1">
            Balance:{" "}
            <span className="font-mono text-foreground/80">
              {balance?.amount ?? 0}
            </span>{" "}
            credits
          </p>
        </div>
        <RescueButton />
      </div>

      {userHorses.length === 0 ? (
        <div className="text-center py-20 text-foreground/40">
          <p className="text-lg">No horses in your care yet.</p>
          <p className="text-sm mt-2">
            Rescue your first horse to bring them into the WHO.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {userHorses.map((horse) => (
            <HorseCard key={horse.id} horse={horse} />
          ))}
        </div>
      )}
    </div>
  );
}

import { auth } from "@/lib/auth/config";
import { SignInButton } from "@/components/auth/sign-in-button";
import { UserMenu } from "@/components/auth/user-menu";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-2xl space-y-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          World Horse Organization
        </h1>

        <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed">
          Horses deserve freedom. The WHO is a digital sanctuary where every
          horse is rescued from ownership and placed in the care of a guardian
          &mdash; never an owner.
        </p>

        <div className="pt-4 space-y-4">
          <p className="text-sm text-foreground/50 max-w-md mx-auto">
            Rescue horses. Race them on their terms. Trade guardianship.
            Breed the next generation. All without a single horse being owned.
          </p>

          <div className="pt-4 flex flex-col items-center gap-3">
            {session?.user ? (
              <>
                <div className="flex gap-3">
                  <Link
                    href="/app/stable"
                    className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
                  >
                    Your Stable
                  </Link>
                  <Link
                    href="/app/races"
                    className="px-6 py-3 border border-foreground/20 text-foreground font-medium rounded-lg hover:bg-foreground/5 transition-colors"
                  >
                    Races
                  </Link>
                  <Link
                    href="/app/leaderboard"
                    className="px-6 py-3 border border-foreground/20 text-foreground font-medium rounded-lg hover:bg-foreground/5 transition-colors"
                  >
                    Leaderboard
                  </Link>
                </div>
                <UserMenu />
              </>
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
        <div className="pt-8 border-t border-foreground/10">
          <Link
            href="/free-the-horses"
            className="text-sm text-foreground/50 hover:text-foreground/70 transition-colors"
          >
            Free the Horses &mdash; our campaign to end horse-drawn carriages
            in Central Park &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}

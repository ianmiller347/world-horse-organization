import { auth } from '@/lib/auth/config';
import { SignInButton } from '@/components/auth/sign-in-button';
import { UserMenu } from '@/components/auth/user-menu';
import Link from 'next/link';
import Logo from '@/components/svg/Logo';

export default async function Home() {
  const session = await auth();

  return (
    <main
      className="display-flex fully-centered height-100"
      style={{
        flexDirection: 'column',
        minHeight: '100vh',
        padding: '0 1.5rem',
      }}
    >
      <div className="align-center" style={{ maxWidth: '42rem' }}>
        <h1
          className="text-4xl font-bold"
          style={{ letterSpacing: '-0.025em' }}
        >
          World Horse Organization
        </h1>

        <p className="text-lg text-secondary leading-relaxed margin-top-lg">
          Horses deserve freedom. The WHO is a digital sanctuary where every
          horse is rescued from ownership and placed in the care of a guardian
          &mdash; never an owner.
        </p>

        <div className="display-flex justify-center">
          <Logo className="width-25 who-logo--spin" />
        </div>

        <div className="margin-top-xl">
          <p
            className="text-sm text-tertiary margin-bottom-lg"
            style={{
              maxWidth: '28rem',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Rescue horses. Race them on their terms. Trade guardianship. Breed
            the next generation. All without a single horse being owned.
          </p>

          <div className="margin-top">
            {session?.user ? (
              <>
                <div
                  className="display-flex justify-center gap-sm"
                  style={{ flexWrap: 'wrap' }}
                >
                  <Link href="/horse-racing/stable" className="btn btn-primary">
                    Your Stable
                  </Link>
                  <Link
                    href="/horse-racing/races"
                    className="btn btn-secondary-outline"
                  >
                    Races
                  </Link>
                  <Link
                    href="/horse-racing/marketplace"
                    className="btn btn-secondary-outline"
                  >
                    Marketplace
                  </Link>
                  <Link
                    href="/horse-racing/leaderboard"
                    className="btn btn-secondary-outline"
                  >
                    Leaderboard
                  </Link>
                </div>
                <div className="margin-top-lg">
                  <UserMenu />
                </div>
              </>
            ) : (
              <SignInButton />
            )}
          </div>
        </div>

        <div className="margin-top-xl padding-top-lg border-top">
          <Link href="/free-the-horses" className="text-sm text-tertiary">
            Free the Horses &mdash; our campaign to end horse-drawn carriages in
            Central Park &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}

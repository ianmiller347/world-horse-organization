import { auth } from '@/lib/auth/config';
import { UserMenu } from '@/components/auth/user-menu';
import Link from 'next/link';
import Logo from '@/components/svg/Logo';
import styles from './home.module.css';

export default async function Home() {
  const session = await auth();

  return (
    <main className={styles.pageContainer}>
      <div className="align-center">
        <h1 className={`text-4xl font-bold ${styles.heroHeading}`}>
          World Horse Organization
        </h1>

        <p className="text-lg text-secondary leading-relaxed margin-top-lg">
          Horses deserve freedom. The WHO works to release horses from ownership
          into collective care &mdash; through real-world campaigns and a digital
          sanctuary where guardians never become owners.
        </p>

        <div className="display-flex justify-center margin-top-lg">
          <Logo className="width-25 who-logo--spin" />
        </div>

        <div className={styles.programTree}>
          <div className={styles.branch}>
            <p
              className={`text-sm mono uppercase text-tertiary ${styles.branchLabel}`}
            >
              Campaigns
            </p>
            <Link
              href="/free-the-horses"
              className={`border bg-surface padding-lg ${styles.branchCard}`}
            >
              <h2 className="text-lg font-semibold">Free the Horses</h2>
              <p
                className={`text-sm text-secondary leading-relaxed margin-top-sm ${styles.branchDescription}`}
              >
                End horse-drawn carriages in Central Park. Support Ryder&apos;s
                Law, learn what happened to horses like Ryder and Deniz, and take
                action with advocates on the ground.
              </p>
              <span
                className={`text-sm margin-top display-inline-block ${styles.inlineLink}`}
              >
                Read the campaign &rarr;
              </span>
            </Link>
          </div>

          <div className={styles.branch}>
            <p
              className={`text-sm mono uppercase text-tertiary ${styles.branchLabel}`}
            >
              Digital sanctuary
            </p>
            <div className="border bg-surface padding-lg">
              <h2 className="text-lg font-semibold">Horse Racing Game</h2>
              <p
                className={`text-sm text-secondary leading-relaxed margin-top-sm ${styles.branchDescription}`}
              >
                Rescue horses, enter weekly races, trade guardianship, and breed
                the next generation &mdash; all without a single horse being
                owned.
              </p>

              {session?.user ? (
                <>
                  <div
                    className={`display-flex gap-sm margin-top ${styles.gameLinks}`}
                  >
                    <Link
                      href="/horse-racing/stable"
                      className="btn btn-secondary-outline text-sm"
                    >
                      Your stable
                    </Link>
                    <Link
                      href="/horse-racing/races"
                      className="btn btn-secondary-outline text-sm"
                    >
                      Races
                    </Link>
                    <Link
                      href="/horse-racing/marketplace"
                      className="btn btn-secondary-outline text-sm"
                    >
                      Marketplace
                    </Link>
                    <Link
                      href="/horse-racing/leaderboard"
                      className="btn btn-secondary-outline text-sm"
                    >
                      Leaderboard
                    </Link>
                  </div>
                  <div className={styles.userRow}>
                    <UserMenu />
                  </div>
                </>
              ) : (
                <p className="text-sm text-tertiary margin-top">
                  <Link href="/sign-in" className={`text-sm ${styles.inlineLink}`}>
                    Sign in to play the horse racing game &rarr;
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

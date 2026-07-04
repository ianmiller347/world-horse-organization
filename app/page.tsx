import { auth } from '@/lib/auth/config';
import Link from 'next/link';
import Logo from '@/components/svg/Logo';
import site from './site.module.css';

export default async function Home() {
  const session = await auth();
  const isSignedIn = !!session?.user;

  return (
    <main className={site.content}>
      <h1 className={`text-4xl font-bold ${site.heroHeading}`}>
        Horses deserve freedom.
      </h1>
      <p className="text-lg text-secondary leading-relaxed margin-top-lg">
        The World Horse Organization releases horses from ownership into
        collective care — through real-world campaigns and a digital sanctuary
        where guardians never become owners.
      </p>

      <div className="display-flex justify-center margin-top-lg">
        <Logo className="width-25 who-logo--spin" aria-hidden />
      </div>

      <section
        className={`margin-top-xl border bg-surface padding-lg ${site.programCardFeatured}`}
        aria-labelledby="join-who"
      >
        {isSignedIn ? (
          <>
            <h2 id="join-who" className="text-xl font-semibold">
              You&apos;re part of the WHO
            </h2>
            <p className="text-sm text-secondary leading-relaxed margin-top-sm">
              Your account includes the digital sanctuary. Campaigns like Free
              the Horses are open to everyone — no account required to read or
              take action.
            </p>
            <div
              className={`display-flex gap-sm margin-top ${site.flexWrap}`}
            >
              <Link href="/horse-racing/stable" className="btn btn-primary">
                Go to your stable
              </Link>
              <Link
                href="/free-the-horses"
                className="btn btn-secondary-outline"
              >
                Free the Horses campaign
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 id="join-who" className="text-xl font-semibold">
              Join the World Horse Organization
            </h2>
            <p className="text-sm text-secondary leading-relaxed margin-top-sm">
              Joining creates your WHO account and access to the digital
              sanctuary — rescue horses, enter races, and trade guardianship.
              Campaigns and advocacy (like Free the Horses) are open to everyone
              and do not require an account.
            </p>
            <div className="margin-top">
              <Link href="/sign-in" className="btn btn-primary">
                Join the WHO
              </Link>
            </div>
          </>
        )}
      </section>

      <section className={site.programSection} aria-labelledby="who-programs">
        <h2
          id="who-programs"
          className={`text-sm mono uppercase text-tertiary ${site.sectionHeading}`}
        >
          What we do
        </h2>
        <div className={`margin-top ${site.programGrid}`}>
          <div>
            <p
              className={`text-sm mono uppercase text-tertiary ${site.programCardLabel}`}
            >
              Campaigns
            </p>
            <Link
              href="/free-the-horses"
              className={`border bg-surface padding-lg ${site.programCard} ${site.programCardFeatured}`}
            >
              <h3 className="text-lg font-semibold">Free the Horses</h3>
              <p className="text-sm text-secondary leading-relaxed margin-top-sm">
                End horse-drawn carriages in Central Park. Support Ryder&apos;s
                Law and take action with advocates on the ground. Open to
                everyone — no account required.
              </p>
              <span className={`${site.programCardCta} ${site.inlineLink}`}>
                Read the campaign &rarr;
              </span>
            </Link>
          </div>

          <div>
            <p
              className={`text-sm mono uppercase text-tertiary ${site.programCardLabel}`}
            >
              Digital sanctuary
            </p>
            <div className={`border bg-surface padding-lg ${site.programCard}`}>
              <h3 className="text-lg font-semibold">Horse racing game</h3>
              <p className="text-sm text-secondary leading-relaxed margin-top-sm">
                One component of the WHO. Rescue horses, enter weekly races,
                trade guardianship, and breed the next generation — included
                with your WHO account.
              </p>
              <p className={site.programCardCta}>
                {isSignedIn ? (
                  <Link
                    href="/horse-racing/stable"
                    className={site.inlineLink}
                  >
                    Go to your stable &rarr;
                  </Link>
                ) : (
                  <Link href="/sign-in" className={site.inlineLink}>
                    Join the WHO &rarr;
                  </Link>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

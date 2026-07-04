import Link from 'next/link';
import Logo from '@/components/svg/Logo';
import site from './site.module.css';

export default function Home() {
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
        <h2 id="join-who" className="text-xl font-semibold">
          Join the World Horse Organization
        </h2>
        <p className="text-sm text-secondary leading-relaxed margin-top-sm">
          Become part of a community working to free horses in the real world
          and care for them in the digital sanctuary. Campaigns, advocacy, and
          the horse racing game are all part of the same mission — not separate
          products.
        </p>
        <div className="margin-top">
          <Link href="/sign-in" className="btn btn-primary">
            Join the WHO
          </Link>
        </div>
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
                trade guardianship, and breed the next generation — included when
                you join.
              </p>
              <p className={site.programCardCta}>
                <Link href="/sign-in" className={site.inlineLink}>
                  Join the WHO &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

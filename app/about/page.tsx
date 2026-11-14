import type { Metadata } from 'next';
import Link from 'next/link';
import site from '../site.module.css';

export const metadata: Metadata = {
  title: 'About — World Horse Organization',
  description:
    'Why the World Horse Organization exists, how guardianship works, and who runs it.',
};

const WHW_REHOMING_URL =
  'https://www.worldhorsewelfare.org/rehome/about-rehoming/rehoming-agreement';

const WHW_SAFETY_NET_URL =
  'https://www.worldhorsewelfare.org/blog/i-would-recommend-rehoming-any-horse-or-pony-from-world-horse-welfare';

const LANGUAGE: { instead: string; say: string }[] = [
  { instead: 'Owner', say: 'Guardian' },
  { instead: 'Buy a horse', say: 'Assume guardianship' },
  { instead: 'Sell a horse', say: 'Transfer guardianship' },
  { instead: 'Your horse', say: 'The horse in your care' },
];

export default function AboutPage() {
  return (
    <main className={site.contentWide}>
      <section className="margin-bottom-xxl">
        <p className="text-sm mono uppercase text-tertiary">About</p>
        <h1
          className={`text-4xl font-bold margin-top-sm ${site.heroHeading} ${site.heroHeadingLg}`}
        >
          Horses deserve guardians, not owners
        </h1>
        <p className="margin-top text-xl text-secondary leading-relaxed">
          The World Horse Organization is committed to making sure every horse
          in the world gets released from ownership into the freedom of the
          WHO.
        </p>
      </section>

      <section className="margin-bottom-xxl">
        <h2
          className={`text-sm mono uppercase text-tertiary margin-bottom-lg ${site.sectionHeading}`}
        >
          Why guardianship
        </h2>
        <div className={`text-secondary leading-relaxed ${site.stack4}`}>
          <p>
            When a horse is property, its life depends on what it&apos;s worth
            to whoever holds the papers. Horses get sold on when they slow
            down, passed between strangers, or sent to auction when money gets
            tight. A guardian takes care of a horse without being able to cash
            it out, and the horse always has somewhere to go back to.
          </p>
          <p>
            This model already works at scale. World Horse Welfare, a UK
            charity that has helped horses for nearly 100 years, keeps
            ownership of every horse it rescues for the rest of the
            horse&apos;s life. People who rehome one pay for its care but{' '}
            <a
              href={WHW_REHOMING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={site.inlineLink}
            >
              never own it
            </a>
            , can&apos;t sell or breed it, and can always return it. Around
            2,200 of their horses{' '}
            <a
              href={WHW_SAFETY_NET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={site.inlineLink}
            >
              live in homes on those terms
            </a>
            . The WHO brings the same idea to the United States, starting with
            the carriage horses of Central Park.
          </p>
        </div>
      </section>

      <section className="margin-bottom-xxl">
        <h2
          className={`text-sm mono uppercase text-tertiary margin-bottom-lg ${site.sectionHeading}`}
        >
          What we do
        </h2>
        <div className={site.programGrid}>
          <Link
            href="/campaigns"
            className={`border bg-surface padding-lg ${site.programCard} ${site.newsCard}`}
          >
            <h3 className="text-lg font-semibold">Campaigns</h3>
            <p className="text-sm text-secondary leading-relaxed margin-top-sm">
              Real-world campaigns for horses in harm&apos;s way. Our first,
              ending carriage rides in Central Park, won in October 2026.
            </p>
            <span className={`${site.programCardCta} ${site.inlineLink}`}>
              See our campaigns &rarr;
            </span>
          </Link>
          <Link
            href="/horse-racing/stable"
            className={`border bg-surface padding-lg ${site.programCard} ${site.newsCard}`}
          >
            <h3 className="text-lg font-semibold">Digital sanctuary</h3>
            <p className="text-sm text-secondary leading-relaxed margin-top-sm">
              A horse racing game where every horse has a guardian and nobody
              owns one. Rescue horses, race them weekly, and transfer
              guardianship.
            </p>
            <span className={`${site.programCardCta} ${site.inlineLink}`}>
              Visit the sanctuary &rarr;
            </span>
          </Link>
        </div>
      </section>

      <section className="margin-bottom-xxl">
        <h2
          className={`text-sm mono uppercase text-tertiary margin-bottom-lg ${site.sectionHeading}`}
        >
          How we talk about horses
        </h2>
        <p className="text-sm text-secondary leading-relaxed margin-bottom">
          The words matter, so we use these everywhere: on this site, in the
          game, and in how we talk to each other.
        </p>
        <table className={`text-sm ${site.languageTable}`}>
          <thead>
            <tr>
              <th scope="col">Instead of</th>
              <th scope="col">We say</th>
            </tr>
          </thead>
          <tbody>
            {LANGUAGE.map((row) => (
              <tr key={row.say}>
                <td className="text-tertiary">{row.instead}</td>
                <td className="text-primary">{row.say}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="margin-bottom-xxl border bg-surface padding-lg">
        <h2
          className={`text-sm mono uppercase text-tertiary margin-bottom ${site.sectionHeading}`}
        >
          Who runs the WHO
        </h2>
        <div className={`text-sm text-secondary leading-relaxed ${site.stack3}`}>
          <p>
            The WHO is run by Web Tune LLC, a small independent studio. Because
            we&apos;re a company rather than a registered charity, we
            don&apos;t take donations. When you want to give money to horses,
            we send you straight to accredited sanctuaries so all of it goes to
            their care.
          </p>
          <p>
            The game is free to play. When the in-game credit store opens,
            profits from it will fund our campaigns and sanctuary placement,
            and we&apos;ll publish exactly how that money is split on this
            page.
          </p>
        </div>
        <div className="margin-top">
          <Link href="/get-involved" className="btn btn-secondary-outline">
            Ways to get involved
          </Link>
        </div>
      </section>
    </main>
  );
}

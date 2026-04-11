import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './free-the-horses.module.css';

export const metadata: Metadata = {
  title: 'Free the Horses — World Horse Organization',
  description:
    "The WHO's campaign to end horse-drawn carriages in Central Park and transition to humane electric alternatives.",
};

const HORSES_LOST = [
  'Ryder',
  'Shadow',
  'Aysha',
  'Lily Rose',
  'Spotty',
  'Smoothie',
  'Juliet',
  'Jackie',
  'Lucky',
  'Monty',
  'Bobby',
  'Billy',
  'Freddy',
  'Luciana',
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Aren't the horses well cared for? They get vet checks and mandatory rest.",
    a: 'Regulated cruelty is still cruelty. No amount of regulation changes the core problem: prey animals hauling weight through Midtown traffic, deprived of pasture, herd life, and natural movement. The mandatory rest is downtime at upstate rotation farms — not retirement.',
  },
  {
    q: 'These horses would be sent to slaughter without this industry.',
    a: 'If the best defense is "we\'re better than a slaughterhouse," the bar is underground. Ryder\'s Law includes mandatory sanctuary retirement — no horse goes to auction. Multiple rescue organizations have pledged capacity, and the WHO is fundraising to cover placement costs.',
  },
  {
    q: 'Horse carriages are a historic part of Central Park.',
    a: "Central Park was designed in 1858 when horses were the primary mode of transportation. The city has changed. History evolves. We can honor the aesthetic with electric carriages that look classic but don't require a living animal to suffer for a tourist photo.",
  },
  {
    q: 'What about the 300+ jobs?',
    a: "Nobody loses their job. Drivers transition to electric carriages — same routes, same tips, same scenic experience. The WHO supports a funded training program and vehicle subsidies so the switch costs workers nothing. This upgrades the job, it doesn't eliminate it.",
  },
  {
    q: "Isn't this really a real estate land grab for the stable property?",
    a: 'The WHO has zero real estate interest. We want the horses freed, not the stables sold. If the stables can be repurposed as electric carriage depots or community space, great.',
  },
  {
    q: 'The horses seem calm and content.',
    a: 'Learned helplessness looks like calm. These are herd animals denied everything natural to them — open grazing, free movement, bonding with other horses. Not visibly suffering is not the same as thriving.',
  },
  {
    q: "Won't the horses just end up at another job somewhere else?",
    a: "Ryder's Law includes provisions requiring horses be retired to sanctuaries, not resold for commercial work. The WHO will track and publicly report on every retired horse — where they are, how they're doing, with regular photo updates.",
  },
];

export default function FreeTheHorsesPage() {
  return (
    <main className={styles.pageContainer}>
      <Link href="/" className={`text-xs text-tertiary ${styles.backLink}`}>
        &larr; Home
      </Link>

      {/* Hero */}
      <section className="margin-top-lg margin-bottom-xxl">
        <h1
          className={`text-4xl font-bold ${styles.heroHeading} ${styles.heroHeadingResponsive}`}
        >
          Free the Horses
        </h1>
        <p className="margin-top text-xl text-secondary leading-relaxed">
          The WHO&apos;s first real-world campaign: end horse-drawn carriages in
          Central Park and transition to electric alternatives. No horse loses
          its life. No worker loses their job.
        </p>
      </section>

      {/* The Problem */}
      <section className="margin-bottom-xxl">
        <h2
          className={`text-sm mono uppercase text-tertiary margin-bottom-lg ${styles.sectionHeading}`}
        >
          The Problem
        </h2>
        <div className={`text-secondary leading-relaxed ${styles.stack4}`}>
          <p>
            Every day in New York City, horses are forced to haul heavy
            carriages through some of the most congested streets in the country.
            They breathe car exhaust for hours, pound pavement in extreme heat
            and cold, and are denied everything natural to them &mdash; pasture,
            open movement, herd life.
          </p>
          <p>
            They&apos;re prey animals. When they spook &mdash; and they do,
            regularly &mdash; people get hurt. In a single week in May 2025,
            three horses bolted in Central Park, injuring at least four people.
            No amount of regulation can prevent a startle response.
          </p>
          <p>
            A{' '}
            <strong className="text-primary">
              2022 poll found 71% of NYC voters oppose horse-drawn carriages
            </strong>
            . Major cities worldwide &mdash; Beijing, Paris, London, New Delhi
            &mdash; have already banned them. Even Palm Beach and Biloxi have
            moved on. New York is behind.
          </p>
        </div>
      </section>

      {/* Memorial */}
      <section className="margin-bottom-xxl border bg-surface padding-lg">
        <h2
          className={`text-sm mono uppercase text-tertiary margin-bottom ${styles.sectionHeading}`}
        >
          In memory
        </h2>
        <p className="text-sm text-secondary margin-bottom">
          Horses who have died or been injured in recent years working
          NYC&apos;s carriage trade:
        </p>
        <div className="display-flex gap-sm" style={{ flexWrap: 'wrap' }}>
          {HORSES_LOST.map((name) => (
            <span
              key={name}
              className={`border-radius-xl border text-sm text-secondary ${styles.pill}`}
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* The Plan */}
      <section className="margin-bottom-xxl">
        <h2
          className={`text-sm mono uppercase text-tertiary margin-bottom-lg ${styles.sectionHeading}`}
        >
          The Plan
        </h2>

        <div className={styles.stack8}>
          <div>
            <h3 className="text-lg font-semibold margin-bottom-sm">
              For the horses: sanctuary retirement
            </h3>
            <ul
              className={`text-secondary text-sm leading-relaxed flat-list ${styles.stack2}`}
            >
              <li className="display-flex gap-sm">
                <span className={`text-tertiary ${styles.noShrink}`}>
                  &bull;
                </span>
                Every retired horse goes to an accredited sanctuary &mdash; no
                auctions, no resale.
              </li>
              <li className="display-flex gap-sm">
                <span className={`text-tertiary ${styles.noShrink}`}>
                  &bull;
                </span>
                The WHO fundraises to cover transport, intake, and the first
                year of care.
              </li>
              <li className="display-flex gap-sm">
                <span className={`text-tertiary ${styles.noShrink}`}>
                  &bull;
                </span>
                Partnerships with established organizations like Catskill Animal
                Sanctuary and Equine Advocates.
              </li>
              <li className="display-flex gap-sm">
                <span className={`text-tertiary ${styles.noShrink}`}>
                  &bull;
                </span>
                Every real retired horse gets a named tribute horse in the WHO
                digital sanctuary &mdash; keeping their story alive.
              </li>
              <li className="display-flex gap-sm">
                <span className={`text-tertiary ${styles.noShrink}`}>
                  &bull;
                </span>
                Transparent public tracking: where each horse is, how
                they&apos;re doing, with regular updates.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold margin-bottom-sm">
              For the workers: electric carriages
            </h3>
            <ul
              className={`text-secondary text-sm leading-relaxed flat-list ${styles.stack2}`}
            >
              <li className="display-flex gap-sm">
                <span className={`text-tertiary ${styles.noShrink}`}>
                  &bull;
                </span>
                Same routes through Central Park. Same scenic experience for
                tourists. Same tips for drivers.
              </li>
              <li className="display-flex gap-sm">
                <span className={`text-tertiary ${styles.noShrink}`}>
                  &bull;
                </span>
                Existing carriage medallion holders convert to electric permits
                at no cost.
              </li>
              <li className="display-flex gap-sm">
                <span className={`text-tertiary ${styles.noShrink}`}>
                  &bull;
                </span>
                Funded training program on EV operation &mdash; short and
                practical, these are experienced drivers.
              </li>
              <li className="display-flex gap-sm">
                <span className={`text-tertiary ${styles.noShrink}`}>
                  &bull;
                </span>
                Vehicle subsidies so the switch costs workers nothing.
              </li>
              <li className="display-flex gap-sm">
                <span className={`text-tertiary ${styles.noShrink}`}>
                  &bull;
                </span>
                Vintage-style electric carriages preserve the classic aesthetic
                without the animal.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold margin-bottom-sm">
              For the city: a smooth transition
            </h3>
            <ul
              className={`text-secondary text-sm leading-relaxed flat-list ${styles.stack2}`}
            >
              <li className="display-flex gap-sm">
                <span className={`text-tertiary ${styles.noShrink}`}>
                  &bull;
                </span>
                18&ndash;24 month wind-down period. No cliff &mdash; horse
                licenses sunset gradually while electric permits ramp up.
              </li>
              <li className="display-flex gap-sm">
                <span className={`text-tertiary ${styles.noShrink}`}>
                  &bull;
                </span>
                Tourists still get the carriage ride. It just doesn&apos;t
                require a living animal to suffer.
              </li>
              <li className="display-flex gap-sm">
                <span className={`text-tertiary ${styles.noShrink}`}>
                  &bull;
                </span>
                Quieter, zero-emission vehicles improve the park experience for
                everyone.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Where things stand */}
      <section className="margin-bottom-xxl">
        <h2
          className={`text-sm mono uppercase text-tertiary margin-bottom-lg ${styles.sectionHeading}`}
        >
          Where Things Stand
        </h2>
        <div
          className={`text-secondary leading-relaxed text-sm ${styles.stack4}`}
        >
          <p>
            <strong className="text-primary">Ryder&apos;s Law</strong> (Intro
            967), named after a carriage horse that collapsed and died in
            Hell&apos;s Kitchen in 2022, would phase out horse carriage licenses
            and replace them with electric alternatives. It was voted down by
            the City Council Health Committee in November 2025 (4&ndash;1, with
            2 abstentions) after being forced to a vote through a procedural
            maneuver.
          </p>
          <p>
            Former Mayor Adams signed{' '}
            <strong className="text-primary">Executive Order 56</strong> in
            September 2025, strengthening oversight and preparing for an
            eventual ban. The current mayor has taken a cautious &ldquo;deeper
            study&rdquo; position.
          </p>
          <p>
            <strong className="text-primary">17 Council members</strong>{' '}
            co-sponsored the bill. The{' '}
            <strong className="text-primary">Central Park Conservancy</strong>{' '}
            has come out against the carriages &mdash; a significant shift.
            Advocacy groups including NYCLASS, the Animal Legal Defense Fund,
            and PETA continue to push for reintroduction.
          </p>
          <p>
            The bill will be reintroduced. When it is, the WHO will be ready to
            support it &mdash; with funds, with platform, and with a credible
            plan for both the horses and the workers.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="margin-bottom-xxl">
        <h2
          className={`text-sm mono uppercase text-tertiary margin-bottom-lg ${styles.sectionHeading}`}
        >
          Common Questions
        </h2>
        <div className={styles.stack6}>
          {FAQ.map((item, i) => (
            <div key={i} className="border bg-surface padding-lg">
              <h3 className="font-semibold text-sm margin-bottom-sm">
                &ldquo;{item.q}&rdquo;
              </h3>
              <p className="text-sm text-secondary leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What WHO is doing */}
      <section className="margin-bottom-xxl">
        <h2
          className={`text-sm mono uppercase text-tertiary margin-bottom-lg ${styles.sectionHeading}`}
        >
          What the WHO Is Doing
        </h2>
        <div
          className={`text-secondary leading-relaxed text-sm ${styles.stack4}`}
        >
          <p>
            The World Horse Organization exists because horses deserve freedom.
            That mission doesn&apos;t stop at the digital sanctuary. Here&apos;s
            how we&apos;re contributing to the real-world fight:
          </p>
          <ul className={`flat-list ${styles.stack2}`}>
            <li className="display-flex gap-sm">
              <span className={`color-green ${styles.noShrink}`}>Now</span>
              <span>
                This page. Raising awareness and making the case publicly.
              </span>
            </li>
            <li className="display-flex gap-sm">
              <span className={`color-green ${styles.noShrink}`}>Now</span>
              <span>
                Partnering with NYCLASS and other advocacy organizations.
              </span>
            </li>
            <li className="display-flex gap-sm">
              <span className={`color-yellow ${styles.noShrink}`}>Soon</span>
              <span>
                In-game credit purchases fund the WHO mission. Profits from
                microtransactions go directly to the cause.
              </span>
            </li>
            <li className="display-flex gap-sm">
              <span className={`color-yellow ${styles.noShrink}`}>Soon</span>
              <span>
                A public running total of funds raised, displayed right here.
              </span>
            </li>
            <li className="display-flex gap-sm">
              <span className={`text-tertiary ${styles.noShrink}`}>Later</span>
              <span>
                Tribute horses in the game for every real horse retired from
                Central Park service.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="border bg-surface padding-xl align-center">
        <h2 className="text-2xl font-bold margin-bottom-sm">
          Horses belong on pastures, not pavement.
        </h2>
        <p
          className={`text-sm text-secondary margin-bottom-lg ${styles.ctaDescription}`}
        >
          Join the WHO. Play the game. Every credit purchased helps fund
          real-world sanctuary placement for Central Park&apos;s carriage
          horses.
        </p>
        <Link
          href="/"
          className={`btn btn-primary display-inline-block ${styles.ctaButton}`}
        >
          Join the World Horse Organization
        </Link>
      </section>
    </main>
  );
}

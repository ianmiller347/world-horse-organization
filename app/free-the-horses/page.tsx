import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './free-the-horses.module.css';

export const metadata: Metadata = {
  title: 'Free the Horses — World Horse Organization',
  description:
    "The WHO's campaign to end horse-drawn carriages in Central Park and transition to humane electric alternatives.",
};

const LEGISLATION_URL =
  'https://legistar.council.nyc.gov/LegislationDetail.aspx?ID=8067835&GUID=53C552B4-4BC2-41DA-A14A-560E74E7F3E1&Options=ID|Text|&Search=marte';

const NYCLASS_ACTION_URL = 'https://nyclass.org/stophorseabuse/';

const VFAR_ACTION_URL = 'https://vfar.org/horses/';

const REPORTING_LINKS: {
  date: string;
  label: string;
  href: string;
  source: string;
}[] = [
  {
    date: 'June 18, 2026',
    label:
      'Teen tourist killed after runaway carriage overturns in Central Park',
    href: 'https://www.nytimes.com/2026/06/18/nyregion/horse-carriage-central-park-death.html',
    source: 'New York Times',
  },
  {
    date: 'June 9, 2026',
    label: 'Carriage horse Deniz collapses and dies near Strawberry Fields',
    href: 'https://nypost.com/2026/06/09/us-news/nyc-carriage-horse-collapses-and-dies-in-central-park-traumatizing-parkgoers/',
    source: 'New York Post',
  },
  {
    date: 'May 19, 2026',
    label: 'Two carriages collide; driver hospitalized near West 59th Street',
    href: 'https://www.nytimes.com/2026/05/19/nyregion/central-park-nyc-horse-carriage-collision.html',
    source: 'New York Times',
  },
  {
    date: 'Aug. 12, 2025',
    label: 'Central Park Conservancy calls for end of horse-drawn carriages',
    href: 'https://www.nytimes.com/2025/08/12/nyregion/central-park-horse-carriages.html',
    source: 'New York Times',
  },
];

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
  'Deniz',
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
    a: "Central Park was designed in 1858 when horses were the primary mode of transportation. The city has changed. The Central Park Conservancy itself now says carriages are incompatible with a modern, heavily used park. History evolves. We can honor the aesthetic with electric carriages that look classic but don't require a living animal to suffer for a tourist photo.",
  },
  {
    q: 'What about the 300+ jobs?',
    a: "The drivers' union is right that these jobs matter — they're an important source of work for an overwhelmingly immigrant workforce. That's why the WHO supports transitioning those same drivers to electric carriages: same routes, same tips, same scenic experience, without a prey animal — or the person behind it — in harm's way. Funded training and vehicle subsidies so the switch costs workers nothing.",
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
            regularly &mdash; it is not only horses who get hurt. On June 17,
            2026, a horse named Sampson bolted near Tavern on the Green while
            the driver had stepped away to photograph a family visiting from
            India for his graduation. Romanch Mahajan, 18, fell from the
            overturned carriage and died at the hospital; relatives said he may
            have jumped trying to help his mother. The rest of his family
            escaped with minor injuries. The
            Central Park Conservancy called it the{' '}
            <strong className="text-primary">
              eighth horse-related incident in the park in 13 months
            </strong>
            , and the first known passenger death in more than 150 years of
            carriage rides there. Less than two weeks earlier, another carriage
            horse had died in the same park.{' '}
            <a
              href="https://www.nytimes.com/2026/06/18/nyregion/horse-carriage-central-park-death.html"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              New York Times coverage
            </a>
            .
          </p>
          <p>
            On June 9, 2026, a carriage horse named Deniz collapsed and died
            near Strawberry Fields and West 72nd Street around 7:30 p.m.,
            thrashing on the pavement for roughly ten minutes as parkgoers
            watched. A preliminary necropsy found needles from a toxic Japanese
            yew plant in his stomach. The incident came less than 24 hours
            before advocates rallied at City Hall to reintroduce Ryder&apos;s
            Law.{' '}
            <a
              href="https://nypost.com/2026/06/09/us-news/nyc-carriage-horse-collapses-and-dies-in-central-park-traumatizing-parkgoers/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              New York Post coverage
            </a>
            .
          </p>
          <p>
            On May 18, 2026, two horse-drawn carriages collided in Central Park
            near West 59th Street; one carriage overturned and the driver was
            hospitalized. The horses were reported uninjured that day &mdash;
            luck, not safety. It happened during a heat advisory, while
            advocates again called for the City Council to pass Ryder&apos;s
            Law.{' '}
            <a
              href="https://www.nytimes.com/2026/05/19/nyregion/central-park-nyc-horse-carriage-collision.html"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              New York Times coverage
            </a>
            .
          </p>
          <p>
            In May 2025, three horses bolted in Central Park in a single week,
            injuring at least four people. No amount of regulation can prevent a
            startle response.
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
          <p>
            The{' '}
            <strong className="text-primary">Central Park Conservancy</strong>,
            the nonprofit that maintains the park, broke decades of neutrality
            in August 2025 and called on city leaders to end horse-drawn
            carriages in Central Park. In a letter to the mayor and
            City Council speaker, Conservancy president Elizabeth W. Smith wrote
            that with record visitation, banning carriages has become{' '}
            <strong className="text-primary">
              a matter of public health and safety for park visitors
            </strong>
            , citing runaway incidents, damage to park drives from carriages and
            horseshoes, and manure left on the roads despite cleanup rules. The
            Conservancy endorsed Ryder&apos;s Law.{' '}
            <a
              href="https://www.nytimes.com/2025/08/12/nyregion/central-park-horse-carriages.html"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              New York Times coverage
            </a>
            .
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
                tourists. Same tips for drivers &mdash; including the largely
                immigrant workforce that depends on this work today.
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
            <strong className="text-primary">Ryder&apos;s Law</strong> (
            <a
              href={LEGISLATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              Int 0943-2026
            </a>
            ), reintroduced in June 2026, would wind down horse-drawn cabs:
            no new licenses after May 31, 2028, full prohibition from June 1,
            2028, humane retirement for carriage horses, and a workforce
            development program for drivers. Council Speaker Julie Menin has
            scheduled a Health Committee hearing for July 2026. A prior version
            was voted down in committee in November 2025 (4&ndash;1, with 2
            abstentions).
          </p>
          <p>
            NYCLASS has led advocacy for years; the Central Park Conservancy
            broke neutrality in August 2025. After the May and June 2026
            incidents, both renewed calls to pass the bill. Mayor Mamdani has
            said it is time to end the carriage industry in city parks.{' '}
            <a
              href="https://www.nytimes.com/2025/08/12/nyregion/central-park-horse-carriages.html"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              Times reporting on the Conservancy&apos;s call to ban carriages
            </a>
            .
          </p>
          <p>
            The WHO amplifies this fight to our audience and is building
            sanctuary placement and worker-transition funding &mdash; we defer
            to NYCLASS for grassroots lobbying and official campaign tools.
          </p>
        </div>
      </section>

      {/* Take action */}
      <section className="margin-bottom-xxl border bg-surface padding-lg">
        <h2
          className={`text-sm mono uppercase text-tertiary margin-bottom ${styles.sectionHeading}`}
        >
          Take Action
        </h2>
        <div className={`text-secondary leading-relaxed text-sm ${styles.stack4}`}>
          <p>
            <strong className="text-primary">Int 0943-2026</strong> is before
            the City Council Health Committee, with a hearing expected in{' '}
            <strong className="text-primary">July 2026</strong>. The bill phases
            out horse-drawn cabs, requires humane retirement for horses, and
            funds workforce transition for drivers &mdash; aligned with the
            WHO&apos;s plan for sanctuary placement and electric carriages.
          </p>
          <p>
            NYCLASS runs the primary NYC campaign on this issue (alongside
            groups like the Central Park Conservancy and Voters For Animal
            Rights). Use their tools to contact your Council member or Speaker
            Menin&apos;s office &mdash; especially before the hearing.
          </p>
          <div
            className={`display-flex gap-sm margin-top ${styles.takeActionButtons}`}
          >
            <a
              href={NYCLASS_ACTION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Take action with NYCLASS
            </a>
            <a
              href={VFAR_ACTION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary-outline"
            >
              Urge your Council member (VFAR)
            </a>
            <a
              href={LEGISLATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary-outline"
            >
              Read the bill (Legistar)
            </a>
          </div>
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
                Seeking partnership with NYCLASS &mdash; amplifying their
                campaign and linking to{' '}
                <a
                  href={NYCLASS_ACTION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.inlineLink}
                >
                  their action tools
                </a>
                .
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

      {/* Sources */}
      <section className="margin-bottom-xxl">
        <h2
          className={`text-sm mono uppercase text-tertiary margin-bottom-lg ${styles.sectionHeading}`}
        >
          Reporting
        </h2>
        <ul
          className={`text-sm text-secondary leading-relaxed flat-list ${styles.stack2}`}
        >
          {REPORTING_LINKS.map((item) => (
            <li key={item.href}>
              <span className="text-tertiary">{item.date}</span>
              {' — '}
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
              >
                {item.label}
              </a>
              <span className="text-tertiary"> ({item.source})</span>
            </li>
          ))}
        </ul>
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

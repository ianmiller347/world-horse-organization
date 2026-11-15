import type { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@/lib/auth/config';
import site from '../site.module.css';

export const metadata: Metadata = {
  title: 'Get involved — World Horse Organization',
  description:
    'Support accredited horse sanctuaries, follow our campaigns, and join the WHO digital sanctuary.',
};

const SANCTUARIES: { name: string; href: string; note: string }[] = [
  {
    name: 'Catskill Animal Sanctuary',
    href: 'https://casanctuary.org/',
    note: 'Saugerties, New York',
  },
  {
    name: 'Equine Advocates',
    href: 'https://www.equineadvocates.org/',
    note: 'Chatham, New York',
  },
];

const GFAS_DIRECTORY_URL =
  'https://sanctuaryfederation.org/find-a-sanctuary/?animal=equine&region=NA';

const UHC_DIRECTORY_URL =
  'https://unitedhorsecoalition.org/equine-resources-database/';

const NYCLASS_URL = 'https://nyclass.org/stophorseabuse/';

const VFAR_URL = 'https://vfar.org/horses/';

export default async function GetInvolvedPage() {
  const session = await auth();
  const isSignedIn = !!session?.user;

  return (
    <main className={site.contentWide}>
      <section className="margin-bottom-xxl">
        <p className="text-sm mono uppercase text-tertiary">Get involved</p>
        <h1
          className={`text-4xl font-bold margin-top-sm ${site.heroHeading} ${site.heroHeadingLg}`}
        >
          Help horses where they are
        </h1>
        <p className="margin-top text-lg text-secondary leading-relaxed">
          There are a few ways to help, and most of them don&apos;t need an
          account. Pick whatever fits.
        </p>
      </section>

      <div className={site.stack6}>
        <section className="border bg-surface padding-lg">
          <h2 className="text-lg font-semibold">Support a sanctuary</h2>
          <p className="text-sm text-secondary leading-relaxed margin-top-sm">
            Sanctuaries do the daily work of caring for retired horses: feed,
            vets, farriers, and space to live. About 160 Central Park carriage
            horses will need homes by June 2028. Giving directly to a sanctuary
            puts your money straight into their care.
          </p>
          <ul className={`text-sm flat-list margin-top ${site.stack2}`}>
            {SANCTUARIES.map((sanctuary) => (
              <li key={sanctuary.href}>
                <a
                  href={sanctuary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={site.inlineLink}
                >
                  {sanctuary.name}
                </a>
                <span className="text-tertiary"> — {sanctuary.note}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-secondary leading-relaxed margin-top">
            Looking for one near you? The{' '}
            <a
              href={GFAS_DIRECTORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={site.inlineLink}
            >
              Global Federation of Animal Sanctuaries
            </a>{' '}
            lists accredited equine sanctuaries across North America, and the{' '}
            <a
              href={UHC_DIRECTORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={site.inlineLink}
            >
              United Horse Coalition
            </a>{' '}
            keeps a searchable directory of more than 1,200 equine
            organizations.
          </p>
        </section>

        <section className="border bg-surface padding-lg">
          <h2 className="text-lg font-semibold">Follow the campaign</h2>
          <p className="text-sm text-secondary leading-relaxed margin-top-sm">
            The Central Park ban passed, and the next two years decide how well
            it goes for the horses and the drivers. NYCLASS and Voters For
            Animal Rights led the fight for the law and are good places to
            follow what happens next. We post every update with sources on our
            News page.
          </p>
          <div className={`display-flex gap-sm margin-top ${site.flexWrap}`}>
            <Link href="/news" className="btn btn-primary">
              Read the news
            </Link>
            <a
              href={NYCLASS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary-outline"
            >
              NYCLASS
            </a>
            <a
              href={VFAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary-outline"
            >
              Voters For Animal Rights
            </a>
          </div>
        </section>

        <section className="border bg-surface padding-lg">
          <h2 className="text-lg font-semibold">Play in the digital sanctuary</h2>
          <p className="text-sm text-secondary leading-relaxed margin-top-sm">
            Rescue horses, race them weekly, and transfer guardianship with
            other players. The game is free. When the credit store opens, its
            profits will fund our real-world work.
          </p>
          <div className="margin-top">
            {isSignedIn ? (
              <Link href="/horse-racing/stable" className="btn btn-secondary-outline">
                Go to your stable
              </Link>
            ) : (
              <Link href="/sign-in" className="btn btn-secondary-outline">
                Join the WHO to play
              </Link>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

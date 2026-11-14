import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CAMPAIGNS,
  CAMPAIGN_STATUS_LABELS,
} from '@/lib/campaign/campaigns';
import site from '../site.module.css';

export const metadata: Metadata = {
  title: 'Campaigns — World Horse Organization',
  description:
    'Real-world campaigns from the World Horse Organization, starting with ending horse-drawn carriages in Central Park.',
};

export default function CampaignsPage() {
  return (
    <main className={site.contentWide}>
      <section className="margin-bottom-xxl">
        <p className="text-sm mono uppercase text-tertiary">Campaigns</p>
        <h1
          className={`text-4xl font-bold margin-top-sm ${site.heroHeading} ${site.heroHeadingLg}`}
        >
          Real-world work for real horses
        </h1>
        <p className="margin-top text-lg text-secondary leading-relaxed">
          Each campaign picks one place where horses are being harmed, works
          with the groups already on the ground, and stays with it until the
          horses are safe. Every campaign is open to everyone. You do not need
          an account to read or take action.
        </p>
      </section>

      <ul className={`flat-list ${site.stack6}`}>
        {CAMPAIGNS.map((campaign) => (
          <li key={campaign.href}>
            <Link
              href={campaign.href}
              className={`border bg-surface padding-lg ${site.programCard} ${site.newsCard} ${site.programCardFeatured}`}
            >
              <p className="text-sm mono uppercase text-tertiary">
                {campaign.location}
                <span className={site.statusPill}>
                  {CAMPAIGN_STATUS_LABELS[campaign.status]}
                </span>
              </p>
              <h2 className="text-xl font-semibold margin-top-sm">
                {campaign.name}
              </h2>
              <p className="text-sm text-secondary leading-relaxed margin-top-sm">
                {campaign.summary}
              </p>
              <span className={`${site.programCardCta} ${site.inlineLink}`}>
                Read the campaign &rarr;
              </span>
            </Link>
          </li>
        ))}
        <li className="border padding-lg">
          <p className="text-sm mono uppercase text-tertiary">
            United States
            <span className={`${site.statusPill} ${site.statusPillMuted}`}>
              {CAMPAIGN_STATUS_LABELS.researching}
            </span>
          </p>
          <h2 className="text-xl font-semibold margin-top-sm">
            Our next campaign
          </h2>
          <p className="text-sm text-secondary leading-relaxed margin-top-sm">
            We&apos;re choosing the next place to focus. The bar is the same as
            Central Park: horses at real risk, partners already doing the work,
            and a clear finish line. Follow{' '}
            <Link href="/news" className={site.inlineLink}>
              News
            </Link>{' '}
            to hear first.
          </p>
        </li>
      </ul>
    </main>
  );
}

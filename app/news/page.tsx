import type { Metadata } from 'next';
import Link from 'next/link';
import { NEWS_POSTS, formatNewsDate } from '@/lib/news';
import site from '../site.module.css';

export const metadata: Metadata = {
  title: 'News — World Horse Organization',
  description:
    'Campaign updates and news from the World Horse Organization, with sources for every story.',
};

export default function NewsPage() {
  return (
    <main className={site.contentWide}>
      <section className="margin-bottom-xxl">
        <p className="text-sm mono uppercase text-tertiary">News</p>
        <h1
          className={`text-4xl font-bold margin-top-sm ${site.heroHeading} ${site.heroHeadingLg}`}
        >
          What&apos;s happening for horses
        </h1>
        <p className="margin-top text-lg text-secondary leading-relaxed">
          Updates from our campaigns, each one linked to the reporting behind
          it.
        </p>
      </section>

      <ul className={`flat-list ${site.stack6}`}>
        {NEWS_POSTS.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/news/${post.slug}`}
              className={`border bg-surface padding-lg ${site.programCard} ${site.newsCard}`}
            >
              <time
                dateTime={post.date}
                className="text-sm mono uppercase text-tertiary"
              >
                {formatNewsDate(post.date)}
              </time>
              <h2 className="text-lg font-semibold margin-top-sm">
                {post.title}
              </h2>
              <p className="text-sm text-secondary leading-relaxed margin-top-sm">
                {post.summary}
              </p>
              <span className={`${site.programCardCta} ${site.inlineLink}`}>
                Read more &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

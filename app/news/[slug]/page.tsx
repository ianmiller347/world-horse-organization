import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NewsBody } from '@/components/news/news-body';
import { NEWS_POSTS, formatNewsDate, getNewsPost } from '@/lib/news';
import site from '../../site.module.css';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return NEWS_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getNewsPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} — World Horse Organization`,
    description: post.summary,
  };
}

export default async function NewsPostPage({ params }: Props) {
  const post = getNewsPost((await params).slug);
  if (!post) notFound();

  return (
    <main className={site.content}>
      <Link href="/news" className={`text-sm ${site.backLink}`}>
        &larr; All news
      </Link>
      <article className="margin-top-lg">
        <time
          dateTime={post.date}
          className="text-sm mono uppercase text-tertiary"
        >
          {formatNewsDate(post.date)}
        </time>
        <h1 className={`text-3xl font-bold margin-top-sm ${site.heroHeading}`}>
          {post.title}
        </h1>
        <p className="margin-top text-lg text-secondary leading-relaxed">
          {post.summary}
        </p>

        <div className="margin-top-xl">
          <NewsBody paragraphs={post.body} />
        </div>

        <section className="margin-top-xl padding-top-lg border-top">
          <h2
            className={`text-sm mono uppercase text-tertiary margin-bottom ${site.sectionHeading}`}
          >
            Sources
          </h2>
          <ul className={`text-sm flat-list ${site.stack2}`}>
            {post.sources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={site.inlineLink}
                >
                  {source.text}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {post.campaignHref && (
          <div className="margin-top-xl">
            <Link href={post.campaignHref} className="btn btn-secondary-outline">
              Read the campaign
            </Link>
          </div>
        )}
      </article>
    </main>
  );
}

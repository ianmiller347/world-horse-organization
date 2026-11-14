import Link from 'next/link';
import type { NewsParagraph } from '@/lib/news';
import site from '@/app/site.module.css';

export function NewsBody({ paragraphs }: { paragraphs: NewsParagraph[] }) {
  return (
    <div className={`text-secondary leading-relaxed ${site.stack4}`}>
      {paragraphs.map((paragraph, i) => (
        <p key={i}>
          {paragraph.map((part, j) =>
            typeof part === 'string' ? (
              part
            ) : part.href.startsWith('/') ? (
              <Link key={j} href={part.href} className={site.inlineLink}>
                {part.text}
              </Link>
            ) : (
              <a
                key={j}
                href={part.href}
                target="_blank"
                rel="noopener noreferrer"
                className={site.inlineLink}
              >
                {part.text}
              </a>
            ),
          )}
        </p>
      ))}
    </div>
  );
}

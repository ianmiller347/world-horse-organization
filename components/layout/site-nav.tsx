'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserMenu } from '@/components/auth/user-menu';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import site from '@/app/site.module.css';

type SiteNavProps = {
  isSignedIn: boolean;
};

export function SiteNav({ isSignedIn }: SiteNavProps) {
  const pathname = usePathname();
  const isCampaign =
    pathname.startsWith('/campaigns') ||
    pathname.startsWith('/free-the-horses');
  const isNews = pathname.startsWith('/news');
  const isAbout = pathname.startsWith('/about');
  const isGame =
    pathname.startsWith('/horse-racing') || pathname === '/sign-in';

  return (
    <nav className={site.nav} aria-label="Site">
      <Link
        href="/campaigns"
        className={isCampaign ? site.navLinkActive : site.navLink}
      >
        Campaigns
      </Link>
      <Link
        href="/news"
        className={`${isNews ? site.navLinkActive : site.navLink} ${site.hideOnMobile}`}
      >
        News
      </Link>
      <Link
        href="/about"
        className={`${isAbout ? site.navLinkActive : site.navLink} ${site.hideOnMobile}`}
      >
        About
      </Link>
      <Link
        href={isSignedIn ? '/horse-racing/stable' : '/sign-in'}
        className={isGame ? site.navLinkActive : site.navLink}
      >
        Sanctuary
      </Link>
      <ThemeToggle />
      <div className={site.navAuth}>
        {isSignedIn ? (
          <UserMenu compact />
        ) : (
          <Link href="/sign-in" className={site.navSignIn}>
            Join
          </Link>
        )}
      </div>
    </nav>
  );
}

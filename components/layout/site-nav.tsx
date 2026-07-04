'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserMenu } from '@/components/auth/user-menu';
import site from '@/app/site.module.css';

type SiteNavProps = {
  isSignedIn: boolean;
};

export function SiteNav({ isSignedIn }: SiteNavProps) {
  const pathname = usePathname();
  const isCampaign = pathname.startsWith('/free-the-horses');
  const isGame =
    pathname.startsWith('/horse-racing') || pathname === '/sign-in';

  return (
    <nav className={site.nav} aria-label="Site">
      <Link
        href="/free-the-horses"
        className={isCampaign ? site.navLinkActive : site.navLink}
      >
        Campaigns
      </Link>
      <Link
        href={isSignedIn ? '/horse-racing/stable' : '/sign-in'}
        className={isGame ? site.navLinkActive : site.navLink}
      >
        Sanctuary
      </Link>
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

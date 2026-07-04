import { auth } from '@/lib/auth/config';
import Link from 'next/link';
import Logo from '@/components/svg/Logo';
import { SiteNav } from '@/components/layout/site-nav';
import site from '@/app/site.module.css';

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className={site.header}>
      <div className={site.headerInner}>
        <Link href="/" className={site.brand}>
          <Logo className={site.brandLogo} aria-hidden />
          <span className={site.brandName}>
            <span className={site.brandNameFull}>World Horse Organization</span>
            <span className={site.brandNameShort}>WHO</span>
          </span>
        </Link>
        <SiteNav isSignedIn={!!session?.user} />
      </div>
    </header>
  );
}

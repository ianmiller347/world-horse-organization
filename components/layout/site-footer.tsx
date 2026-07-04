import { auth } from '@/lib/auth/config';
import Link from 'next/link';
import site from '@/app/site.module.css';

export async function SiteFooter() {
  const session = await auth();
  const sanctuaryHref = session?.user ? '/horse-racing/stable' : '/sign-in';

  return (
    <footer className={site.footer}>
      <div className={site.footerInner}>
        <div className={site.footerGrid}>
          <p className={site.footerMission}>
            The World Horse Organization releases horses from ownership into
            collective care — through real-world campaigns and a digital
            sanctuary.
          </p>
          <nav className={site.footerLinks} aria-label="Footer">
            <Link href="/" className={site.footerLink}>
              Home
            </Link>
            <Link href="/free-the-horses" className={site.footerLink}>
              Free the Horses
            </Link>
            <Link href={sanctuaryHref} className={site.footerLink}>
              Digital sanctuary
            </Link>
            {!session?.user && (
              <Link href="/sign-in" className={site.footerLink}>
                Join
              </Link>
            )}
          </nav>
        </div>
        <p className={site.footerCopy}>
          &copy; {new Date().getFullYear()} World Horse Organization
        </p>
      </div>
    </footer>
  );
}

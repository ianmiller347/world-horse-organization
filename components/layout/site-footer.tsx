import Link from 'next/link';
import site from '@/app/site.module.css';

export function SiteFooter() {
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
            <Link href="/horse-racing/stable" className={site.footerLink}>
              Digital sanctuary
            </Link>
            <Link href="/sign-in" className={site.footerLink}>
              Join
            </Link>
          </nav>
        </div>
        <p className={site.footerCopy}>
          &copy; {new Date().getFullYear()} World Horse Organization
        </p>
      </div>
    </footer>
  );
}

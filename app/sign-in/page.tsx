import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/config';
import { SignInButton } from '@/components/auth/sign-in-button';
import site from '../site.module.css';

export const metadata: Metadata = {
  title: 'Join — World Horse Organization',
  description:
    'Join the World Horse Organization: create your account and access the digital sanctuary.',
};

export default async function SignInPage() {
  const session = await auth();
  if (session?.user) {
    redirect('/horse-racing/stable');
  }

  return (
    <main className={site.contentNarrow}>
      <h1 className={`text-3xl font-bold ${site.heroHeading}`}>
        Join the World Horse Organization
      </h1>
      <p className="text-secondary margin-top-lg leading-relaxed">
        Joining creates your WHO account with Google sign-in. You get access to
        the digital sanctuary — rescue horses, enter races, and trade
        guardianship as a guardian, never an owner.
      </p>
      <p className="text-sm text-secondary margin-top leading-relaxed">
        Real-world campaigns like{' '}
        <Link href="/free-the-horses" className={site.inlineLink}>
          Free the Horses
        </Link>{' '}
        are open to everyone. You do not need an account to read the campaign or
        contact your Council member through advocate tools.
      </p>
      <p className="text-sm text-tertiary margin-top leading-relaxed">
        In-game credit purchases will fund real-world sanctuary placement for
        retired carriage horses. That store is not live yet.
      </p>
      <div className="margin-top-xl">
        <SignInButton />
      </div>
    </main>
  );
}

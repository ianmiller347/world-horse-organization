import type { Metadata } from 'next';
import { SignInButton } from '@/components/auth/sign-in-button';
import site from '../site.module.css';

export const metadata: Metadata = {
  title: 'Join — World Horse Organization',
  description:
    'Join the World Horse Organization: support real-world horse advocacy and participate in the digital sanctuary.',
};

export default function SignInPage() {
  return (
    <main className={site.contentNarrow}>
      <h1 className={`text-3xl font-bold ${site.heroHeading}`}>
        Join the World Horse Organization
      </h1>
      <p className="text-secondary margin-top-lg leading-relaxed">
        The WHO is a community committed to releasing horses from ownership
        into collective care. When you join, you become part of that mission —
        supporting campaigns like Free the Horses and participating in the
        digital sanctuary, where you rescue horses, enter races, and trade
        guardianship as a guardian, never an owner.
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

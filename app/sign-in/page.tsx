import Link from 'next/link';
import { SignInButton } from '@/components/auth/sign-in-button';

export default function SignInPage() {
  return (
    <main
      className="display-flex fully-centered"
      style={{ flexDirection: 'column', minHeight: '60vh', padding: '0 1.5rem' }}
    >
      <div className="align-center" style={{ maxWidth: '24rem' }}>
        <Link href="/" className="text-xs text-tertiary">
          &larr; World Horse Organization
        </Link>
        <p className="text-sm mono uppercase text-tertiary margin-top-lg">
          Digital sanctuary
        </p>
        <h1
          className="text-3xl font-bold margin-top-sm"
          style={{ letterSpacing: '-0.025em' }}
        >
          Horse Racing Game
        </h1>
        <p className="text-secondary margin-top-lg leading-relaxed">
          Sign in to manage your stable, trade guardianship, and enter weekly
          races. This is the game component of the WHO &mdash; separate from our
          real-world campaigns.
        </p>
        <div className="margin-top-xl">
          <SignInButton />
        </div>
      </div>
    </main>
  );
}

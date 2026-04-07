import { SignInButton } from "@/components/auth/sign-in-button";

export default function SignInPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-sm space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Join the WHO
        </h1>
        <p className="text-foreground/60">
          Sign in to manage your stable, trade horses, and enter races.
        </p>
        <SignInButton />
      </div>
    </main>
  );
}

import { SignInButton } from "@/components/auth/sign-in-button";

export default function SignInPage() {
  return (
    <main className="display-flex fully-centered" style={{ flexDirection: "column", minHeight: "60vh" }}>
      <div className="align-center" style={{ maxWidth: "24rem" }}>
        <h1 className="text-3xl font-bold" style={{ letterSpacing: "-0.025em" }}>
          Join the WHO
        </h1>
        <p className="text-secondary margin-top-lg">
          Sign in to manage your stable, trade horses, and enter races.
        </p>
        <div className="margin-top-xl">
          <SignInButton />
        </div>
      </div>
    </main>
  );
}

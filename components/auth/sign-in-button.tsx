"use client";

import { signIn } from "next-auth/react";

type SignInButtonProps = {
  variant?: "primary" | "secondary-outline";
};

export function SignInButton({ variant = "primary" }: SignInButtonProps) {
  const className =
    variant === "primary" ? "btn btn-primary" : "btn btn-secondary-outline";

  return (
    <button onClick={() => signIn("google")} className={className}>
      Sign in with Google
    </button>
  );
}

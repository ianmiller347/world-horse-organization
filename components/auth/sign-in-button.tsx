"use client";

import { signIn } from "next-auth/react";

type SignInButtonProps = {
  variant?: "primary" | "secondary-outline";
  label?: string;
};

export function SignInButton({
  variant = "primary",
  label = "Join with Google",
}: SignInButtonProps) {
  const className =
    variant === "primary" ? "btn btn-primary" : "btn btn-secondary-outline";

  return (
    <button onClick={() => signIn("google")} className={className}>
      {label}
    </button>
  );
}

"use client";

import { signIn } from "next-auth/react";

export function SignInButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="btn btn-primary"
    >
      Sign in with Google
    </button>
  );
}

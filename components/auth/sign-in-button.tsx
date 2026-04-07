"use client";

import { signIn } from "next-auth/react";

export function SignInButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors cursor-pointer"
    >
      Sign in with Google
    </button>
  );
}

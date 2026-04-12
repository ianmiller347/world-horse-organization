"use client";

import { signOut, useSession } from "next-auth/react";

export function UserMenu() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="display-flex items-center gap-lg justify-center">
      <span className="text-sm text-secondary">
        {session.user.name || session.user.email}
      </span>
      <button
        onClick={() => signOut()}
        className="text-sm text-tertiary cursor-pointer"
      >
        Sign out
      </button>
    </div>
  );
}

"use client";

import { signOut, useSession } from "next-auth/react";

export function UserMenu() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-foreground/70">
        {session.user.name || session.user.email}
      </span>
      <button
        onClick={() => signOut()}
        className="text-sm text-foreground/50 hover:text-foreground transition-colors cursor-pointer"
      >
        Sign out
      </button>
    </div>
  );
}

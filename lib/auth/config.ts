import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { seedNewUser } from "@/lib/horses/seed";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  providers: [Google],
  pages: {
    signIn: "/sign-in",
  },
  events: {
    async createUser({ user }) {
      if (user.id) {
        await seedNewUser(user.id);
      }
    },
  },
});

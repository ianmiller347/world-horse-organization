import { db } from "@/lib/db";
import { balances, transactions } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

type DebitParams = {
  userId: string;
  amount: number;
  referenceType: "stake" | "guardianship_assumed";
  referenceId?: string;
};

type CreditParams = {
  userId: string;
  amount: number;
  referenceType: "stake_payout" | "guardianship_transferred" | "signup_bonus" | "prize";
  referenceId?: string;
};

/**
 * Debit credits from a user's balance. Returns false if insufficient funds.
 * Writes a transaction row and updates the balance atomically.
 */
export async function debit({
  userId,
  amount,
  referenceType,
  referenceId,
}: DebitParams): Promise<boolean> {
  const result = await db
    .update(balances)
    .set({
      amount: sql`${balances.amount} - ${amount}`,
      updatedAt: new Date(),
    })
    .where(
      sql`${balances.userId} = ${userId} AND ${balances.amount} >= ${amount}`
    )
    .returning();

  if (result.length === 0) return false;

  await db.insert(transactions).values({
    userId,
    type: "debit",
    amount,
    referenceType,
    referenceId,
  });

  return true;
}

/**
 * Credit credits to a user's balance.
 * Writes a transaction row and updates the balance atomically.
 */
export async function credit({
  userId,
  amount,
  referenceType,
  referenceId,
}: CreditParams): Promise<void> {
  await db
    .update(balances)
    .set({
      amount: sql`${balances.amount} + ${amount}`,
      updatedAt: new Date(),
    })
    .where(eq(balances.userId, userId));

  await db.insert(transactions).values({
    userId,
    type: "credit",
    amount,
    referenceType,
    referenceId,
  });
}

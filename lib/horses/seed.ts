import { db } from "@/lib/db";
import { balances, transactions, horses } from "@/lib/db/schema";
import { generateHorse } from "./generate";

const SIGNUP_BONUS = 1000;

export async function seedNewUser(userId: string) {
  const starterHorse = generateHorse();

  await db.insert(balances).values({ userId, amount: SIGNUP_BONUS });

  await db.insert(transactions).values({
    userId,
    type: "credit",
    amount: SIGNUP_BONUS,
    referenceType: "signup_bonus",
  });

  await db.insert(horses).values({
    ...starterHorse,
    guardianId: userId,
  });
}

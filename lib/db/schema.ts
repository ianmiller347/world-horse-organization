import {
  pgTable,
  text,
  timestamp,
  integer,
  real,
  json,
  primaryKey,
  pgEnum,
} from "drizzle-orm/pg-core";

// ──────────────────────────────────────────────
// Auth.js required tables
// ──────────────────────────────────────────────

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  ]
);

export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

// ──────────────────────────────────────────────
// Ledger (play-money balance + transactions)
// ──────────────────────────────────────────────

export const balances = pgTable("balances", {
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .primaryKey(),
  amount: integer("amount").default(0).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const transactionType = pgEnum("transaction_type", [
  "credit",
  "debit",
]);

export const referenceType = pgEnum("reference_type", [
  "signup_bonus",
  "stake",
  "stake_payout",
  "guardianship_assumed",
  "guardianship_transferred",
  "deposit",
  "withdrawal",
  "prize",
]);

export const transactions = pgTable("transactions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  type: transactionType("type").notNull(),
  amount: integer("amount").notNull(),
  referenceType: referenceType("reference_type").notNull(),
  referenceId: text("reference_id"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ──────────────────────────────────────────────
// Horses
// ──────────────────────────────────────────────

export type Spot = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const hairStyle = pgEnum("hair_style", [
  "natural",
  "braids",
  "cropped",
  "flowing",
]);

export const horses = pgTable("horses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  guardianId: text("guardian_id")
    .references(() => users.id, { onDelete: "set null" }),
  name: text("name").notNull().unique(),

  // Performance stats (0-100 scale, generated on a bell curve)
  acceleration: real("acceleration").notNull(),
  stamina: real("stamina").notNull(),
  topSpeed: real("top_speed").notNull(),
  leftLegsStrength: real("left_legs_strength").notNull(),
  rightLegsStrength: real("right_legs_strength").notNull(),
  flexibility: real("flexibility").notNull(),

  // Physical attributes
  height: real("height").notNull(),
  length: real("length").notNull(),

  // Appearance
  baseColor: text("base_color").notNull(),
  secondaryColor: text("secondary_color").notNull(),
  maneColor: text("mane_color").notNull(),
  spots: json("spots").$type<Spot[]>().default([]).notNull(),
  preferredHairStyle: hairStyle("preferred_hair_style")
    .default("natural")
    .notNull(),

  // Lineage
  sireId: text("sire_id"),
  damId: text("dam_id"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ──────────────────────────────────────────────
// Racing
// ──────────────────────────────────────────────

export const weeks = pgTable("weeks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  label: text("label").notNull(),
  startDate: timestamp("start_date", { withTimezone: true }).notNull(),
  endDate: timestamp("end_date", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const raceStatus = pgEnum("race_status", [
  "upcoming",
  "open",
  "locked",
  "running",
  "finished",
]);

export const races = pgTable("races", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  weekId: text("week_id")
    .references(() => weeks.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  status: raceStatus("status").default("upcoming").notNull(),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),

  // Fixed conditions for Phase 2 (randomized conditions come in Phase 6)
  surface: text("surface").default("dirt").notNull(),
  trackName: text("track_name").default("WHO Oval").notNull(),
  lengthFurlongs: integer("length_furlongs").default(8).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const entries = pgTable("entries", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  raceId: text("race_id")
    .references(() => races.id, { onDelete: "cascade" })
    .notNull(),
  horseId: text("horse_id")
    .references(() => horses.id, { onDelete: "cascade" })
    .notNull(),
  guardianId: text("guardian_id")
    .references(() => users.id, { onDelete: "set null" }),
  lane: integer("lane"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type RaceResult = {
  entryId: string;
  horseId: string;
  position: number;
  finishTime: number;
};

export const results = pgTable("results", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  raceId: text("race_id")
    .references(() => races.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  placements: json("placements").$type<RaceResult[]>().notNull(),
  simulatedAt: timestamp("simulated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ──────────────────────────────────────────────
// Stakes
// ──────────────────────────────────────────────

// ──────────────────────────────────────────────
// Marketplace (guardianship transfers)
// ──────────────────────────────────────────────

export const listingStatus = pgEnum("listing_status", [
  "active",
  "sold",
  "cancelled",
]);

export const listings = pgTable("listings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  horseId: text("horse_id")
    .references(() => horses.id, { onDelete: "cascade" })
    .notNull(),
  sellerId: text("seller_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  buyerId: text("buyer_id").references(() => users.id, {
    onDelete: "set null",
  }),
  price: integer("price").notNull(),
  status: listingStatus("status").default("active").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  soldAt: timestamp("sold_at", { withTimezone: true }),
});

// ──────────────────────────────────────────────
// Stakes
// ──────────────────────────────────────────────

export const stakes = pgTable("stakes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  raceId: text("race_id")
    .references(() => races.id, { onDelete: "cascade" })
    .notNull(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  entryId: text("entry_id")
    .references(() => entries.id, { onDelete: "cascade" })
    .notNull(),
  amount: integer("amount").notNull(),
  payout: integer("payout").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

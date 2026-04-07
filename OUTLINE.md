# World Horse Organization — App Outline & Plan

---

# World Horse Organization (WHO)

The horse racing game is **one component** of the World Horse Organization. This section outlines the org itself; the rest of the doc details the first component (the game) and how we’ll build it.

---

## Mission

**The World Horse Organization is committed to making sure every horse in the world gets released from ownership into the freedom of the World Horse Organization.**

- **Release from ownership** — Horses move out of private ownership into the care and community of the WHO.
- **Freedom** — Horses belong to the organization and its community, not to any single owner; the long-term vision is collective stewardship rather than “owning” a horse.

This mission shapes product and messaging: e.g. “You can’t own that horse,” staking/partial ownership over time, and framing the WHO as the home horses are released into.

---

## Goal of the org

- **Unite horses under the WHO** — Every horse “in the world” (in the product) eventually lives under the WHO umbrella.
- **Community over ownership** — Emphasize the organization and the community around horses and races, not individual ownership.
- **Product as the vehicle** — The site and app (racing, trading, breeding, etc.) are how people engage with that mission and how horses “enter” and exist within the WHO.

---

## Components of the site (roadmap)

The WHO site will have multiple parts. We build and ship in order of priority:

| #     | Component             | Description                                                                                 | Status         |
| ----- | --------------------- | ------------------------------------------------------------------------------------------- | -------------- |
| **1** | **Horse racing game** | Weekly races, stakes, trading, breeding, leaderboards, prizes. The first thing we focus on. | First to build |
| 2     | _TBD_                 | e.g. Horse registry, adoption/release flows, education, governance.                         | Later          |
| 3     | _TBD_                 | Expand as the org and product evolve.                                                       | Later          |

The rest of this document is an outline and plan for **component 1: the horse racing game**.

---

## Distribution & platforms

The product is a **web app first**: one codebase (Next.js) that users can use by visiting the website. Optional downloadable clients for users who prefer an app.

| Platform               | How users get it                             | Notes                                                                                                                                                                           |
| ---------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Web**                | Visit the URL in any browser.                | Primary experience. No install; works everywhere.                                                                                                                               |
| **Desktop (optional)** | Download an app (e.g. **Electron** wrapper). | Same web app in a window; optional for power users or “install” feel.                                                                                                           |
| **iOS (optional)**     | Download from App Store.                     | Native app (or wrapper). Enables **Apple In-App Purchase** for marketplace microtransactions (e.g. buying horses, stakes) — Apple often requires IAP for digital goods in apps. |
| **Android (optional)** | Download from Google Play.                   | Native app (or wrapper). **Google Play Billing** for in-app purchases; same idea as iOS.                                                                                        |

**Build order:** Ship the web app and get it right first. Add Electron and/or native iOS/Android once the web experience and payments are solid. The web app remains the single source of truth; native apps can be wrappers (e.g. WebView / Capacitor) or true native UIs that share the same backend — trade-offs TBD.

**Why optional native:** Some users prefer “an app” and expect to pay via the app store (one tap, existing payment method). Others prefer the site. Supporting both maximizes reach and payment options without forcing a single path.

---

## Build approach

- **Core logic first** — Get the mechanics, data, and flows working with minimal UI (placeholders, basic layout). Validate the game and data model before investing in look and feel.
- **Art style as a phase** — Visual identity and art direction are planned as a dedicated phase. They’re important for bringing users back and making the product feel like a real place; we just don’t block early builds on them. Once logic is stable, we define and apply a consistent style (brand, horse icon, illustrations, motion, etc.).

---

## Task list (from board + outline)

Tasks aligned to the build order below. Use this as a living list (To Do → Doing → Done).

| Task                                     | Description                                                                                                                             | Phase / dependency             |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| **Create the mission statement for WHO** | Finalize and publish the WHO mission (see Mission above).                                                                               | WHO foundation                 |
| **Create a horse icon (SVG)**            | Reusable horse icon for brand, UI, and horses. Can be minimal at first; refine in Art phase.                                            | WHO foundation / Art           |
| **Payment architecture**                 | Document ledger, balance, transactions, provider map (§4.4); add DB tables in Phase 0.                                                   | Phase 0                        |
| **Define the Horse type**                | TypeScript type + DB schema: Horse with properties (stats, appearance, lineage) and what makes it exchangeable (listable, price, etc.). **APIs follow §2.1 stats decision.** | Core logic — Horses            |
| **Scaffold the site**                    | Next.js + TypeScript app: app router, layout, env, DB client. Site is buildable and visitable locally.                                  | Setup                          |
| **Create the site (deploy)**             | Deploy to Vercel (or chosen host). Acceptance: site is live and visitable in production.                                                | Setup                          |
| **Update the home page**                 | Home page with mission, entry point to the game, and basic WHO identity.                                                                | Setup / Art                    |
| Set up repo, DB, env                     | Next.js (TypeScript), Postgres or DynamoDB, env config, auth (email/social).                                                            | Setup                          |
| Define Horse model                       | Schema for horses (stats, appearance, lineage) in DB; TypeScript types in code.                                                         | Core logic — Horses            |
| Races & entries (basic)                  | Weeks, races, entries; fixed conditions; admin or seed data.                                                                            | Core logic — Races             |
| Stakes, results, scoring                 | Place stakes before lock; enter results; payouts; leaderboard.                                                                          | Core logic — Races             |
| Trading / market (v1)                    | List, buy, sell horses on Phase 0 ledger; play money and/or first web provider (Stripe/PayPal).                                        | Phase 4                        |
| Payment & marketplace UX                 | Checkout, balance display, settlement UX — extends architecture from Phase 0.                                                           | Phase 0 plan + Phase 4         |
| Art direction & visual identity          | Style guide, palette, typography, horse icon polish, illustrations.                                                                     | Art & identity                 |
| Apply art to key surfaces                | Home, race view, horse cards, leaderboard.                                                                                              | Art & identity                 |

---

## Piece-by-piece build order

1. **WHO foundation** — Mission statement, horse icon (draft). No deep logic yet.
2. **Site scaffolding + payment architecture** — Next.js + TypeScript app: app router, root layout, env, DB, auth. **Balance/ledger schema and written plan for providers (§4.4)** — even if only play money at first. Deploy; home page with mission and CTA.
3. **Core logic — Horses** — **§2.1 stats decision is fixed.** Horse type + DB schema + APIs (full stats for owner, listings, race entries). Create/mint, list, detail. Minimal UI.
4. **Core logic — Races** — Weeks, races, entries. Stakes debit/credit balance; lock; results; leaderboard.
5. **Core logic — Trading** — Marketplace on the same ledger (play money and/or first live provider). No new money model here.
6. **Art & identity** — Define art direction; polish icon, palette, type; apply to key surfaces.
7. **Expand** — Race conditions, breeding, more providers / withdrawals / prizes / native IAP (Phase 8), messaging. Iterate on art as new screens appear.

---

# Horse racing game (first component)

## Gist

**You can trade horses and they can race against each other in competitions.**

---

## Product principles

- **Fun first** — Primary goal is something fun and interesting; profit follows from good engagement (e.g. gambling-adjacent mechanics).
- **Game of chance** — Breeding and stats add depth but should never make outcomes perfectly predictable; multiple random factors keep it fair and exciting.
- **Community around events** — Like real gambling, it’s not just the event but the community around it. Weekly big events focus attention and make each one matter.
- **Users can withdraw** — No trapping money. Standard payment providers (PayPal, Stripe, etc.) so users can pay and withdraw in familiar ways; build trust and simplify onboarding.
- **Seamless payments** — The app has a marketplace (buy/sell horses, stakes, etc.). Payment experience must be a first-class focus: minimal steps, clear pricing, same account and balance across web and native, reliable payouts. If payments feel clunky, the marketplace won’t work.

---

## 1. Core concept

- **Weekly races** — Each week is a big, focused event (HQ Trivia–style). Fewer events at first concentrates attention and makes each race more interesting. Scale to more races once the user base supports it.
- **Prelims → finals** — Multiple preliminary events lead up to bigger races (e.g. weekday races → weekend championship), scale TBD.
- **Trading as daily activity** — Horse trading (and breeding, staking) gives people something to do between weekly races and addresses the “fewer daily users” con.
- **Standard stack** — Next.js + TypeScript, standard auth (email/social), and payments via PayPal, Stripe, and other top providers. No crypto or wallet required.

---

## 2. Horse model

### 2.1 Stats (high level)

Split between **long-term attributes** (more permanent) and **historic stats** (high-score / performance data).

| Attribute                        | Notes                                                        |
| -------------------------------- | ------------------------------------------------------------ |
| **Name**                         | Unique per horse                                             |
| **Age**                          | Time since creation (e.g. seconds)                           |
| **Kickoff speed / acceleration** | Startup speed; spike muscle strength                         |
| **Stamina**                      | How long they can last; lung/cardiovascular                  |
| **Top speed**                    | Peak speed (historic?)                                       |
| **Left legs strength**           | Southpaw vs not                                              |
| **Right legs strength**          | Right-side vs ambidextrous                                   |
| **Flexibility**                  | Muscle flexibility; can counteract spike strength            |
| **Height**                       | How tall                                                     |
| **Length**                       | How long                                                     |
| **Parents**                      | For breeding lineage                                         |
| **Abilities / tags**             | e.g. good in mud vs grass; could be derived from other stats |
| **Base color**                   | Hex                                                          |
| **Secondary color**              | Hex                                                          |
| **Mane and tail color**          | Hex                                                          |
| **Spots**                        | Array of spot (x, y, width, height) or SVG path              |
| **Preferred hair style**         | e.g. braids or not                                           |

### Decision (v1): stats visibility

**Close this before implementing the Horse model** — it drives what fields APIs return and how list/detail/race UIs are built.

- **v1:** Store **full stats** for every horse in the database. **Expose full stats in APIs and UI** for the **owner’s stable**, **market listings** (buyers must evaluate what they’re buying), and **race entry views** (players picking stakes need comparable information). Breeding and an open marketplace don’t work well if core attributes are hidden from participants.
- **Later (optional):** Introduce **event-level or race-type rules** (e.g. “blind program” races) that return a reduced public DTO for those events only, while the server still uses full stats for simulation. That preserves a more gambling-like mode without rewriting the core horse model.

### 2.2 Breeding

- Breeding combines two horses to produce offspring with **inherited but randomized** stats.
- **Risk** — Offspring is not guaranteed to be better; breeding is a big risk so the game stays chance-based.
- **New-player fairness** — Avoid “horses get objectively better forever” so new players aren’t locked out. Consider a soft ceiling or bell curve so the best horses don’t dominate indefinitely.
- **Studding** — Supports more trading and engagement.

### 2.3 Horse acquisition (open)

- Sell and breed user-owned horses.
- **Buy from WHO?** — Option to buy basic horses from the app; users breed for better ones.
- **Bootstrap** — How do we generate enough horses to start races? (e.g. initial mint, giveaways, or seed pool.)

---

## 3. Ownership & “staking”

- **Motto** — “You can’t own that horse” fits WHO; partial ownership = no one fully owns any horse.
- **Start simple** — Outright ownership is the default for v1 (simplest). Staking/partial ownership can come later and complicates splits, payouts, and trading.
- **Staking (later)** — “Staking” = you hold X stakes in a horse; more stakes = more winnings. Wording: trade the right to stake, not literal ownership.
- **Possible mechanic** — If a certain % of “ownership” (stakeholders) watches the race, horse gets a slight attribute boost (to be designed).

---

## 4. Trading, payments & marketplace experience

Payments are central to the product: horses and stakes are bought and sold in-app. We need a **seamless, trustworthy** payment experience so the marketplace works and users come back.

### 4.1 Open market

- Users can trade horses with each other or buy/sell outright.
- One account, one balance (and one “stable”), whether the user is on web, desktop app, or mobile app.

### 4.2 Payment options by platform

| Where           | How we accept payment                                                               | Notes                                                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Web**         | PayPal, Stripe (card), other providers.                                             | User pays on the site; we credit their in-app balance or complete the purchase.                                                                                 |
| **iOS app**     | **Apple In-App Purchase (IAP)** for digital goods (horses, stakes, currency packs). | Apple’s rules typically require IAP for digital goods consumed in the app. Web can still use Stripe/PayPal; in-app we use IAP and then credit the same account. |
| **Android app** | **Google Play Billing** for in-app purchases.                                       | Same idea as iOS: in-app digital purchases go through the store; same account/balance on our backend.                                                           |

We may need a small “in-app currency” or balance that users top up via IAP on mobile and via Stripe/PayPal on web, so that marketplace listings and race stakes work the same everywhere. Design this so it feels simple (e.g. “Add funds” → one flow per platform).

### 4.3 What “seamless” means

- **Few steps** — Add payment method once; subsequent purchases (e.g. buy a horse) are one or two taps/clicks.
- **Clear pricing** — No surprise fees; show total before confirm. Refunds/payouts policy is visible.
- **Consistent account** — Same user, same horses, same balance on web and in the native app (same backend).
- **Reliable payouts** — When users sell a horse or win a prize, payouts (to balance or to external account) work reliably and are communicated clearly.

We’ll treat payment and marketplace UX as a dedicated focus area in design and implementation (not an afterthought).

### 4.4 Payment architecture from Phase 0 (not Phase 8)

**Payments and marketplace design are one system.** Even if the first ship uses **play money** (no card yet), we still decide early:

- **Ledger model** — User balance, transaction log (credits/debits), idempotency for purchases, and how listings settle (escrow vs instant transfer).
- **What “money” is in the app** — e.g. USD-backed balance, “credits,” or both; how stakes and prizes move balance.
- **Provider map** — Web: Stripe / PayPal; native: Apple IAP / Google Play Billing — all crediting the **same** balance and using the **same** marketplace rules.
- **Payouts** — How sellers get paid (balance only vs withdraw to external account); prize distribution.

That architecture is **planned and sketched in Phase 0** (schema placeholders or empty tables for `transactions`, `balance`, etc.) so Phase 1 Horses and Phase 4 Trading don’t paint us into a corner. **Phase 4** is the first marketplace implementation **on top of** that model (play money or first live provider). **Later phases** add more providers, external withdrawals, native IAP, and cash prizes — they extend the same design, they don’t introduce it.

---

## 5. Race conditions (unpredictability)

Design so outcomes are **never perfectly predictable**; multiple factors give room to plan but stay outcome-random.

### 5.1 Ground / surface

- Mud (wet dirt), grass, dirt, turf.

### 5.2 Tracks

- Variety of tracks (e.g. different terrains: desert, forest, ice rink).
- **Reveal timing** — Advertise e.g. 3 possible tracks; **pick one randomly right before the race** after stakes are locked. Prevents always betting on the “objectively best” horse for a known track.

### 5.3 Weather

- Rain, snow, hail, sleet (temperature-dependent).
- Hot vs cold.
- Windy vs not.

(Feeds into surface and conditions; released in advance so users can theorize.)

### 5.4 Lanes

- Random lane assignment. Outside lane sometimes better, sometimes not; some horses stronger on one side (left/right leg stats).

### 5.5 Race length

- 6, 7, 8, 9, 10, 12 furlongs; 3 km, etc.
- **Optional** — Present 3 possible lengths; randomly select one before the race (same philosophy as track reveal).

### 5.6 Betting window

- Release **weather / conditions** (and maybe track candidates) a little while before the race so people can plan and place stakes.
- **Short window** to place stakes after info release, then lock.

---

## 6. Prizes & engagement

- **Cash prizes** for winning horses (like real horse racing). Even small amounts (e.g. $10) can make competition fun (HQ-style).
- Exact structure TBD (prize pool, split by place, WHO cut, etc.).

---

## 7. Core features (product)

| Feature               | Description                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------- |
| **Horses**            | Create/mint, stats, lineage, breeding, display (looks, colors, spots).                      |
| **Trading**           | Open market: list, buy, sell, trade horses; multiple payment options.                       |
| **Races**             | Weekly (and prelim) events; featured races with entries.                                    |
| **Race conditions**   | Track, surface, weather, length, lanes — some revealed in advance, some randomized at lock. |
| **Stakes / picks**    | Users place stakes on horses before lock; short window after conditions known.              |
| **Results & payouts** | Race results; winnings (and possibly cash prizes).                                          |
| **Leaderboards**      | Per race, per week, season.                                                                 |
| **Accounts**          | Sign up (email/social), manage profile and payment methods, view balance and history.       |

---

## 8. User flows (high level)

1. **Onboard** — Sign up (email or social), optionally buy or receive a first horse.
2. **Between events** — Trade horses, breed, browse market, manage stable.
3. **Before a race** — See featured races, conditions (and possible track/length), horses; place stakes in the window.
4. **During/after** — Watch (if we do live), see results, collect winnings, check leaderboard.
5. **Season** — Prelims + championship; standings and rewards.

---

## 9. Data model (high level)

- **User** — id, email (or auth provider id), display_name, created_at, etc.
- **Horse** — id, owner_id, name, stats (see §2.1; full persistence; v1 API exposes full stats per §2.1 decision), parents (sire/dam), lineage, appearance (colors, spots), created_at, etc.
- **Breeding** — id, sire_id, dam_id, offspring_id, outcome stats, etc.
- **Race** — id, week_id, name, scheduled_at, status (open/locked/results_entered), track (after reveal), surface, weather, length, lane_assignments, etc.
- **Entry** — id, race_id, horse_id, lane, program_number, etc.
- **Stake / Pick** — user_id, race_id, horse_id (or entry_id), amount or weight, submitted_at.
- **Result** — race_id, 1st/2nd/3rd entry_id, payouts.
- **Week / Season** — id, label, start_date, end_date, type (prelim/championship), etc.
- **Market listing** — horse_id, seller_id, price, currency, status.
- **Balance / ledger** (from Phase 0 plan) — user balance, transactions, purchase/settlement records so marketplace and stakes share one money model.

_(Staking/partial ownership would add stake_holdings, stake_trades, etc.; omit for v1 if we start with full ownership.)_

---

## 10. Tech stack (locked)

- **Frontend** — Next.js with TypeScript, App Router, responsive (mobile-friendly for events). **Web app is the product;** optional Electron (desktop) and native iOS/Android apps later, sharing the same backend.
- **Backend** — Next.js API routes (or route handlers); server actions where appropriate.
- **Database** — **Postgres** or **DynamoDB**. Postgres fits relational data (users, horses, races, stakes, market, lineage); DynamoDB fits if we want serverless scale and single-table design. Choose based on team familiarity and hosting (e.g. Vercel Postgres, Supabase, Neon vs AWS DynamoDB).
- **Auth** — Standard auth: email/password and/or OAuth (Google, etc.). e.g. NextAuth.js, Clerk, or Supabase Auth. Same account on web and (future) native apps.
- **Payments** — **Web:** PayPal, Stripe (cards), etc. **Native (when we add apps):** Apple IAP, Google Play Billing, with same user balance and marketplace on our backend.
- **Hosting** — Vercel (frontend + API); DB on Supabase, Neon, Railway (Postgres) or AWS (DynamoDB).

---

## 11. Phases / milestones

| Phase | Scope |
| ----- | ----- |
| **0. Site scaffolding + payment architecture** | Next.js + TypeScript, App Router, DB, env, auth. **Decide and document** balance/ledger, transaction model, and how web + future native providers attach. Add schema (or migrations) for balance/transactions even if v1 only uses **play money**. Deploy; site visitable; home page. |
| **1. Horses** | **Stats visibility locked (§2.1).** Horse type + schema (stats, appearance), APIs exposing full stats per v1 policy, create/mint, list, detail; simple ownership. |
| **2. Races (basic)** | Weeks, races, entries; fixed conditions at first (single track/length); no randomness yet. |
| **3. Stakes & results** | Place stakes before lock (against balance / play money); enter results; compute payouts to balance; leaderboard. |
| **4. Trading + first real payments (optional)** | Marketplace list/buy/sell **on the ledger from Phase 0**. Ship with play money only, or add first live provider (PayPal or Stripe) — either way, no new money architecture here. |
| **5. Art & identity** | Style guide, palette, typography; horse icon polish; apply to home, race view, horse cards, leaderboard. _Important for retention._ |
| **6. Race conditions** | Multiple tracks/weather/length; reveal timing and optional random pick (e.g. 3 → 1); lanes. |
| **7. Breeding** | Sire/dam selection, offspring generation (randomized stats), lineage. |
| **8. Extended payments & prizes** | Extra web providers, **withdrawals / external payouts**, cash prizes, compliance hooks. **Native apps:** Apple IAP + Google Play Billing crediting the same balance (extends Phase 0 map, not a new design). |
| **9. Polish** | Prelims → championship flow, UX, “you can’t own that horse” messaging. |

**Note:** Phases 4 and 8 are no longer “payments vs everything else.” **Phase 0** owns the payment/marketplace architecture; **Phase 4** wires the marketplace to it; **Phase 8** broadens providers and prize payout mechanics.

---

## 12. Open questions (from brainstorm)

- **Horse acquisition** — Do we sell “basic” horses? How do we bootstrap the initial horse pool for races?
- **New-player balance** — Ceiling/bell curve for stats so new players can compete?
- **Staking vs ownership** — When do we introduce partial ownership / “staking” wording and mechanics?
- **Watch bonus** — Implement “% of ownership watching = small attribute boost” or drop?
- **Abilities** — Explicit tags (mud/grass) vs derived from other stats?
- **Spots** — Store as structured data (x, y, w, h) or SVG path?

### Resolved (do not reopen without revisiting horse + API design)

- **Stats visibility (v1)** — See §2.1 **Decision (v1): stats visibility**. Full stats stored and exposed for owner, listings, and race entries; optional blind race types later.

---

## 13. Site scaffolding (specifics)

First concrete slice: get the app runnable and deployable with a clear structure.

| Step                        | What to do                                                                                                                                                                    |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Next.js + TypeScript** | `npx create-next-app@latest` with TypeScript, App Router, ESLint, Tailwind.                                                                                                   |
| **2. App structure**        | Root layout (`app/layout.tsx`), global styles, a simple home page (`app/page.tsx`). Optional: `app/(marketing)/` and `app/(app)/` route groups for public vs logged-in areas. |
| **3. Env & config**         | `.env.local` for DB URL and auth secrets; never commit secrets.                                                                                                               |
| **4. Database**             | Pick Postgres or DynamoDB; add client (e.g. `@vercel/postgres`, `@prisma/client`, or AWS SDK). Create initial schema: **User + balance/ledger tables** (even if balance is play-money only). Document payment architecture (§4.4). |
| **5. Auth**                 | Add NextAuth, Clerk, or Supabase Auth. Sign-in page, session provider, protected route example (e.g. redirect to sign-in if not authenticated).                               |
| **6. Deploy**               | Connect repo to Vercel; set env in dashboard. Confirm site is visitable and auth works in production.                                                                         |
| **7. Home page**            | Mission statement, WHO name, CTA (e.g. “Sign in” or “Upcoming race”).                                                                                                         |

After this, the codebase is ready for Horse type, races, and marketplace — **without redesigning money later**.

---

## 14. Next steps

1. Run through site scaffolding (Next.js + TypeScript, DB, auth, deploy, home page) **including balance/ledger schema and payment architecture notes (§4.4)**.
2. **Stats visibility is decided for v1 (§2.1)** — implement Horse APIs accordingly.
3. Define schema for User, **Balance/Transaction**, Horse, Race, Entry, Stake, Result, Week (and TypeScript types).
4. Build Horse CRUD + minimal display (full stats per v1 policy).
5. Build Race + Entry + Stakes + Results + leaderboard (fixed conditions; stakes debit/credit balance).
6. Build marketplace (list/buy/sell) on the same ledger; add PayPal or Stripe when ready, or stay on play money first.
7. Iterate on conditions, breeding, extended providers, withdrawals, prizes, native IAP.

Use this doc as the single source of truth; update as we decide each open question and ship each phase.

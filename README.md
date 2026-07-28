# World Horse Organization

Free the horses from all ownership.

## Mission

**The World Horse Organization is committed to making sure every horse in the world gets released from ownership into the freedom of the World Horse Organization.**

In the WHO, horses are never owned. Users are **guardians**. Rescues, transfers of guardianship, and releases back to the wild replace mint/buy/sell/delete language.

---

## What this is

WHO is a web app for real-world horse advocacy and a digital sanctuary horse racing game: weekly races, stakes, guardianship marketplace, and community around horses that belong to the organization — not to any one person.

- **Live:** [worldhorse.org](https://worldhorse.org) (worldhorseorganization.org redirects here)
- **Stack:** Next.js 16 (App Router, Turbopack), TypeScript, ply-css + Tailwind 4, Drizzle ORM → Neon Postgres, Auth.js v5 (Google OAuth)
- **Hosting:** Vercel
- **Credits:** Free-to-play in-game credits only — no real-money payouts or withdrawals

### What’s shipped

| Phase                            | Status |
| -------------------------------- | ------ |
| 0 — Auth, ledger, deploy         | Done   |
| 1 — Horses, rescue, stable       | Done   |
| 2 — Races, simulation, enter/run | Done   |
| 3 — Stakes, payouts, leaderboard | Done   |
| 4 — Guardianship marketplace     | Done   |
| 5 — Art & identity               | Next   |

Also live: **Free the Horses** (`/free-the-horses`) — Central Park carriage advocacy campaign.

## Planning

**[OUTLINE.md](./OUTLINE.md)** — Mission, goals, build order, data model, and phases. Start there for product and architecture decisions.

## Getting started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

Schema changes: edit `lib/db/schema.ts`, then `npm run db:push`.

## Project structure

```
app/                 App Router pages, layouts, API routes
  free-the-horses/   Real-world campaign
  horse-racing/      Game (stable, races, marketplace, leaderboard)
  api/               Horses, races, weeks, marketplace, ledger
components/          UI by domain (auth, horses, races, marketplace, layout)
lib/
  auth/              Auth.js config + signup seeding
  db/                Drizzle client, schema, ledger helpers
  horses/            Stat generation + starter horse seed
  races/             Race simulation
OUTLINE.md           Full product outline and build plan
```

# World Horse Organization

## Mission

**The World Horse Organization is committed to making sure every horse in the world gets released from ownership into the freedom of the World Horse Organization.**

---

## What this is

This repo is the **World Horse Organization (WHO)** product: a web app (and optional desktop/mobile apps) centered on a weekly horse racing game — trading horses, breeding, stakes, and community around races. The first component we're building is the racing game and marketplace.

- **Stack:** Next.js 16, TypeScript, Tailwind 4, Postgres (Neon), Auth.js v5 (coming), Drizzle ORM (coming).
- **Hosting:** Vercel.
- **Domain:** worldhorseorganization.org

## Planning

**[OUTLINE.md](./OUTLINE.md)** — Mission, goals, build order, task list, data model, and phases. Start there for how we'll build this.

## Getting started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/             Next.js App Router pages and layouts
lib/             Shared modules (db, auth, ledger — coming)
components/      UI components (coming)
drizzle/         Database migrations (coming)
OUTLINE.md       Full product outline and build plan
```

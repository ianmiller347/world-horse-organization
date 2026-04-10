import type { Spot } from "@/lib/db/schema";

/**
 * Box-Muller transform: two uniform randoms become one normal random.
 * Returns a value from a normal distribution with given mean and stdDev.
 */
function normalRandom(mean: number, stdDev: number): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + z * stdDev;
}

/**
 * Generate a stat on a 0-100 scale using a bell curve.
 * Mean 50, stdDev 15 gives ~95% of values between 20-80,
 * with rare outliers near 0 or 100.
 */
function generateStat(mean = 50, stdDev = 15): number {
  const value = normalRandom(mean, stdDev);
  return Math.round(Math.max(0, Math.min(100, value)) * 10) / 10;
}

function randomHex(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function generateSpots(): Spot[] {
  const count = Math.floor(Math.random() * 6);
  return Array.from({ length: count }, () => ({
    x: Math.round(Math.random() * 100),
    y: Math.round(Math.random() * 100),
    width: Math.round(5 + Math.random() * 20),
    height: Math.round(5 + Math.random() * 20),
  }));
}

const HAIR_STYLES = ["natural", "braids", "cropped", "flowing"] as const;

const ADJECTIVES = [
  "Midnight", "Golden", "Silver", "Thunder", "Shadow", "Storm",
  "Wild", "Iron", "Velvet", "Crimson", "Swift", "Noble", "Dark",
  "Bright", "Lucky", "Dusty", "Rusty", "Copper", "Blazing", "Frozen",
];

const NOUNS = [
  "Runner", "Dancer", "Spirit", "Flash", "Arrow", "Comet", "Bolt",
  "Dream", "Legend", "Fury", "Glory", "Echo", "Blaze", "Phantom",
  "Rocket", "Breeze", "Spark", "Drifter", "Ranger", "Ace",
];

export function generateHorseName(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const suffix = Math.floor(Math.random() * 1000);
  return `${adj} ${noun} ${suffix}`;
}

export type GeneratedHorse = {
  name: string;
  acceleration: number;
  stamina: number;
  topSpeed: number;
  leftLegsStrength: number;
  rightLegsStrength: number;
  flexibility: number;
  height: number;
  length: number;
  baseColor: string;
  secondaryColor: string;
  maneColor: string;
  spots: Spot[];
  preferredHairStyle: (typeof HAIR_STYLES)[number];
};

export function generateHorse(name?: string): GeneratedHorse {
  return {
    name: name ?? generateHorseName(),
    acceleration: generateStat(),
    stamina: generateStat(),
    topSpeed: generateStat(),
    leftLegsStrength: generateStat(),
    rightLegsStrength: generateStat(),
    flexibility: generateStat(),
    height: Math.round((140 + normalRandom(20, 8)) * 10) / 10, // ~140-180 cm
    length: Math.round((200 + normalRandom(20, 8)) * 10) / 10, // ~200-240 cm
    baseColor: randomHex(),
    secondaryColor: randomHex(),
    maneColor: randomHex(),
    spots: generateSpots(),
    preferredHairStyle:
      HAIR_STYLES[Math.floor(Math.random() * HAIR_STYLES.length)],
  };
}

import type { RaceResult } from "@/lib/db/schema";

type HorseEntry = {
  entryId: string;
  horseId: string;
  acceleration: number;
  stamina: number;
  topSpeed: number;
  leftLegsStrength: number;
  rightLegsStrength: number;
  flexibility: number;
  height: number;
  length: number;
  lane: number;
};

type RaceConditions = {
  lengthFurlongs: number;
  surface: string;
};

/**
 * Simulate a race. Each horse's finish time is derived from their stats
 * with significant randomness layered on top so outcomes are never
 * perfectly predictable.
 *
 * The model: divide the race into three phases (start, middle, finish).
 * Different stats dominate each phase. A noise term is added per-phase
 * so that a statistically weaker horse can still win on a good day.
 */
export function simulateRace(
  entries: HorseEntry[],
  conditions: RaceConditions
): RaceResult[] {
  const totalDistance = conditions.lengthFurlongs * 201.168; // furlongs → meters

  const startPortion = 0.15;
  const middlePortion = 0.6;
  const finishPortion = 0.25;

  const surfaceModifier = conditions.surface === "mud" ? 1.1 : 1.0;

  const times = entries.map((entry) => {
    const legBalance =
      (entry.leftLegsStrength + entry.rightLegsStrength) / 2;
    const laneNoise = (Math.random() - 0.5) * 2;

    // Phase 1: Start — acceleration and flexibility dominate
    const startSpeed =
      normalize(entry.acceleration) * 0.6 +
      normalize(entry.flexibility) * 0.25 +
      normalize(legBalance) * 0.15;
    const startTime =
      (totalDistance * startPortion) /
      (startSpeed * jitter(0.85, 1.15) + laneNoise) *
      surfaceModifier;

    // Phase 2: Middle — top speed and stamina dominate
    const cruiseSpeed =
      normalize(entry.topSpeed) * 0.5 +
      normalize(entry.stamina) * 0.35 +
      normalize(entry.height) * 0.15;
    const middleTime =
      (totalDistance * middlePortion) /
      (cruiseSpeed * jitter(0.88, 1.12)) *
      surfaceModifier;

    // Phase 3: Finish — stamina and flexibility dominate (fatigue factor)
    const fatigueResistance =
      normalize(entry.stamina) * 0.5 +
      normalize(entry.flexibility) * 0.3 +
      normalize(entry.acceleration) * 0.2;
    const finishTime =
      (totalDistance * finishPortion) /
      (fatigueResistance * jitter(0.82, 1.18)) *
      surfaceModifier;

    const total =
      Math.round((startTime + middleTime + finishTime) * 100) / 100;

    return { entryId: entry.entryId, horseId: entry.horseId, time: total };
  });

  times.sort((a, b) => a.time - b.time);

  return times.map((t, i) => ({
    entryId: t.entryId,
    horseId: t.horseId,
    position: i + 1,
    finishTime: t.time,
  }));
}

/** Map a 0-100 stat to a usable speed factor (roughly 5-15 m/s range). */
function normalize(stat: number): number {
  return 5 + (stat / 100) * 10;
}

/** Random multiplier in [low, high] — the source of unpredictability. */
function jitter(low: number, high: number): number {
  return low + Math.random() * (high - low);
}

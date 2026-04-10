"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Entry = {
  entryId: string;
  horseName: string;
  baseColor: string;
};

export function PlaceStakeForm({
  raceId,
  entries,
  balance,
}: {
  raceId: string;
  entries: Entry[];
  balance: number;
}) {
  const router = useRouter();
  const [selectedEntry, setSelectedEntry] = useState("");
  const [amount, setAmount] = useState(50);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedEntry || amount < 10) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/races/${raceId}/stake`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entryId: selectedEntry, amount }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to place stake");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (entries.length === 0) {
    return (
      <p className="text-sm text-foreground/40">
        No entries to stake on yet.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label
          htmlFor="stake-entry"
          className="block text-xs text-foreground/50 mb-1"
        >
          Pick a horse
        </label>
        <select
          id="stake-entry"
          value={selectedEntry}
          onChange={(e) => setSelectedEntry(e.target.value)}
          className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-foreground/30"
        >
          <option value="">Select a horse</option>
          {entries.map((entry) => (
            <option key={entry.entryId} value={entry.entryId}>
              {entry.horseName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="stake-amount"
          className="block text-xs text-foreground/50 mb-1"
        >
          Amount (10&ndash;500 credits, you have {balance})
        </label>
        <input
          id="stake-amount"
          type="number"
          min={10}
          max={Math.min(500, balance)}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-foreground/30"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={!selectedEntry || amount < 10 || loading}
          className="px-5 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? "Placing..." : `Stake ${amount} credits`}
        </button>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    </form>
  );
}

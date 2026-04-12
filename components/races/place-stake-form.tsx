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
      <p className="text-sm text-tertiary">
        No entries to stake on yet.
      </p>
    );
  }

  return (
    <form onSubmit={submit}>
      <div className="margin-bottom">
        <label htmlFor="stake-entry" className="display-block text-xs text-secondary margin-bottom-xs">
          Pick a horse
        </label>
        <select
          id="stake-entry"
          value={selectedEntry}
          onChange={(e) => setSelectedEntry(e.target.value)}
          className="input width-100"
        >
          <option value="">Select a horse</option>
          {entries.map((entry) => (
            <option key={entry.entryId} value={entry.entryId}>
              {entry.horseName}
            </option>
          ))}
        </select>
      </div>

      <div className="margin-bottom">
        <label htmlFor="stake-amount" className="display-block text-xs text-secondary margin-bottom-xs">
          Amount (10&ndash;500 credits, you have {balance})
        </label>
        <input
          id="stake-amount"
          type="number"
          min={10}
          max={Math.min(500, balance)}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="input width-100"
        />
      </div>

      <div className="display-flex items-center gap">
        <button
          type="submit"
          disabled={!selectedEntry || amount < 10 || loading}
          className="btn btn-primary"
        >
          {loading ? "Placing..." : `Stake ${amount} credits`}
        </button>
        {error && <p className="text-xs color-red">{error}</p>}
      </div>
    </form>
  );
}

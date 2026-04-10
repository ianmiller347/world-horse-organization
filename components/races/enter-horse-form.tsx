"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Horse = {
  id: string;
  name: string;
};

export function EnterHorseForm({
  raceId,
  horses,
}: {
  raceId: string;
  horses: Horse[];
}) {
  const router = useRouter();
  const [selectedHorse, setSelectedHorse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedHorse) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/races/${raceId}/enter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ horseId: selectedHorse }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to enter race");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (horses.length === 0) {
    return (
      <p className="text-sm text-foreground/40">
        No eligible horses in your stable.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex items-end gap-3">
      <div className="flex-1">
        <label
          htmlFor="horse-select"
          className="block text-xs text-foreground/50 mb-1"
        >
          Choose a horse to enter
        </label>
        <select
          id="horse-select"
          value={selectedHorse}
          onChange={(e) => setSelectedHorse(e.target.value)}
          className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-foreground/30"
        >
          <option value="">Select a horse</option>
          {horses.map((h) => (
            <option key={h.id} value={h.id}>
              {h.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={!selectedHorse || loading}
        className="px-5 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        {loading ? "Entering..." : "Enter Race"}
      </button>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </form>
  );
}

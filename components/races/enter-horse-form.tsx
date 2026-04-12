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
      <p className="text-sm text-tertiary">
        No eligible horses in your stable.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="display-flex items-end gap">
      <div style={{ flex: 1 }}>
        <label htmlFor="horse-select" className="display-block text-xs text-secondary margin-bottom-xs">
          Choose a horse to enter
        </label>
        <select
          id="horse-select"
          value={selectedHorse}
          onChange={(e) => setSelectedHorse(e.target.value)}
          className="input width-100"
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
        className="btn btn-primary"
      >
        {loading ? "Entering..." : "Enter Race"}
      </button>
      {error && <p className="text-xs color-red">{error}</p>}
    </form>
  );
}

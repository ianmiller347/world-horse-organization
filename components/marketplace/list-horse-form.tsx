"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Horse = {
  id: string;
  name: string;
};

export function ListHorseForm({ horses }: { horses: Horse[] }) {
  const router = useRouter();
  const [selectedHorse, setSelectedHorse] = useState("");
  const [price, setPrice] = useState(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedHorse || price < 1) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/marketplace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ horseId: selectedHorse, price }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to list horse");
      }
      setSelectedHorse("");
      setPrice(100);
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
        No unlisted horses available to transfer.
      </p>
    );
  }

  return (
    <form onSubmit={submit}>
      <div className="margin-bottom">
        <label htmlFor="list-horse" className="display-block text-xs text-secondary margin-bottom-xs">
          Horse to list
        </label>
        <select
          id="list-horse"
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

      <div className="margin-bottom">
        <label htmlFor="list-price" className="display-block text-xs text-secondary margin-bottom-xs">
          Asking price (credits)
        </label>
        <input
          id="list-price"
          type="number"
          min={1}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="input width-100"
        />
      </div>

      <div className="display-flex items-center gap">
        <button
          type="submit"
          disabled={!selectedHorse || price < 1 || loading}
          className="btn btn-primary"
        >
          {loading ? "Listing..." : "List for Transfer"}
        </button>
        {error && <p className="text-xs color-red">{error}</p>}
      </div>
    </form>
  );
}

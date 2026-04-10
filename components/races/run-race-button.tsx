"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function RunRaceButton({ raceId }: { raceId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    try {
      const res = await fetch(`/api/races/${raceId}/run`, { method: "POST" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to run race");
        return;
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={run}
      disabled={loading}
      className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-500 disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
    >
      {loading ? "Simulating..." : "Run Race"}
    </button>
  );
}

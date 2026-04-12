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
      className="btn btn-primary"
      style={{ backgroundColor: "var(--ply-color-green, #10b981)" }}
    >
      {loading ? "Simulating..." : "Run Race"}
    </button>
  );
}

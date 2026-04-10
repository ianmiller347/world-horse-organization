"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function RescueButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function rescue() {
    setLoading(true);
    try {
      const res = await fetch("/api/horses", { method: "POST" });
      if (!res.ok) throw new Error("Rescue failed");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={rescue}
      disabled={loading}
      className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
    >
      {loading ? "Searching..." : "Rescue a Horse"}
    </button>
  );
}

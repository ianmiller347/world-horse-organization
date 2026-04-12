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
      className="btn btn-primary"
    >
      {loading ? "Searching..." : "Rescue a Horse"}
    </button>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CancelListingButton({ listingId }: { listingId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function cancel() {
    setLoading(true);
    try {
      const res = await fetch(`/api/marketplace/${listingId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to cancel listing");
        return;
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={cancel}
      disabled={loading}
      className="btn btn-secondary-outline text-xs"
    >
      {loading ? "Cancelling..." : "Cancel Listing"}
    </button>
  );
}

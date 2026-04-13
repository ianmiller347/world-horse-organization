"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AssumeGuardianshipButton({
  listingId,
  price,
  horseName,
  balance,
}: {
  listingId: string;
  price: number;
  horseName: string;
  balance: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");

  const canAfford = balance >= price;

  async function transfer() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/marketplace/${listingId}/transfer`, {
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Transfer failed");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  }

  if (!confirming) {
    return (
      <div>
        <button
          onClick={() => setConfirming(true)}
          disabled={!canAfford}
          className="btn btn-primary width-100"
          title={!canAfford ? "Not enough credits" : undefined}
        >
          {canAfford
            ? `Assume Guardianship — ${price} credits`
            : `Need ${price - balance} more credits`}
        </button>
      </div>
    );
  }

  return (
    <div className="border border-radius-lg padding-lg bg-surface">
      <p className="text-sm margin-bottom">
        Transfer <strong>{price}</strong> credits to assume guardianship of{" "}
        <strong>{horseName}</strong>?
      </p>
      <div className="display-flex gap-sm">
        <button
          onClick={transfer}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? "Transferring..." : "Confirm"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={loading}
          className="btn btn-secondary-outline"
        >
          Cancel
        </button>
      </div>
      {error && <p className="text-xs color-red margin-top-sm">{error}</p>}
    </div>
  );
}

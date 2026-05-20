export function StatBar({
  label,
  value,
  max = 100,
}: {
  label: string;
  value: number;
  max?: number;
}) {
  const pct = Math.min(100, (value / max) * 100);

  const color =
    pct >= 70
      ? "var(--ply-green-1)"
      : pct <= 30
        ? "var(--ply-red-1)"
        : "var(--ply-yellow-1)";

  return (
    <div>
      <div className="display-flex justify-between text-xs">
        <span className="text-secondary">{label}</span>
        <span className="mono text-secondary">{value}</span>
      </div>
      <div
        className="border-radius-xl"
        style={{
          height: "0.375rem",
          marginTop: "0.25rem",
          backgroundColor: "var(--ply-border-color)",
          overflow: "hidden",
        }}
      >
        <div
          className="border-radius-xl"
          style={{ height: "100%", width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

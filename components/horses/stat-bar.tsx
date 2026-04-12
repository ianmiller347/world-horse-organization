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
    pct >= 70 ? "var(--ply-color-green, #10b981)" :
    pct <= 30 ? "var(--ply-color-red, #ef4444)" :
    "var(--ply-color-yellow, #eab308)";

  return (
    <div>
      <div className="display-flex justify-between text-xs">
        <span className="text-secondary">{label}</span>
        <span className="mono text-secondary">{value}</span>
      </div>
      <div
        className="border-radius-xl"
        style={{ height: "0.375rem", marginTop: "0.25rem", backgroundColor: "var(--ply-border-color, rgba(255,255,255,0.1))", overflow: "hidden" }}
      >
        <div
          className="border-radius-xl"
          style={{ height: "100%", width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

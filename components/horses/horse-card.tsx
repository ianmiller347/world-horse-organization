import Link from "next/link";
import { StatBar } from "./stat-bar";

type Horse = {
  id: string;
  name: string;
  acceleration: number;
  stamina: number;
  topSpeed: number;
  leftLegsStrength: number;
  rightLegsStrength: number;
  flexibility: number;
  height: number;
  length: number;
  baseColor: string;
  secondaryColor: string;
  maneColor: string;
  preferredHairStyle: string;
};

export function HorseCard({ horse }: { horse: Horse }) {
  return (
    <Link
      href={`/horse-racing/stable/${horse.id}`}
      className="display-block border-radius-lg border bg-surface padding-lg no-link-style"
    >
      <div className="display-flex items-start gap-lg">
        <div className="display-flex gap-xs" style={{ flexShrink: 0 }}>
          <div
            style={{ backgroundColor: horse.baseColor, width: "2rem", height: "3rem", borderRadius: "0.125rem" }}
            title="Base"
          />
          <div
            style={{ backgroundColor: horse.secondaryColor, width: "1rem", height: "3rem", borderRadius: "0.125rem" }}
            title="Secondary"
          />
          <div
            style={{ backgroundColor: horse.maneColor, width: "1rem", height: "3rem", borderRadius: "0.125rem" }}
            title="Mane"
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 className="font-semibold text-lg truncate">
            {horse.name}
          </h3>
          <p className="text-xs text-tertiary margin-top-xs">
            {horse.height} cm &middot; {horse.length} cm &middot;{" "}
            {horse.preferredHairStyle}
          </p>
        </div>
      </div>

      <div className="margin-top-lg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 1.5rem" }}>
        <StatBar label="Speed" value={horse.topSpeed} />
        <StatBar label="Accel" value={horse.acceleration} />
        <StatBar label="Stamina" value={horse.stamina} />
        <StatBar label="Flex" value={horse.flexibility} />
      </div>
    </Link>
  );
}

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
      href={`/app/stable/${horse.id}`}
      className="block group rounded-xl border border-foreground/10 bg-foreground/[0.03] p-5 hover:border-foreground/20 hover:bg-foreground/[0.06] transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 flex gap-1">
          <div
            className="w-8 h-12 rounded-sm"
            style={{ backgroundColor: horse.baseColor }}
            title="Base"
          />
          <div
            className="w-4 h-12 rounded-sm"
            style={{ backgroundColor: horse.secondaryColor }}
            title="Secondary"
          />
          <div
            className="w-4 h-12 rounded-sm"
            style={{ backgroundColor: horse.maneColor }}
            title="Mane"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate group-hover:text-white transition-colors">
            {horse.name}
          </h3>
          <p className="text-xs text-foreground/40 mt-0.5">
            {horse.height} cm &middot; {horse.length} cm &middot;{" "}
            {horse.preferredHairStyle}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
        <StatBar label="Speed" value={horse.topSpeed} />
        <StatBar label="Accel" value={horse.acceleration} />
        <StatBar label="Stamina" value={horse.stamina} />
        <StatBar label="Flex" value={horse.flexibility} />
      </div>
    </Link>
  );
}

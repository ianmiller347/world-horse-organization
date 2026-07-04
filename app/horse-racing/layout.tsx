import { GameSubNav } from '@/components/layout/game-subnav';
import site from '../site.module.css';

export default function HorseRacingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={site.contentGame}>
      <GameSubNav />
      {children}
    </div>
  );
}

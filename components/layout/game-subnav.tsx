'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import site from '@/app/site.module.css';

const GAME_LINKS = [
  { href: '/horse-racing/stable', label: 'Stable' },
  { href: '/horse-racing/races', label: 'Races' },
  { href: '/horse-racing/marketplace', label: 'Marketplace' },
  { href: '/horse-racing/leaderboard', label: 'Leaderboard' },
] as const;

export function GameSubNav() {
  const pathname = usePathname();

  return (
    <nav className={site.gameSubnav} aria-label="Horse racing game">
      <p className={site.gameSubnavLabel}>Digital sanctuary</p>
      {GAME_LINKS.map(({ href, label }) => {
        const isActive =
          pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={href}
            href={href}
            className={isActive ? site.gameSubnavLinkActive : site.gameSubnavLink}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

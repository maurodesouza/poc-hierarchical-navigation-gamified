import { colors } from '../theme/palette';
import type { Mood } from './Lighting';

interface BackgroundProps {
  mood: Mood;
}

const BACKGROUND: Record<Mood, { color: string; near: number; far: number }> = {
  world: { color: colors.skyDay, near: 20, far: 60 },
  house: { color: colors.wallInterior, near: 8, far: 30 },
  kitchen: { color: colors.wallInterior, near: 6, far: 24 },
};

export function Background({ mood }: BackgroundProps) {
  const { color, near, far } = BACKGROUND[mood];

  return (
    <>
      <color attach="background" args={[color]} />
      <fog attach="fog" args={[color, near, far]} />
    </>
  );
}

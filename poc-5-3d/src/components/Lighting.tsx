import { colors } from '../theme/palette';

export type Mood = 'world' | 'house' | 'kitchen';

interface LightingProps {
  mood: Mood;
}

interface Bounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
  near: number;
  far: number;
}

interface MoodConfig {
  sky: string;
  ground: string;
  intensity: number;
  keyColor: string;
  keyIntensity: number;
  keyPosition: [number, number, number];
  bounds: Bounds;
}

const MOODS: Record<Mood, MoodConfig> = {
  world: {
    sky: colors.skyDay,
    ground: colors.grassDark,
    intensity: 0.4,
    keyColor: colors.butter,
    keyIntensity: 1.1,
    keyPosition: [-8, 12, -8],
    bounds: { left: -15, right: 15, top: 15, bottom: -15, near: 0.5, far: 50 },
  },
  house: {
    sky: colors.butter,
    ground: colors.wallInteriorShade,
    intensity: 0.45,
    keyColor: colors.butter,
    keyIntensity: 0.9,
    keyPosition: [-6, 8, -6],
    bounds: { left: -10, right: 10, top: 10, bottom: -10, near: 0.1, far: 30 },
  },
  kitchen: {
    sky: colors.butter,
    ground: colors.tileWarm,
    intensity: 0.5,
    keyColor: colors.butter,
    keyIntensity: 1.2,
    keyPosition: [-5, 7, -5],
    bounds: { left: -8, right: 8, top: 8, bottom: -8, near: 0.1, far: 25 },
  },
};

export function Lighting({ mood }: LightingProps) {
  const config = MOODS[mood];

  return (
    <>
      <hemisphereLight
        color={config.sky}
        groundColor={config.ground}
        intensity={config.intensity}
      />
      <directionalLight
        color={config.keyColor}
        intensity={config.keyIntensity}
        position={config.keyPosition}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={config.bounds.left}
        shadow-camera-right={config.bounds.right}
        shadow-camera-top={config.bounds.top}
        shadow-camera-bottom={config.bounds.bottom}
        shadow-camera-near={config.bounds.near}
        shadow-camera-far={config.bounds.far}
        shadow-bias={-0.0005}
        shadow-radius={4}
      />
    </>
  );
}

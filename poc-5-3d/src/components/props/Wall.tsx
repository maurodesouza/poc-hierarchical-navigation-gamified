import { RoundedBox } from '@react-three/drei';
import { matte } from '../../theme/materials';

interface WallProps {
  width?: number;
  height?: number;
  depth?: number;
  color?: string;
  hovered?: boolean;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function Wall({
  width = 1,
  height = 1,
  depth = 0.2,
  color = 'wallInterior',
  hovered = false,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: WallProps) {
  return (
    <RoundedBox
      args={[width, height, depth] as [number, number, number]}
      radius={0.02}
      smoothness={2}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial {...matte({ color, hovered })} />
    </RoundedBox>
  );
}

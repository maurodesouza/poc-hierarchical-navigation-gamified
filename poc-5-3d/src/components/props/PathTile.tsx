import { RoundedBox } from '@react-three/drei';
import { matte } from '../../theme/materials';

interface PathTileProps {
  position?: [number, number, number];
  width?: number;
  depth?: number;
  color?: string;
}

export function PathTile({
  position = [0, 0, 0],
  width = 0.8,
  depth = 0.8,
  color = 'tileWarm',
}: PathTileProps) {
  return (
    <RoundedBox
      args={[width, 0.03, depth] as [number, number, number]}
      radius={0.01}
      smoothness={2}
      position={position}
      receiveShadow
    >
      <meshStandardMaterial {...matte({ color })} />
    </RoundedBox>
  );
}

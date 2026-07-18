import { RoundedBox } from '@react-three/drei';
import { matte } from '../../theme/materials';

interface GroundTileProps {
  position?: [number, number, number];
  size?: number;
  color?: string;
}

export function GroundTile({
  position = [0, 0, 0],
  size = 12,
  color = 'grassLight',
}: GroundTileProps) {
  return (
    <RoundedBox
      args={[size, 0.25, size] as [number, number, number]}
      radius={0.08}
      smoothness={2}
      position={position}
      receiveShadow
    >
      <meshStandardMaterial {...matte({ color })} />
    </RoundedBox>
  );
}

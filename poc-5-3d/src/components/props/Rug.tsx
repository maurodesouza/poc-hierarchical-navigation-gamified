import { RoundedBox } from '@react-three/drei';
import { matte } from '../../theme/materials';

interface RugProps {
  position?: [number, number, number];
  width?: number;
  depth?: number;
  color?: string;
}

export function Rug({
  position = [0, 0, 0],
  width = 2.6,
  depth = 1.8,
  color = 'peach',
}: RugProps) {
  return (
    <RoundedBox
      args={[width, 0.02, depth] as [number, number, number]}
      radius={0.005}
      smoothness={2}
      position={position}
      receiveShadow
    >
      <meshStandardMaterial {...matte({ color })} />
    </RoundedBox>
  );
}

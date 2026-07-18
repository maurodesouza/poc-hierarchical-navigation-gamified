import { RoundedBox } from '@react-three/drei';
import { matte } from '../../theme/materials';

interface WindowProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  frameColor?: string;
  hovered?: boolean;
}

export function Window({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 1.2,
  height = 1.2,
  frameColor = 'cream',
  hovered = false,
}: WindowProps) {
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox
        args={[width, height, 0.12] as [number, number, number]}
        radius={0.04}
        smoothness={2}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: frameColor, hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[width * 0.7, height * 0.7, 0.16] as [number, number, number]}
        radius={0.02}
        smoothness={2}
        position={[0, 0, 0.08]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'glass', hovered })} transparent opacity={0.5} />
      </RoundedBox>
    </group>
  );
}

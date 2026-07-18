import { RoundedBox } from '@react-three/drei';
import { matte } from '../../theme/materials';

interface CabinetProps {
  width?: number;
  height?: number;
  depth?: number;
  color?: string;
  knobColor?: string;
  hovered?: boolean;
}

export function Cabinet({
  width = 2.2,
  height = 0.7,
  depth = 0.4,
  color = 'cream',
  knobColor = 'woodDark',
  hovered = false,
}: CabinetProps) {
  return (
    <group>
      <RoundedBox
        args={[width, height, depth] as [number, number, number]}
        radius={0.05}
        smoothness={2}
        position={[0, height / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color, hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[width * 0.45, height * 0.75, 0.06] as [number, number, number]}
        radius={0.02}
        smoothness={2}
        position={[-width * 0.23, height / 2, depth / 2 + 0.02]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color, hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[width * 0.45, height * 0.75, 0.06] as [number, number, number]}
        radius={0.02}
        smoothness={2}
        position={[width * 0.23, height / 2, depth / 2 + 0.02]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color, hovered })} />
      </RoundedBox>

      <mesh position={[-width * 0.23, height / 2 - 0.05, depth / 2 + 0.06]} castShadow>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial {...matte({ color: knobColor })} />
      </mesh>

      <mesh position={[width * 0.23, height / 2 - 0.05, depth / 2 + 0.06]} castShadow>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial {...matte({ color: knobColor })} />
      </mesh>
    </group>
  );
}

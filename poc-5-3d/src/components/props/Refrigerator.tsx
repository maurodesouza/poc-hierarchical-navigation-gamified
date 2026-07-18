import { RoundedBox } from '@react-three/drei';
import { matte } from '../../theme/materials';

interface RefrigeratorProps {
  hovered?: boolean;
  scale?: number;
}

export function Refrigerator({ hovered = false, scale = 1 }: RefrigeratorProps) {
  return (
    <group scale={scale}>
      <RoundedBox
        args={[1.45, 0.1, 1.15] as [number, number, number]}
        radius={0.04}
        smoothness={2}
        position={[0, 0.05, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'mintApplianceDark', hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[1.5, 2.4, 1.2] as [number, number, number]}
        radius={0.12}
        smoothness={2}
        position={[0, 1.3, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'mintAppliance', hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[1.6, 0.3, 1.4] as [number, number, number]}
        radius={0.08}
        smoothness={2}
        position={[0, 2.65, 0.1]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'mintApplianceDark', hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[1.55, 0.08, 1.25] as [number, number, number]}
        radius={0.03}
        smoothness={2}
        position={[0, 1.75, 0.05]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'mintApplianceDark', hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[0.14, 1.0, 0.14] as [number, number, number]}
        radius={0.04}
        smoothness={2}
        position={[0.5, 1.15, 0.65]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'steelWarm', hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[0.14, 0.4, 0.14] as [number, number, number]}
        radius={0.04}
        smoothness={2}
        position={[0.5, 2.05, 0.65]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'steelWarm', hovered })} />
      </RoundedBox>
    </group>
  );
}

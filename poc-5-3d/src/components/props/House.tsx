import { RoundedBox } from '@react-three/drei';
import { matte } from '../../theme/materials';

interface HouseProps {
  hovered?: boolean;
}

export function House({ hovered = false }: HouseProps) {
  return (
    <group>
      <RoundedBox
        args={[2.8, 2, 2.8] as [number, number, number]}
        radius={0.12}
        smoothness={2}
        position={[0, 1, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'cream', hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[3.6, 1.4, 3.6] as [number, number, number]}
        radius={0.1}
        smoothness={2}
        position={[0, 2.7, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'coral', hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[0.5, 1, 0.5] as [number, number, number]}
        radius={0.05}
        smoothness={2}
        position={[0.9, 3.3, 0.6]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'terracotta', hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[1.1, 1.8, 0.12] as [number, number, number]}
        radius={0.05}
        smoothness={2}
        position={[0, 0.9, 1.45]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'terracotta', hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[0.85, 1.55, 0.18] as [number, number, number]}
        radius={0.05}
        smoothness={2}
        position={[0, 0.8, 1.54]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'coral', hovered })} />
      </RoundedBox>

      <mesh position={[0.25, 0.8, 1.63]} castShadow>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial {...matte({ color: 'butter' })} />
      </mesh>

      <RoundedBox
        args={[0.9, 0.9, 0.12] as [number, number, number]}
        radius={0.04}
        smoothness={2}
        position={[1.2, 1.2, 1.45]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'woodHoney', hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[0.65, 0.65, 0.16] as [number, number, number]}
        radius={0.02}
        smoothness={2}
        position={[1.2, 1.2, 1.53]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'glass', hovered })} transparent opacity={0.5} />
      </RoundedBox>

      <RoundedBox
        args={[0.9, 0.9, 0.12] as [number, number, number]}
        radius={0.04}
        smoothness={2}
        position={[-1.2, 1.2, 1.45]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'woodHoney', hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[0.65, 0.65, 0.16] as [number, number, number]}
        radius={0.02}
        smoothness={2}
        position={[-1.2, 1.2, 1.53]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'glass', hovered })} transparent opacity={0.5} />
      </RoundedBox>
    </group>
  );
}

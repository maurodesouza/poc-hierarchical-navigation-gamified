import { RoundedBox } from '@react-three/drei';
import { matte } from '../../theme/materials';

interface SofaProps {
  hovered?: boolean;
}

export function Sofa({ hovered = false }: SofaProps) {
  return (
    <group>
      <RoundedBox
        args={[2.6, 0.45, 1.1] as [number, number, number]}
        radius={0.08}
        smoothness={2}
        position={[0, 0.225, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'peach', hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[1.8, 0.25, 0.9] as [number, number, number]}
        radius={0.08}
        smoothness={2}
        position={[0, 0.55, 0.05]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'blushPink', hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[1.9, 0.7, 0.35] as [number, number, number]}
        radius={0.08}
        smoothness={2}
        position={[0, 0.85, -0.4]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'blushPink', hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[0.35, 0.85, 1.05] as [number, number, number]}
        radius={0.08}
        smoothness={2}
        position={[-1.1, 0.55, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'peach', hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[0.35, 0.85, 1.05] as [number, number, number]}
        radius={0.08}
        smoothness={2}
        position={[1.1, 0.55, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'peach', hovered })} />
      </RoundedBox>

      {[
        [-0.95, 0.15, -0.4],
        [0.95, 0.15, -0.4],
        [-0.95, 0.15, 0.4],
        [0.95, 0.15, 0.4],
      ].map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.3, 6]} />
          <meshStandardMaterial {...matte({ color: 'woodDark' })} />
        </mesh>
      ))}
    </group>
  );
}

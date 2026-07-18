import { RoundedBox } from '@react-three/drei';
import { matte } from '../../theme/materials';

interface StoveProps {
  hovered?: boolean;
}

export function Stove({ hovered = false }: StoveProps) {
  return (
    <group>
      <RoundedBox
        args={[1.2, 0.85, 0.8] as [number, number, number]}
        radius={0.08}
        smoothness={2}
        position={[0, 0.425, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'steelWarm', hovered })} />
      </RoundedBox>

      <RoundedBox
        args={[1.25, 0.1, 0.85] as [number, number, number]}
        radius={0.05}
        smoothness={2}
        position={[0, 0.9, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...matte({ color: 'steelWarmDark', hovered })} />
      </RoundedBox>

      {[
        [-0.3, -0.15],
        [0.3, -0.15],
        [0, 0.2],
      ].map(([x, z], index) => (
        <mesh key={index} position={[x, 0.96, z]} castShadow receiveShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.04, 8]} />
          <meshStandardMaterial {...matte({ color: 'ink' })} />
        </mesh>
      ))}

      <RoundedBox
        args={[0.9, 0.5, 0.08] as [number, number, number]}
        radius={0.04}
        smoothness={2}
        position={[0, 0.45, 0.42]}
        castShadow
      >
        <meshStandardMaterial {...matte({ color: 'steelWarmDark' })} />
      </RoundedBox>

      <RoundedBox
        args={[0.65, 0.06, 0.1] as [number, number, number]}
        radius={0.03}
        smoothness={2}
        position={[0, 0.75, 0.46]}
        castShadow
      >
        <meshStandardMaterial {...matte({ color: 'ink' })} />
      </RoundedBox>

      {[-0.3, 0, 0.3].map((x, index) => (
        <mesh key={index} position={[x, 0.65, 0.45]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.12, 8]} />
          <meshStandardMaterial {...matte({ color: 'coral' })} />
        </mesh>
      ))}

      {[
        [-0.45, 0.05, -0.3],
        [0.45, 0.05, -0.3],
        [-0.45, 0.05, 0.3],
        [0.45, 0.05, 0.3],
      ].map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 6]} />
          <meshStandardMaterial {...matte({ color: 'steelWarmDark' })} />
        </mesh>
      ))}
    </group>
  );
}

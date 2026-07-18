import { RoundedBox } from '@react-three/drei';
import { matte } from '../../theme/materials';

interface CounterProps {
  width?: number;
  height?: number;
  depth?: number;
  withSink?: boolean;
  withBacksplash?: boolean;
  hovered?: boolean;
}

export function Counter({
  width = 2.2,
  height = 0.9,
  depth = 0.7,
  withSink = false,
  withBacksplash = false,
  hovered = false,
}: CounterProps) {
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
        <meshStandardMaterial {...matte({ color: 'woodHoney', hovered })} />
      </RoundedBox>

      {withSink && (
        <>
          <RoundedBox
            args={[0.8, 0.06, 0.5] as [number, number, number]}
            radius={0.01}
            smoothness={2}
            position={[0, height + 0.03, 0.05]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial {...matte({ color: 'steelWarm' })} />
          </RoundedBox>

          <mesh position={[0, height + 0.04, -0.05]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <torusGeometry args={[0.18, 0.04, 8, 16, Math.PI]} />
            <meshStandardMaterial {...matte({ color: 'steelWarm' })} />
          </mesh>
        </>
      )}

      {withBacksplash && (
        <RoundedBox
          args={[width, 0.6, 0.1] as [number, number, number]}
          radius={0.02}
          smoothness={2}
          position={[0, height + 0.3, -depth / 2 - 0.05]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial {...matte({ color: 'tileWarm', hovered })} />
        </RoundedBox>
      )}
    </group>
  );
}

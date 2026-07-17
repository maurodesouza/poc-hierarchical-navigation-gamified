import { useFrame } from '@react-three/fiber';
import { matte } from '../theme/materials';
import { useInteractiveObject } from '../hooks/useInteractiveObject';
import { Lighting } from './Lighting';
import { Background } from './Background';

interface WorldSceneProps {
  onEnterHouse: () => void;
}

export function WorldScene({ onEnterHouse }: WorldSceneProps) {
  const { groupRef, hovered, bind } = useInteractiveObject({ onClick: onEnterHouse });

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <>
      <Background mood="world" />
      <Lighting mood="world" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial {...matte({ color: 'grassLight' })} />
      </mesh>

      <group ref={groupRef} {...bind}>
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 2, 3]} />
          <meshStandardMaterial {...matte({ color: 'cream', hovered })} />
        </mesh>

        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <coneGeometry args={[2.5, 1.5, 4]} />
          <meshStandardMaterial {...matte({ color: 'coral', hovered })} />
        </mesh>

        <mesh position={[0, 0.3, 1.51]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 1.4, 0.1]} />
          <meshStandardMaterial {...matte({ color: 'coral', hovered })} />
        </mesh>

        <mesh position={[0.25, 0.35, 1.58]} castShadow>
          <sphereGeometry args={[0.08]} />
          <meshStandardMaterial {...matte({ color: 'butter' })} />
        </mesh>

        {[-0.8, 0.8].map((x) => (
          <group key={x}>
            <mesh position={[x, 1, 1.51]} castShadow receiveShadow>
              <boxGeometry args={[0.7, 0.7, 0.1]} />
              <meshStandardMaterial {...matte({ color: 'cream', hovered })} />
            </mesh>
            <mesh position={[x, 1, 1.56]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.5, 0.05]} />
              <meshStandardMaterial {...matte({ color: 'glass', hovered })} />
            </mesh>
          </group>
        ))}
      </group>

      <Tree position={[-4, 0, -2]} />
      <Tree position={[4, 0, -2]} />
    </>
  );
}

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 2]} />
        <meshStandardMaterial {...matte({ color: 'woodDark' })} />
      </mesh>
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1]} />
        <meshStandardMaterial {...matte({ color: 'leaf' })} />
      </mesh>
      <mesh position={[0.2, 2.7, 0]} castShadow>
        <sphereGeometry args={[0.85]} />
        <meshStandardMaterial {...matte({ color: 'leafDark' })} />
      </mesh>
    </group>
  );
}

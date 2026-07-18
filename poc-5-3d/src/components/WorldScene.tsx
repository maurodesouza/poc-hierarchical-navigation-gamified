import { useFrame } from '@react-three/fiber';
import { useInteractiveObject } from '../hooks/useInteractiveObject';
import { GroundTile, House, PathTile, Tree } from './props';
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

      <GroundTile position={[0, -0.125, 0]} size={12} color="grassLight" />

      <PathTile position={[0, 0.015, 2.2]} />
      <PathTile position={[0.25, 0.015, 3]} />
      <PathTile position={[-0.25, 0.015, 3.8]} />
      <PathTile position={[0, 0.015, 4.6]} />

      <group ref={groupRef} {...bind}>
        <House hovered={hovered} />
      </group>

      <Tree position={[-4, 0, -2]} />
      <Tree position={[4, 0, -2]} scale={1.1} />
    </>
  );
}

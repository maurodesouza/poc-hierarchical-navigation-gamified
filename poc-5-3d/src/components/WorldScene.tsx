import { useFrame } from '@react-three/fiber';
import { useInteractiveObject } from '../hooks/useInteractiveObject';
import { AssetRenderer } from './AssetRenderer';
import { Lighting } from './Lighting';
import { Background } from './Background';

interface WorldSceneProps {
  onEnterHouse: () => void;
}

export function WorldScene({ onEnterHouse }: WorldSceneProps) {
  const { groupRef, bind } = useInteractiveObject({ onClick: onEnterHouse });

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <>
      <Background mood="world" />
      <Lighting mood="world" />

      <AssetRenderer assetId="ground" position={[0, -0.012, 0]} scale={0.024} />

      <AssetRenderer assetId="path_tile" position={[0, 0.04, 2.2]} />
      <AssetRenderer assetId="path_tile" position={[0.25, 0.04, 3]} />
      <AssetRenderer assetId="path_tile" position={[-0.25, 0.04, 3.8]} />
      <AssetRenderer assetId="path_tile" position={[0, 0.04, 4.6]} />

      <group ref={groupRef} {...bind}>
        <AssetRenderer assetId="house" />
      </group>

      <AssetRenderer assetId="tree" position={[-4, 0, -2]} />
      <AssetRenderer assetId="tree" position={[4, 0, -2]} scale={1.1} />
    </>
  );
}

import { useInteractiveObject } from '../hooks/useInteractiveObject';
import { AssetRenderer } from './AssetRenderer';
import { Lighting } from './Lighting';
import { Background } from './Background';

interface HouseSceneProps {
  onEnterKitchen: () => void;
}

export function HouseScene({ onEnterKitchen }: HouseSceneProps) {
  const { groupRef, bind } = useInteractiveObject({ onClick: onEnterKitchen });

  return (
    <>
      <Background mood="house" />
      <Lighting mood="house" />

      <AssetRenderer assetId="ground" position={[0, -0.01, 0]} scale={0.02} />

      <AssetRenderer
        assetId="wall"
        position={[0, 2, -5]}
        scale={[50, 1.33, 0.033]}
      />
      <AssetRenderer
        assetId="wall"
        position={[-5, 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[50, 1.33, 0.033]}
      />
      <AssetRenderer
        assetId="wall"
        position={[5, 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[50, 1.33, 0.033]}
      />

      <AssetRenderer assetId="window" position={[0, 2, -4.9]} />

      <group position={[-3, 0, 2]}>
        <AssetRenderer assetId="rug" position={[0, 0.025, 1.5]} scale={[1.04, 1, 1]} />
        <AssetRenderer assetId="coffee-table" position={[0, 0, 1.5]} />
        <AssetRenderer assetId="sofa" />
      </group>

      <group ref={groupRef} position={[0, 0, -4]} {...bind}>
        <AssetRenderer assetId="counter" position={[-0.6, 0, 0]} scale={[0.6, 0.85, 0.9]} />
        <AssetRenderer assetId="refrigerator" position={[0.8, 0, 0]} scale={0.7} />
      </group>
    </>
  );
}

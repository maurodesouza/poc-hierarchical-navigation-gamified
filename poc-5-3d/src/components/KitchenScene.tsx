import { useInteractiveObject } from '../hooks/useInteractiveObject';
import { AssetRenderer } from './AssetRenderer';
import { Lighting } from './Lighting';
import { Background } from './Background';

interface KitchenSceneProps {
  onRefrigeratorClick: () => void;
}

export function KitchenScene({ onRefrigeratorClick }: KitchenSceneProps) {
  const { groupRef, bind } = useInteractiveObject({
    onClick: onRefrigeratorClick,
    lift: 0.05,
  });

  return (
    <>
      <Background mood="kitchen" />
      <Lighting mood="kitchen" />

      <AssetRenderer assetId="ground" position={[0, -0.006, 0]} scale={0.012} />

      <AssetRenderer
        assetId="wall"
        position={[0, 2, -3]}
        scale={[30, 1.33, 0.033]}
      />
      <AssetRenderer
        assetId="wall"
        position={[-3, 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[30, 1.33, 0.033]}
      />
      <AssetRenderer
        assetId="wall"
        position={[3, 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[30, 1.33, 0.033]}
      />

      <group position={[-1.9, 0, -2.2]}>
        <AssetRenderer assetId="stove" />
      </group>

      <group position={[0, 0, -2.55]}>
        <AssetRenderer assetId="counter" scale={[0.9, 0.95, 1.05]} />
      </group>

      <group position={[0, 2.4, -2.75]}>
        <AssetRenderer assetId="cabinet" />
      </group>

      <group ref={groupRef} position={[1.9, 0, -2.2]} {...bind}>
        <AssetRenderer assetId="refrigerator" />
      </group>
    </>
  );
}

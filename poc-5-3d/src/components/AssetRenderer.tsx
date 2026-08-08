import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { catalog } from '@poc-hierarchical/assets';
import * as THREE from 'three';
import type { ThreeEvent } from '@react-three/fiber';

export interface AssetRendererProps {
  assetId: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  onClick?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOver?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (event: ThreeEvent<PointerEvent>) => void;
}

export function AssetRenderer({
  assetId,
  position,
  rotation,
  scale,
  onClick,
  onPointerOver,
  onPointerOut,
}: AssetRendererProps) {
  const asset = useMemo(() => {
    const found = catalog.assets.find((item) => item.id === assetId);
    if (!found) {
      throw new Error(`Asset "${assetId}" not found in the asset catalog`);
    }
    return found;
  }, [assetId]);

  const url = `/3d/${asset.id}.glb`;
  const gltf = useGLTF(url);
  const scene = useMemo(() => {
    const cloned = gltf.scene.clone();
    cloned.traverse((child) => {
      const mesh = child as unknown as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return cloned;
  }, [gltf]);

  const scaleTuple: [number, number, number] | undefined =
    typeof scale === 'number'
      ? [scale, scale, scale]
      : scale;

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scaleTuple}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <primitive object={scene} />
    </group>
  );
}

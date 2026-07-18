import { matte } from '../../theme/materials';

interface TreeProps {
  position?: [number, number, number];
  scale?: number;
}

export function Tree({ position = [0, 0, 0], scale = 1 }: TreeProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.35, 1, 8]} />
        <meshStandardMaterial {...matte({ color: 'woodDark' })} />
      </mesh>

      <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
        <dodecahedronGeometry args={[0.9]} />
        <meshStandardMaterial {...matte({ color: 'leaf' })} />
      </mesh>

      <mesh position={[0.15, 1.9, 0.1]} castShadow>
        <dodecahedronGeometry args={[0.7]} />
        <meshStandardMaterial {...matte({ color: 'leafDark' })} />
      </mesh>
    </group>
  );
}

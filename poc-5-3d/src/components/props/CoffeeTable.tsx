import { matte } from '../../theme/materials';

export function CoffeeTable() {
  return (
    <group>
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.1, 8]} />
        <meshStandardMaterial {...matte({ color: 'woodHoney' })} />
      </mesh>

      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.14, 0.35, 6]} />
        <meshStandardMaterial {...matte({ color: 'woodDark' })} />
      </mesh>

      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.1, 8]} />
        <meshStandardMaterial {...matte({ color: 'woodDark' })} />
      </mesh>
    </group>
  );
}

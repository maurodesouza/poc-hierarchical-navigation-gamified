import { matte } from '../theme/materials';
import { useInteractiveObject } from '../hooks/useInteractiveObject';
import { Lighting } from './Lighting';
import { Background } from './Background';

interface KitchenSceneProps {
  onRefrigeratorClick: () => void;
}

export function KitchenScene({ onRefrigeratorClick }: KitchenSceneProps) {
  const { groupRef, hovered, bind } = useInteractiveObject({
    onClick: onRefrigeratorClick,
    lift: 0.05,
  });

  return (
    <>
      <Background mood="kitchen" />
      <Lighting mood="kitchen" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial {...matte({ color: 'tileWarm' })} />
      </mesh>

      <mesh position={[0, 2, -3]} castShadow receiveShadow>
        <boxGeometry args={[6, 4, 0.2]} />
        <meshStandardMaterial {...matte({ color: 'wallInterior' })} />
      </mesh>
      <mesh position={[-3, 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 4, 0.2]} />
        <meshStandardMaterial {...matte({ color: 'wallInterior' })} />
      </mesh>
      <mesh position={[3, 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 4, 0.2]} />
        <meshStandardMaterial {...matte({ color: 'wallInterior' })} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial {...matte({ color: 'cream' })} />
      </mesh>

      <mesh position={[-2, 0.5, -2]} castShadow receiveShadow>
        <boxGeometry args={[2, 1, 0.6]} />
        <meshStandardMaterial {...matte({ color: 'woodHoney' })} />
      </mesh>

      <mesh position={[-2, 1.05, -2]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.2, 0.4]} />
        <meshStandardMaterial {...matte({ color: 'steelWarm' })} />
      </mesh>

      <mesh position={[-2, 1.3, -1.85]} castShadow>
        <torusGeometry args={[0.15, 0.03, 8, 16, Math.PI]} />
        <meshStandardMaterial {...matte({ color: 'steelWarm' })} />
      </mesh>

      <group ref={groupRef} position={[2, 0, -2]} {...bind}>
        <mesh position={[0, 1.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 0.7, 0.8]} />
          <meshStandardMaterial {...matte({ color: 'mintAppliance', hovered })} />
        </mesh>

        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 1.3, 0.8]} />
          <meshStandardMaterial {...matte({ color: 'mintAppliance', hovered })} />
        </mesh>

        <mesh position={[0, 1.3, 0.41]} castShadow receiveShadow>
          <boxGeometry args={[1.02, 0.04, 0.04]} />
          <meshStandardMaterial {...matte({ color: 'cream', hovered })} />
        </mesh>

        <mesh position={[0.35, 1.65, 0.42]} castShadow>
          <boxGeometry args={[0.06, 0.4, 0.06]} />
          <meshStandardMaterial {...matte({ color: 'steelWarm' })} />
        </mesh>

        <mesh position={[0.35, 0.65, 0.42]} castShadow>
          <boxGeometry args={[0.06, 0.8, 0.06]} />
          <meshStandardMaterial {...matte({ color: 'steelWarm' })} />
        </mesh>
      </group>

      <group position={[1, 0, -2.5]}>
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 1, 0.6]} />
          <meshStandardMaterial {...matte({ color: 'steelWarm' })} />
        </mesh>

        {[-0.3, 0, 0.3].map((x, index) => (
          <mesh key={index} position={[x, 1.05, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.05]} />
            <meshStandardMaterial {...matte({ color: 'ink' })} />
          </mesh>
        ))}

        {[-0.3, 0, 0.3].map((x, index) => (
          <mesh key={index} position={[x, 0.75, 0.32]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.05]} />
            <meshStandardMaterial {...matte({ color: 'coral' })} />
          </mesh>
        ))}
      </group>

      <mesh position={[-2, 2.3, -2.7]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.8, 0.3]} />
        <meshStandardMaterial {...matte({ color: 'cream' })} />
      </mesh>
      <mesh position={[-2.6, 2.3, -2.55]} castShadow>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshStandardMaterial {...matte({ color: 'woodDark' })} />
      </mesh>
      <mesh position={[-1.4, 2.3, -2.55]} castShadow>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshStandardMaterial {...matte({ color: 'woodDark' })} />
      </mesh>

      <mesh position={[0, 0.75, 1]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.1, 1]} />
        <meshStandardMaterial {...matte({ color: 'woodHoney' })} />
      </mesh>

      {[[-0.6, 0.4], [0.6, 0.4], [-0.6, -0.4], [0.6, -0.4]].map(([x, z], index) => (
        <mesh key={index} position={[x, 0.375, z]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.75]} />
          <meshStandardMaterial {...matte({ color: 'woodDark' })} />
        </mesh>
      ))}
    </>
  );
}

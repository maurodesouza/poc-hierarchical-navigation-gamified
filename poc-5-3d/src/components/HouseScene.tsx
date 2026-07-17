import { matte } from '../theme/materials';
import { useInteractiveObject } from '../hooks/useInteractiveObject';
import { Lighting } from './Lighting';
import { Background } from './Background';

interface HouseSceneProps {
  onEnterKitchen: () => void;
}

export function HouseScene({ onEnterKitchen }: HouseSceneProps) {
  const { groupRef, hovered, bind } = useInteractiveObject({ onClick: onEnterKitchen });

  return (
    <>
      <Background mood="house" />
      <Lighting mood="house" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial {...matte({ color: 'woodHoney' })} />
      </mesh>

      <mesh position={[0, 2, -5]} castShadow receiveShadow>
        <boxGeometry args={[10, 4, 0.2]} />
        <meshStandardMaterial {...matte({ color: 'wallInterior' })} />
      </mesh>
      <mesh position={[-5, 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[10, 4, 0.2]} />
        <meshStandardMaterial {...matte({ color: 'wallInterior' })} />
      </mesh>
      <mesh position={[5, 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[10, 4, 0.2]} />
        <meshStandardMaterial {...matte({ color: 'wallInterior' })} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial {...matte({ color: 'cream' })} />
      </mesh>

      <group ref={groupRef} position={[0, 0, -3]} {...bind}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial {...matte({ color: 'tileWarm', hovered })} transparent opacity={0.5} />
        </mesh>

        <mesh position={[0, 0.5, -1]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 1, 0.5]} />
          <meshStandardMaterial {...matte({ color: 'woodHoney', hovered })} />
        </mesh>

        <mesh position={[1.2, 0.6, -0.8]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 1.2, 0.3]} />
          <meshStandardMaterial {...matte({ color: 'mintAppliance', hovered })} />
        </mesh>

        <mesh position={[0, 2, -1]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.4, 0.1]} />
          <meshStandardMaterial {...matte({ color: 'cream', hovered })} />
        </mesh>
      </group>

      <group position={[-3, 0, 2]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
          <planeGeometry args={[2.6, 2]} />
          <meshStandardMaterial {...matte({ color: 'peach' })} />
        </mesh>

        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 1, 0.8]} />
          <meshStandardMaterial {...matte({ color: 'peach' })} />
        </mesh>

        <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.1, 0.3, 0.9]} />
          <meshStandardMaterial {...matte({ color: 'blushPink' })} />
        </mesh>

        <mesh position={[0, 0.35, 1]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.5, 0.7]} />
          <meshStandardMaterial {...matte({ color: 'woodHoney' })} />
        </mesh>
      </group>
    </>
  );
}

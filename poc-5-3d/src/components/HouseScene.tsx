import { matte } from '../theme/materials';
import { useInteractiveObject } from '../hooks/useInteractiveObject';
import { CoffeeTable, Counter, Refrigerator, Rug, Sofa, Wall, Window } from './props';
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

      <Wall position={[0, 2, -5]} width={10} height={4} />
      <Wall position={[-5, 2, 0]} width={10} height={4} rotation={[0, Math.PI / 2, 0]} />
      <Wall position={[5, 2, 0]} width={10} height={4} rotation={[0, Math.PI / 2, 0]} />

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial {...matte({ color: 'cream' })} />
      </mesh>

      <Window position={[0, 2, -4.9]} width={2} height={1.6} />

      <group position={[-3, 0, 2]}>
        <Rug position={[0, 0.01, 1.5]} width={2.6} depth={1.8} />

        <group position={[0, 0, 1.5]}>
          <CoffeeTable />
        </group>

        <Sofa hovered={false} />
      </group>

      <group ref={groupRef} position={[0, 0, -4]} {...bind}>
        <group position={[-0.6, 0, 0]}>
          <Counter width={1.4} depth={0.6} height={0.8} withSink hovered={hovered} />
        </group>

        <group position={[0.8, 0, 0]}>
          <Refrigerator hovered={hovered} scale={0.7} />
        </group>
      </group>
    </>
  );
}

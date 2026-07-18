import { matte } from '../theme/materials';
import { useInteractiveObject } from '../hooks/useInteractiveObject';
import { Cabinet, Counter, Refrigerator, Stove, Wall } from './props';
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

      <Wall position={[0, 2, -3]} width={6} height={4} />
      <Wall position={[-3, 2, 0]} width={6} height={4} rotation={[0, Math.PI / 2, 0]} />
      <Wall position={[3, 2, 0]} width={6} height={4} rotation={[0, Math.PI / 2, 0]} />

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial {...matte({ color: 'cream' })} />
      </mesh>

      <group position={[-1.9, 0, -2.2]}>
        <Stove />
      </group>

      <group position={[0, 0, -2.55]}>
        <Counter width={2.2} depth={0.7} height={0.9} withSink withBacksplash />
      </group>

      <group position={[0, 2.4, -2.75]}>
        <Cabinet width={2.2} height={0.7} depth={0.4} />
      </group>

      <group ref={groupRef} position={[1.9, 0, -2.2]} {...bind}>
        <Refrigerator hovered={hovered} />
      </group>
    </>
  );
}

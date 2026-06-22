import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HouseSceneProps {
  onEnterKitchen: () => void;
}

export function HouseScene({ onEnterKitchen }: HouseSceneProps) {
  const kitchenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (kitchenRef.current) {
      kitchenRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 2, -5]}>
        <boxGeometry args={[10, 4, 0.2]} />
        <meshStandardMaterial color="#F5DEB3" />
      </mesh>
      <mesh position={[-5, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 4, 0.2]} />
        <meshStandardMaterial color="#F5DEB3" />
      </mesh>
      <mesh position={[5, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 4, 0.2]} />
        <meshStandardMaterial color="#F5DEB3" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#FFF8DC" />
      </mesh>

      {/* Kitchen Area - Clickable */}
      <group ref={kitchenRef} position={[0, 0, -3]} onClick={onEnterKitchen}>
        {/* Kitchen floor marker */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial color="#FFE4B5" transparent opacity={0.5} />
        </mesh>

        {/* Kitchen counter */}
        <mesh position={[0, 0.5, -1]}>
          <boxGeometry args={[2.5, 1, 0.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>

        {/* Kitchen sign */}
        <mesh position={[0, 2, -1]}>
          <boxGeometry args={[1.5, 0.4, 0.1]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Living Room Area */}
      <group position={[-3, 0, 2]}>
        {/* Sofa */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[2, 1, 0.8]} />
          <meshStandardMaterial color="#4169E1" />
        </mesh>
        {/* Coffee table */}
        <mesh position={[0, 0.25, 1]}>
          <boxGeometry args={[1, 0.5, 0.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 3.5, 0]} intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
    </>
  );
}

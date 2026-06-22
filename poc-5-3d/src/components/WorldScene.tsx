import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WorldSceneProps {
  onEnterHouse: () => void;
}

export function WorldScene({ onEnterHouse }: WorldSceneProps) {
  const houseRef = useRef<THREE.Mesh>(null);
  const groundRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (houseRef.current) {
      houseRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <>
      {/* Ground */}
      <mesh ref={groundRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>

      {/* House - Main Structure */}
      <group ref={houseRef} position={[0, 0, 0]} onClick={onEnterHouse}>
        {/* Main Body */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[3, 2, 3]} />
          <meshStandardMaterial color="#DEB887" />
        </mesh>

        {/* Roof */}
        <mesh position={[0, 2.5, 0]}>
          <coneGeometry args={[2.5, 1.5, 4]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>

        {/* Door */}
        <mesh position={[0, 0.3, 1.51]}>
          <boxGeometry args={[0.8, 1.4, 0.1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>

        {/* Windows */}
        <mesh position={[-0.8, 1, 1.51]}>
          <boxGeometry args={[0.6, 0.6, 0.1]} />
          <meshStandardMaterial color="#87CEEB" />
        </mesh>
        <mesh position={[0.8, 1, 1.51]}>
          <boxGeometry args={[0.6, 0.6, 0.1]} />
          <meshStandardMaterial color="#87CEEB" />
        </mesh>
      </group>

      {/* Trees */}
      <group position={[-4, 0, -2]}>
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 2.5, 0]}>
          <sphereGeometry args={[1]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
      </group>

      <group position={[4, 0, -2]}>
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 2.5, 0]}>
          <sphereGeometry args={[1]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
      </group>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
    </>
  );
}

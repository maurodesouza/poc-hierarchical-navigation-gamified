import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface KitchenSceneProps {
  onRefrigeratorClick: () => void;
}

export function KitchenScene({ onRefrigeratorClick }: KitchenSceneProps) {
  const refrigeratorRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (refrigeratorRef.current) {
      // Subtle hover animation
      refrigeratorRef.current.position.y = hovered ? 1.05 : 1;
    }
  });

  return (
    <>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#FFF8DC" />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 2, -3]}>
        <boxGeometry args={[6, 4, 0.2]} />
        <meshStandardMaterial color="#E6E6FA" />
      </mesh>
      <mesh position={[-3, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[6, 4, 0.2]} />
        <meshStandardMaterial color="#E6E6FA" />
      </mesh>
      <mesh position={[3, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[6, 4, 0.2]} />
        <meshStandardMaterial color="#E6E6FA" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Counter */}
      <mesh position={[-2, 0.5, -2]}>
        <boxGeometry args={[2, 1, 0.6]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Sink */}
      <mesh position={[-2, 1.1, -2]}>
        <boxGeometry args={[0.8, 0.2, 0.4]} />
        <meshStandardMaterial color="#C0C0C0" />
      </mesh>

      {/* Refrigerator - Clickable */}
      <mesh
        ref={refrigeratorRef}
        position={[2, 1, -2]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onRefrigeratorClick}
      >
        <boxGeometry args={[1, 2, 0.8]} />
        <meshStandardMaterial 
          color={hovered ? "#B0C4DE" : "#708090"} 
          emissive={hovered ? "#4169E1" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>

      {/* Refrigerator handle */}
      <mesh position={[2.4, 1, -2]}>
        <boxGeometry args={[0.05, 0.8, 0.05]} />
        <meshStandardMaterial color="#C0C0C0" />
      </mesh>

      {/* Stove */}
      <mesh position={[0, 0.5, -2.5]}>
        <boxGeometry args={[1.2, 1, 0.6]} />
        <meshStandardMaterial color="#2F4F4F" />
      </mesh>

      {/* Stove burners */}
      <mesh position={[0, 1.05, -2.5]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05]} />
        <meshStandardMaterial color="#1C1C1C" />
      </mesh>
      <mesh position={[-0.3, 1.05, -2.5]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05]} />
        <meshStandardMaterial color="#1C1C1C" />
      </mesh>
      <mesh position={[0.3, 1.05, -2.5]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05]} />
        <meshStandardMaterial color="#1C1C1C" />
      </mesh>

      {/* Table */}
      <mesh position={[0, 0.75, 1]}>
        <boxGeometry args={[1.5, 0.1, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Table legs */}
      <mesh position={[-0.6, 0.375, 0.4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.75]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.6, 0.375, 0.4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.75]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-0.6, 0.375, -0.4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.75]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.6, 0.375, -0.4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.75]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <pointLight position={[0, 3.5, 0]} intensity={1} />
      <directionalLight position={[3, 5, 3]} intensity={0.6} />
    </>
  );
}

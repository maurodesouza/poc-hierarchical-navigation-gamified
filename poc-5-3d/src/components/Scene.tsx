import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { WorldScene } from './WorldScene';
import { HouseScene } from './HouseScene';
import { KitchenScene } from './KitchenScene';
import * as THREE from 'three';

interface SceneProps {
  currentArea: string;
  onEnterHouse: () => void;
  onEnterKitchen: () => void;
  onRefrigeratorClick: () => void;
}

function AnimatedCamera({ currentArea }: { currentArea: string }) {
  const { camera } = useThree();
  const cameraRef = useRef(camera as THREE.OrthographicCamera);
  const targetPositionRef = useRef(new THREE.Vector3(10, 10, 10));
  const targetZoomRef = useRef(50);
  
  const getCameraConfig = (area: string) => {
    switch (area) {
      case 'world':
        return { position: new THREE.Vector3(10, 10, 10), zoom: 50 };
      case 'house':
        return { position: new THREE.Vector3(8, 8, 8), zoom: 80 };
      case 'kitchen':
        return { position: new THREE.Vector3(5, 5, 5), zoom: 120 };
      default:
        return { position: new THREE.Vector3(10, 10, 10), zoom: 50 };
    }
  };

  // Update target when currentArea changes
  useEffect(() => {
    const config = getCameraConfig(currentArea);
    targetPositionRef.current = config.position;
    targetZoomRef.current = config.zoom;
  }, [currentArea]);

  useFrame((_state, delta) => {
    if (cameraRef.current) {
      // Smoothly interpolate position
      cameraRef.current.position.lerp(targetPositionRef.current, delta * 3);
      
      // Smoothly interpolate zoom
      cameraRef.current.zoom = THREE.MathUtils.lerp(
        cameraRef.current.zoom,
        targetZoomRef.current,
        delta * 3
      );
      
      cameraRef.current.updateProjectionMatrix();
    }
  });

  return null;
}

export function Scene({ 
  currentArea, 
  onEnterHouse, 
  onEnterKitchen, 
  onRefrigeratorClick 
}: SceneProps) {
  const getInitialCameraConfig = (area: string) => {
    switch (area) {
      case 'world':
        return { position: [10, 10, 10] as [number, number, number], zoom: 50 };
      case 'house':
        return { position: [8, 8, 8] as [number, number, number], zoom: 80 };
      case 'kitchen':
        return { position: [5, 5, 5] as [number, number, number], zoom: 120 };
      default:
        return { position: [10, 10, 10] as [number, number, number], zoom: 50 };
    }
  };

  const cameraConfig = getInitialCameraConfig(currentArea);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas>
        <Suspense fallback={null}>
          <OrthographicCamera
            makeDefault
            position={cameraConfig.position}
            zoom={cameraConfig.zoom}
            near={0.1}
            far={1000}
          />
          
          <AnimatedCamera currentArea={currentArea} />
          
          {currentArea === 'world' && (
            <WorldScene onEnterHouse={onEnterHouse} />
          )}
          
          {currentArea === 'house' && (
            <HouseScene onEnterKitchen={onEnterKitchen} />
          )}
          
          {currentArea === 'kitchen' && (
            <KitchenScene onRefrigeratorClick={onRefrigeratorClick} />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

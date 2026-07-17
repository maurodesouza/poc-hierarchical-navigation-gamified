import { useMemo, useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

interface UseInteractiveObjectOptions {
  onClick?: () => void;
  lift?: number;
}

export function useInteractiveObject({ onClick, lift = 0.05 }: UseInteractiveObjectOptions = {}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const baseYRef = useRef<number | null>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (baseYRef.current === null) {
      baseYRef.current = groupRef.current.position.y;
    }

    const targetY = baseYRef.current + (hovered ? lift : 0);
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      delta * 10
    );

    const idlePulse = 1 + Math.sin(state.clock.elapsedTime * Math.PI) * 0.03;
    const targetScale = pressed ? 0.95 : hovered ? 1.02 : idlePulse;
    const nextScale = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 12);
    groupRef.current.scale.setScalar(nextScale);
  });

  const bind = useMemo(
    () => ({
      onPointerOver: (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        document.body.style.cursor = 'pointer';
        setHovered(true);
      },
      onPointerOut: (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        document.body.style.cursor = 'auto';
        setHovered(false);
      },
      onPointerDown: (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        setPressed(true);
      },
      onPointerUp: (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        setPressed(false);
      },
      onClick: (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        onClick?.();
      },
    }),
    [onClick]
  );

  return { groupRef, hovered, bind };
}

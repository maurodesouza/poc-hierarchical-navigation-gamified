import { useEffect, useRef } from 'react';
import { Application } from 'pixi.js';
import { colors } from '@poc-hierarchical/core';
import { clearTextureCache } from '../assets/assetLoader';

interface PixiStageProps {
  children: (app: Application) => void;
}

/**
 * React wrapper that mounts a Pixi Application and provides it to children.
 * Properly cleans up the Pixi Application and textures on unmount to prevent memory leaks.
 */
export function PixiStage({ children }: PixiStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<Application | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const initPixi = async () => {
      if (!canvasRef.current) return;

      const app = new Application();

      await app.init({
        canvas: canvasRef.current,
        resizeTo: window,
        backgroundColor: Number.parseInt(colors.cream.slice(1), 16),
        antialias: true,
      });

      appRef.current = app;
      children(app);
    };

    initPixi();

    return () => {
      // Clear texture cache before destroying app
      clearTextureCache();

      if (appRef.current) {
        appRef.current.destroy(true, true);
        appRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} />;
}

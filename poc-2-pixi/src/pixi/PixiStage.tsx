import { useEffect, useRef } from 'react';
import { Application } from 'pixi.js';

interface PixiStageProps {
  children: (app: Application) => void;
}

/**
 * React wrapper that mounts a Pixi Application and provides it to children.
 * Properly cleans up the Pixi Application on unmount to prevent memory leaks.
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
        backgroundColor: 0x1a1a2e,
        antialias: true,
      });

      appRef.current = app;
      children(app);
    };

    initPixi();

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, true);
        appRef.current = null;
      }
    };
  }, [children]);

  return <canvas ref={canvasRef} />;
}

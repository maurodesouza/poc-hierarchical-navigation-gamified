import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { WorldScene } from './scenes/WorldScene';
import { HouseScene } from './scenes/HouseScene';
import { KitchenScene } from './scenes/KitchenScene';

export const PhaserGame = () => {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: containerRef.current,
      backgroundColor: '#2c3e50',
      scene: [WorldScene, HouseScene, KitchenScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', maxWidth: '800px', aspectRatio: '4/3' }} />;
};

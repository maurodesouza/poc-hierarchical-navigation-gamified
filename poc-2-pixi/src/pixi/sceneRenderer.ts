import { Application, Container, Sprite, FederatedPointerEvent, Ticker } from 'pixi.js';
import type { AreaNode, ObjectInfo } from '@poc-hierarchical/core';
import { getAssetSprite, clearTextureCache } from '../assets/assetLoader';

export interface SceneRendererOptions {
  onAreaClick: (areaId: string) => void;
  onObjectSelect: (object: ObjectInfo) => void;
}

/**
 * Renders the current area using the shared 2D sprite pipeline.
 * Clears and rebuilds the stage when the area changes.
 */
export function renderScene(
  app: Application,
  area: AreaNode,
  options: SceneRendererOptions
): Container {
  const container = new Container();

  // Clear existing stage and texture cache
  app.stage.removeChildren();
  clearTextureCache();
  app.stage.addChild(container);

  const { width, height } = app.screen;
  const centerX = width / 2;
  const centerY = height / 2;

  // Add background based on area
  const background = getAssetSprite(area.id);
  background.x = centerX;
  background.y = centerY;
  container.addChild(background);

  // Render child areas as interactive sprites
  if (area.children && area.children.length > 0) {
    const childCount = area.children.length;
    const spacing = 250;
    const totalWidth = (childCount - 1) * spacing;
    const startX = centerX - totalWidth / 2;

    area.children.forEach((child, index) => {
      const sprite = getAssetSprite(child.id);
      sprite.x = startX + index * spacing;
      sprite.y = centerY;
      sprite.eventMode = 'static';
      sprite.cursor = 'pointer';

      sprite.on('pointertap', () => {
        options.onAreaClick(child.id);
      });

      sprite.on('pointerover', (event: FederatedPointerEvent) => {
        const target = event.currentTarget as Sprite;
        target.scale.set(1.1);
      });

      sprite.on('pointerout', (event: FederatedPointerEvent) => {
        const target = event.currentTarget as Sprite;
        target.scale.set(1);
      });

      container.addChild(sprite);
    });
  }

  // Render objects as interactive sprites
  if (area.objects && area.objects.length > 0) {
    const objectCount = area.objects.length;
    const spacing = 250;
    const totalWidth = (objectCount - 1) * spacing;
    const startX = centerX - totalWidth / 2;

    area.objects.forEach((object, index) => {
      const sprite = getAssetSprite(object.id);
      sprite.x = startX + index * spacing;
      sprite.y = centerY;
      sprite.eventMode = 'static';
      sprite.cursor = 'pointer';

      sprite.on('pointertap', () => {
        options.onObjectSelect(object);
      });

      sprite.on('pointerover', (event: FederatedPointerEvent) => {
        const target = event.currentTarget as Sprite;
        target.scale.set(1.15);
      });

      sprite.on('pointerout', (event: FederatedPointerEvent) => {
        const target = event.currentTarget as Sprite;
        target.scale.set(1);
      });

      container.addChild(sprite);
    });
  }

  // Animate entrance: zoom in with fade
  container.alpha = 0;
  container.scale.set(0.8);

  const ticker = new Ticker();
  ticker.maxFPS = 60;
  let frameCount = 0;
  ticker.add(() => {
    frameCount++;
    const progress = Math.min(frameCount / 30, 1); // 30 frames for animation

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);

    container.alpha = eased;
    container.scale.set(0.8 + (0.2 * eased));

    if (progress >= 1) {
      ticker.stop();
      ticker.destroy();
    }
  });
  ticker.start();

  return container;
}

/**
 * Animate scene exit (fade out and scale down)
 */
export function animateSceneExit(container: Container, callback: () => void): void {
  const ticker = new Ticker();
  ticker.maxFPS = 60;
  let frameCount = 0;
  ticker.add(() => {
    frameCount++;
    const progress = Math.min(frameCount / 20, 1); // 20 frames for exit animation

    // Ease in cubic
    const eased = progress * progress * progress;

    container.alpha = 1 - eased;
    container.scale.set(1 - (0.2 * eased));

    if (progress >= 1) {
      ticker.stop();
      ticker.destroy();
      callback();
    }
  });
  ticker.start();
}

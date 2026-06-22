import { Application, Container, Graphics, Text, FederatedPointerEvent, Ticker } from 'pixi.js';
import type { AreaNode, ObjectInfo } from '../data/world';
import {
  getWorldTexture,
  getHouseTexture,
  getKitchenTexture,
  getRefrigeratorTexture,
  getHouseInteriorTexture,
  getKitchenInteriorTexture,
  clearTextureCache
} from '../assets/textureGenerator';

export interface SceneRendererOptions {
  onAreaClick: (areaId: string) => void;
  onObjectSelect: (object: ObjectInfo) => void;
}

/**
 * Renders the current area as PixiJS graphics with isometric art.
 * Clears and rebuilds the stage when the area changes.
 * Includes smooth transitions for area navigation.
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
  const background = getBackgroundForArea(area);
  background.x = 0;
  background.y = 0;
  container.addChild(background);

  // Render child areas as interactive graphics
  if (area.children && area.children.length > 0) {
    const childCount = area.children.length;
    const spacing = 250;
    const totalWidth = (childCount - 1) * spacing;
    const startX = centerX - totalWidth / 2;

    area.children.forEach((child, index) => {
      const graphics = getGraphicsForArea(child);
      const x = startX + index * spacing;
      const y = centerY;

      graphics.x = x;
      graphics.y = y;
      graphics.eventMode = 'static';
      graphics.cursor = 'pointer';

      // Click handler
      graphics.on('pointertap', () => {
        options.onAreaClick(child.id);
      });

      // Hover effect with scale
      graphics.on('pointerover', (event: FederatedPointerEvent) => {
        const target = event.currentTarget as Graphics;
        target.scale.set(1.1);
      });

      graphics.on('pointerout', (event: FederatedPointerEvent) => {
        const target = event.currentTarget as Graphics;
        target.scale.set(1);
      });

      container.addChild(graphics);
    });
  }

  // Render objects as interactive graphics
  if (area.objects && area.objects.length > 0) {
    const objectCount = area.objects.length;
    const spacing = 250;
    const totalWidth = (objectCount - 1) * spacing;
    const startX = centerX - totalWidth / 2;

    area.objects.forEach((object, index) => {
      const graphics = getGraphicsForObject(object);
      const x = startX + index * spacing;
      const y = centerY;

      graphics.x = x;
      graphics.y = y;
      graphics.eventMode = 'static';
      graphics.cursor = 'pointer';

      // Click handler
      graphics.on('pointertap', () => {
        options.onObjectSelect(object);
      });

      // Enhanced hover effect for objects (especially refrigerator)
      graphics.on('pointerover', (event: FederatedPointerEvent) => {
        const target = event.currentTarget as Graphics;
        target.scale.set(1.15);
      });

      graphics.on('pointerout', (event: FederatedPointerEvent) => {
        const target = event.currentTarget as Graphics;
        target.scale.set(1);
      });

      container.addChild(graphics);
    });
  }

  // Add area title
  const titleText = new Text({
    text: area.name,
    style: {
      fill: 0xffffff,
      fontSize: 32,
      fontWeight: 'bold',
    },
  });
  titleText.x = centerX;
  titleText.y = 50;
  titleText.anchor.set(0.5, 0);
  container.addChild(titleText);

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

/**
 * Get background graphics for the current area
 */
function getBackgroundForArea(area: AreaNode): Graphics {
  switch (area.id) {
    case 'world':
      return getWorldTexture();
    case 'house':
      return getHouseInteriorTexture();
    case 'kitchen':
      return getKitchenInteriorTexture();
    default:
      // Default background
      return new Graphics();
  }
}

/**
 * Get graphics for a child area
 */
function getGraphicsForArea(area: AreaNode): Graphics {
  switch (area.id) {
    case 'house':
      return getHouseTexture();
    case 'kitchen':
      return getKitchenTexture();
    default:
      // Fallback - create a simple placeholder
      return getHouseTexture();
  }
}

/**
 * Get graphics for an object
 */
function getGraphicsForObject(object: ObjectInfo): Graphics {
  switch (object.id) {
    case 'refrigerator':
      return getRefrigeratorTexture();
    default:
      // Fallback - create a simple placeholder
      return getRefrigeratorTexture();
  }
}

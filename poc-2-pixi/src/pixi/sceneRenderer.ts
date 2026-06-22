import { Application, Graphics, Container, Text } from 'pixi.js';
import type { AreaNode, ObjectInfo } from '../data/world';

export interface SceneRendererOptions {
  onAreaClick: (areaId: string) => void;
  onObjectSelect: (object: ObjectInfo) => void;
}

/**
 * Renders the current area as PixiJS sprites.
 * Clears and rebuilds the stage when the area changes.
 */
export function renderScene(
  app: Application,
  area: AreaNode,
  options: SceneRendererOptions
): Container {
  const container = new Container();
  
  // Clear existing stage
  app.stage.removeChildren();
  app.stage.addChild(container);

  const { width, height } = app.screen;
  const centerX = width / 2;
  const centerY = height / 2;

  // Render child areas as interactive sprites
  if (area.children && area.children.length > 0) {
    const childCount = area.children.length;
    const spacing = 200;
    const totalWidth = (childCount - 1) * spacing;
    const startX = centerX - totalWidth / 2;

    area.children.forEach((child, index) => {
      const graphics = new Graphics();
      const x = startX + index * spacing;
      const y = centerY;

      // Draw colored rectangle as placeholder sprite
      graphics.rect(x - 75, y - 75, 150, 150);
      graphics.fill({ color: 0x4a9eff });
      graphics.stroke({ width: 2, color: 0xffffff });

      // Add text label
      const text = new Text({
        text: child.name,
        style: {
          fill: 0xffffff,
          fontSize: 16,
          fontWeight: 'bold',
        },
      });
      text.x = x;
      text.y = y + 90;

      // Make interactive
      graphics.eventMode = 'static';
      graphics.cursor = 'pointer';
      graphics.on('pointertap', () => {
        options.onAreaClick(child.id);
      });

      // Hover effect
      graphics.on('pointerover', () => {
        graphics.clear();
        graphics.rect(x - 75, y - 75, 150, 150);
        graphics.fill({ color: 0x6bb8ff });
        graphics.stroke({ width: 2, color: 0xffffff });
      });

      graphics.on('pointerout', () => {
        graphics.clear();
        graphics.rect(x - 75, y - 75, 150, 150);
        graphics.fill({ color: 0x4a9eff });
        graphics.stroke({ width: 2, color: 0xffffff });
      });

      container.addChild(graphics);
      container.addChild(text);
    });
  }

  // Render objects as interactive sprites
  if (area.objects && area.objects.length > 0) {
    const objectCount = area.objects.length;
    const spacing = 200;
    const totalWidth = (objectCount - 1) * spacing;
    const startX = centerX - totalWidth / 2;

    area.objects.forEach((object, index) => {
      const graphics = new Graphics();
      const x = startX + index * spacing;
      const y = centerY;

      // Draw colored rectangle as placeholder sprite (different color for objects)
      graphics.rect(x - 60, y - 60, 120, 120);
      graphics.fill({ color: 0xff6b6b });
      graphics.stroke({ width: 2, color: 0xffffff });

      // Add text label
      const text = new Text({
        text: object.name,
        style: {
          fill: 0xffffff,
          fontSize: 14,
          fontWeight: 'bold',
        },
        x: x,
        y: y + 75,
        anchor: { x: 0.5, y: 0 },
      });

      // Make interactive
      graphics.eventMode = 'static';
      graphics.cursor = 'pointer';
      graphics.on('pointertap', () => {
        options.onObjectSelect(object);
      });

      // Hover effect
      graphics.on('pointerover', () => {
        graphics.clear();
        graphics.rect(x - 60, y - 60, 120, 120);
        graphics.fill({ color: 0xff8585 });
        graphics.stroke({ width: 2, color: 0xffffff });
      });

      graphics.on('pointerout', () => {
        graphics.clear();
        graphics.rect(x - 60, y - 60, 120, 120);
        graphics.fill({ color: 0xff6b6b });
        graphics.stroke({ width: 2, color: 0xffffff });
      });

      container.addChild(graphics);
      container.addChild(text);
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
    x: centerX,
    y: 50,
    anchor: { x: 0.5, y: 0 },
  });
  container.addChild(titleText);

  return container;
}

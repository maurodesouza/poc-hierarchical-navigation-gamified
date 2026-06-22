import { Graphics } from 'pixi.js';

/**
 * Generates isometric sprite graphics programmatically.
 * This creates visual assets without requiring external image files.
 * Returns Graphics objects that can be used directly as display objects.
 */

// Cache for generated graphics
const graphicsCache = new Map<string, Graphics>();

/**
 * Clear all cached graphics (call when changing areas)
 */
export function clearTextureCache(): void {
  graphicsCache.forEach(graphics => graphics.destroy());
  graphicsCache.clear();
}

/**
 * Generate a world background graphics with sky and ground
 */
export function getWorldTexture(): Graphics {
  const cacheKey = 'world';
  if (graphicsCache.has(cacheKey)) {
    return graphicsCache.get(cacheKey)!;
  }

  const graphics = new Graphics();
  
  // Sky gradient (light blue)
  graphics.rect(0, 0, 800, 400);
  graphics.fill({ color: 0x87CEEB });
  
  // Ground (green grass)
  graphics.rect(0, 400, 800, 200);
  graphics.fill({ color: 0x90EE90 });
  
  // Add some grass details
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * 800;
    const y = 400 + Math.random() * 200;
    graphics.circle(x, y, 3);
    graphics.fill({ color: 0x228B22 });
  }

  graphicsCache.set(cacheKey, graphics);
  return graphics;
}

/**
 * Generate a house sprite graphics (isometric-style)
 */
export function getHouseTexture(): Graphics {
  const cacheKey = 'house';
  if (graphicsCache.has(cacheKey)) {
    return graphicsCache.get(cacheKey)!;
  }

  const graphics = new Graphics();
  
  // Center the graphics around origin
  const offsetX = -100;
  const offsetY = -100;
  
  // House base (brown)
  graphics.rect(offsetX, offsetY + 50, 200, 150);
  graphics.fill({ color: 0x8B4513 });
  graphics.stroke({ width: 3, color: 0x5D3A1A });
  
  // Roof (triangle)
  graphics.moveTo(offsetX, offsetY + 50);
  graphics.lineTo(offsetX + 100, offsetY);
  graphics.lineTo(offsetX + 200, offsetY + 50);
  graphics.closePath();
  graphics.fill({ color: 0xA0522D });
  graphics.stroke({ width: 3, color: 0x5D3A1A });
  
  // Door
  graphics.rect(offsetX + 80, offsetY + 120, 40, 80);
  graphics.fill({ color: 0x654321 });
  graphics.stroke({ width: 2, color: 0x3D2914 });
  
  // Windows
  graphics.rect(offsetX + 20, offsetY + 80, 50, 50);
  graphics.fill({ color: 0x87CEEB });
  graphics.stroke({ width: 2, color: 0x5D3A1A });
  
  graphics.rect(offsetX + 130, offsetY + 80, 50, 50);
  graphics.fill({ color: 0x87CEEB });
  graphics.stroke({ width: 2, color: 0x5D3A1A });

  graphicsCache.set(cacheKey, graphics);
  return graphics;
}

/**
 * Generate a kitchen sprite graphics (isometric-style)
 */
export function getKitchenTexture(): Graphics {
  const cacheKey = 'kitchen';
  if (graphicsCache.has(cacheKey)) {
    return graphicsCache.get(cacheKey)!;
  }

  const graphics = new Graphics();
  
  // Center the graphics around origin
  const offsetX = -150;
  const offsetY = -125;
  
  // Floor (beige)
  graphics.rect(offsetX, offsetY, 300, 250);
  graphics.fill({ color: 0xF5F5DC });
  graphics.stroke({ width: 3, color: 0x999 });
  
  // Counter (brown)
  graphics.rect(offsetX, offsetY, 200, 100);
  graphics.fill({ color: 0xD2B48C });
  graphics.stroke({ width: 2, color: 0x8B4513 });
  
  // Stove (silver)
  graphics.rect(offsetX + 200, offsetY, 100, 100);
  graphics.fill({ color: 0xC0C0C0 });
  graphics.stroke({ width: 2, color: 0x808080 });
  
  // Burners
  graphics.circle(offsetX + 225, offsetY + 25, 15);
  graphics.fill({ color: 0x333 });
  graphics.circle(offsetX + 275, offsetY + 25, 15);
  graphics.fill({ color: 0x333 });
  
  // Table (white)
  graphics.rect(offsetX + 50, offsetY + 150, 200, 100);
  graphics.fill({ color: 0xF5F5F5 });
  graphics.stroke({ width: 2, color: 0xCCC });
  
  // Table legs
  graphics.rect(offsetX + 60, offsetY + 250, 20, 30);
  graphics.fill({ color: 0x8B4513 });
  graphics.rect(offsetX + 220, offsetY + 250, 20, 30);
  graphics.fill({ color: 0x8B4513 });

  graphicsCache.set(cacheKey, graphics);
  return graphics;
}

/**
 * Generate a refrigerator sprite graphics (isometric-style)
 */
export function getRefrigeratorTexture(): Graphics {
  const cacheKey = 'refrigerator';
  if (graphicsCache.has(cacheKey)) {
    return graphicsCache.get(cacheKey)!;
  }

  const graphics = new Graphics();
  
  // Center the graphics around origin
  const offsetX = -60;
  const offsetY = -100;
  
  // Main body (white/gray)
  graphics.rect(offsetX, offsetY, 120, 200);
  graphics.fill({ color: 0xE8E8E8 });
  graphics.stroke({ width: 3, color: 0x999 });
  
  // Top section (freezer)
  graphics.rect(offsetX + 5, offsetY + 5, 110, 80);
  graphics.fill({ color: 0xD0D0D0 });
  graphics.stroke({ width: 2, color: 0x888 });
  
  // Bottom section (fridge)
  graphics.rect(offsetX + 5, offsetY + 90, 110, 105);
  graphics.fill({ color: 0xE0E0E0 });
  graphics.stroke({ width: 2, color: 0x888 });
  
  // Handles
  graphics.rect(offsetX + 100, offsetY + 20, 10, 50);
  graphics.fill({ color: 0x888 });
  graphics.rect(offsetX + 100, offsetY + 110, 10, 50);
  graphics.fill({ color: 0x888 });
  
  // Brand/logo area
  graphics.rect(offsetX + 20, offsetY + 30, 60, 30);
  graphics.fill({ color: 0x4A9EFF });
  graphics.stroke({ width: 1, color: 0x333 });

  graphicsCache.set(cacheKey, graphics);
  return graphics;
}

/**
 * Generate a background graphics for house interior
 */
export function getHouseInteriorTexture(): Graphics {
  const cacheKey = 'house-interior';
  if (graphicsCache.has(cacheKey)) {
    return graphicsCache.get(cacheKey)!;
  }

  const graphics = new Graphics();
  
  // Wall (beige)
  graphics.rect(0, 0, 800, 400);
  graphics.fill({ color: 0xF5F5DC });
  
  // Floor (wood)
  graphics.rect(0, 400, 800, 200);
  graphics.fill({ color: 0xDEB887 });
  
  // Floor planks
  for (let i = 0; i < 800; i += 40) {
    graphics.moveTo(i, 400);
    graphics.lineTo(i, 600);
    graphics.stroke({ width: 1, color: 0xCD853F });
  }

  graphicsCache.set(cacheKey, graphics);
  return graphics;
}

/**
 * Generate a background graphics for kitchen interior
 */
export function getKitchenInteriorTexture(): Graphics {
  const cacheKey = 'kitchen-interior';
  if (graphicsCache.has(cacheKey)) {
    return graphicsCache.get(cacheKey)!;
  }

  const graphics = new Graphics();
  
  // Wall (cream)
  graphics.rect(0, 0, 800, 400);
  graphics.fill({ color: 0xFFF8DC });
  
  // Floor (tile)
  graphics.rect(0, 400, 800, 200);
  graphics.fill({ color: 0xF0E68C });
  
  // Tile grid
  for (let x = 0; x < 800; x += 50) {
    for (let y = 400; y < 600; y += 50) {
      graphics.rect(x, y, 50, 50);
      graphics.stroke({ width: 1, color: 0xDAA520 });
    }
  }

  graphicsCache.set(cacheKey, graphics);
  return graphics;
}
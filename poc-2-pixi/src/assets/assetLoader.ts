import { Sprite, Texture } from 'pixi.js';
import { get2dSpritePath } from '@poc-hierarchical/assets';

const textureCache = new Map<string, Texture>();

export function getAssetTexture(id: string): Texture {
  const cached = textureCache.get(id);
  if (cached) {
    return cached;
  }

  const texture = Texture.from(get2dSpritePath(id));
  textureCache.set(id, texture);
  return texture;
}

export function getAssetSprite(id: string): Sprite {
  const sprite = new Sprite(getAssetTexture(id));
  sprite.anchor.set(0.5);
  return sprite;
}

export function clearTextureCache(): void {
  textureCache.forEach((texture) => texture.destroy());
  textureCache.clear();
}

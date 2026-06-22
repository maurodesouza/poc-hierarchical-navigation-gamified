import { useState, useCallback } from 'react';
import type { AreaNode } from '../data/world';
import { world } from '../data/world';

/**
 * Navigation hook for hierarchical area exploration
 * 
 * Tracks the current area path and provides enter/back navigation.
 */
export function useNavigation() {
  const [path, setPath] = useState<AreaNode[]>([world]);

  const enter = useCallback((areaId: string) => {
    setPath((currentPath) => {
      const currentArea = currentPath[currentPath.length - 1];
      const nextArea = currentArea.children?.find((child) => child.id === areaId);
      
      if (nextArea) {
        return [...currentPath, nextArea];
      }
      
      if (import.meta.env.DEV) {
        console.warn(`Area with id "${areaId}" not found in current area "${currentArea.id}"`);
      }
      return currentPath;
    });
  }, []);

  const back = useCallback(() => {
    setPath((currentPath) => {
      if (currentPath.length > 1) {
        return currentPath.slice(0, -1);
      }
      return currentPath;
    });
  }, []);

  const currentArea = path[path.length - 1];

  return {
    path,
    currentArea,
    enter,
    back,
    canGoBack: path.length > 1
  };
}

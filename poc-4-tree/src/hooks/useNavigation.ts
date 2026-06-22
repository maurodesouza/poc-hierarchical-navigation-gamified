import { useState, useCallback } from 'react';
import { world, type AreaNode, type ObjectInfo } from '../data/world';

export interface NavigationState {
  path: AreaNode[];
  currentArea: AreaNode;
  selectedObject: ObjectInfo | null;
  enter: (areaId: string) => void;
  back: () => void;
  selectObject: (obj: ObjectInfo | null) => void;
}

export function useNavigation(): NavigationState {
  const [path, setPath] = useState<AreaNode[]>([world]);
  const [selectedObject, setSelectedObject] = useState<ObjectInfo | null>(null);

  const currentArea = path[path.length - 1];

  const enter = useCallback((areaId: string) => {
    setPath((prev) => {
      const current = prev[prev.length - 1];
      const next = current.children?.find((c) => c.id === areaId);
      return next ? [...prev, next] : prev;
    });
    setSelectedObject(null);
  }, []);

  const back = useCallback(() => {
    setPath((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
    setSelectedObject(null);
  }, []);

  const selectObject = useCallback((obj: ObjectInfo | null) => {
    setSelectedObject(obj);
  }, []);

  return { path, currentArea, selectedObject, enter, back, selectObject };
}

import type { AreaNode, ObjectInfo } from '../data/world';
import { AreaSvg } from './AreaSvg';

// Asset imports for hotspots
import worldHotspots from '../assets/world-hotspots.svg?raw';
import houseHotspots from '../assets/house-hotspots.svg?raw';
import kitchenHotspots from '../assets/kitchen-hotspots.svg?raw';

interface SceneProps {
  area: AreaNode;
  onAreaClick: (areaId: string) => void;
  onObjectSelect: (object: ObjectInfo) => void;
}

// Asset mapping for hotspots
const hotspotAssets: Record<string, string> = {
  world: worldHotspots,
  house: houseHotspots,
  kitchen: kitchenHotspots
};

export function Scene({ area, onAreaClick, onObjectSelect }: SceneProps) {
  const hotspotsContent = hotspotAssets[area.id];

  // Handle hotspot clicks for both areas and objects
  const handleHotspotClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const hotspotGroup = target.closest('.hotspot');
    if (hotspotGroup) {
      const areaId = hotspotGroup.getAttribute('data-area-id');
      const objectId = hotspotGroup.getAttribute('data-object-id');
      
      if (areaId) {
        onAreaClick(areaId);
      } else if (objectId && area.objects) {
        const object = area.objects.find(obj => obj.id === objectId);
        if (object) {
          onObjectSelect(object);
        }
      }
    }
  };

  return (
    <div 
      key={area.id}
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        animation: 'fadeInScale 0.3s ease-out'
      }}
    >
      <style>
        {`
          @keyframes fadeInScale {
            from {
              opacity: 0.5;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
      <AreaSvg area={area} onAreaClick={onAreaClick} />
      
      {/* Object hotspots overlay for areas with objects */}
      {hotspotsContent && area.objects && area.objects.length > 0 && (
        <div 
          dangerouslySetInnerHTML={{ __html: hotspotsContent }}
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%',
            pointerEvents: 'auto'
          }}
          onClick={handleHotspotClick}
        />
      )}
    </div>
  );
}

import type { AreaNode } from '../data/world';

interface AreaSvgProps {
  area: AreaNode;
  onAreaClick: (areaId: string) => void;
}

// Asset imports for each area
import worldIllustration from '../assets/world.svg?raw';
import worldHotspots from '../assets/world-hotspots.svg?raw';
import houseIllustration from '../assets/house.svg?raw';
import houseHotspots from '../assets/house-hotspots.svg?raw';
import kitchenIllustration from '../assets/kitchen.svg?raw';
import kitchenHotspots from '../assets/kitchen-hotspots.svg?raw';

// Asset mapping for each area
const areaAssets: Record<string, { illustration: string; hotspots: string }> = {
  world: {
    illustration: worldIllustration,
    hotspots: worldHotspots
  },
  house: {
    illustration: houseIllustration,
    hotspots: houseHotspots
  },
  kitchen: {
    illustration: kitchenIllustration,
    hotspots: kitchenHotspots
  }
};

export function AreaSvg({ area, onAreaClick }: AreaSvgProps) {
  const assets = areaAssets[area.id];

  // Handle hotspot clicks
  const handleHotspotClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const hotspotGroup = target.closest('.hotspot');
    if (hotspotGroup) {
      const areaId = hotspotGroup.getAttribute('data-area-id');
      if (areaId) {
        onAreaClick(areaId);
      }
    }
  };

  if (!assets) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '800px', 
        height: '600px',
        backgroundColor: '#f0f0f0' 
      }}>
        <span>Unknown area: {area.name}</span>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '800px', height: '600px' }}>
      {/* Background illustration */}
      <div 
        dangerouslySetInnerHTML={{ __html: assets.illustration }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
      
      {/* Hotspot overlay */}
      <div 
        dangerouslySetInnerHTML={{ __html: assets.hotspots }}
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
    </div>
  );
}

import { useEffect, useState } from 'react';
import type { AreaNode } from '@poc-hierarchical/core';
import { get2dSvgPath } from '@poc-hierarchical/assets';

// Hotspot overlays are still per-POC because interaction shapes are not part
// of the canonical asset catalog.
import worldHotspots from '../assets/world-hotspots.svg?raw';
import houseHotspots from '../assets/house-hotspots.svg?raw';
import kitchenHotspots from '../assets/kitchen-hotspots.svg?raw';

interface AreaSvgProps {
  area: AreaNode;
  onAreaClick: (areaId: string) => void;
}

const hotspotAssets: Record<string, string> = {
  world: worldHotspots,
  house: houseHotspots,
  kitchen: kitchenHotspots
};

export function AreaSvg({ area, onAreaClick }: AreaSvgProps) {
  const [illustration, setIllustration] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    fetch(get2dSvgPath(area.id))
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${area.id} SVG`);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) setIllustration(text);
      })
      .catch(() => {
        if (!cancelled) setIllustration('');
      });

    return () => {
      cancelled = true;
    };
  }, [area.id]);

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

  const hotspots = hotspotAssets[area.id];

  if (!hotspots) {
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
      <div
        dangerouslySetInnerHTML={{ __html: illustration }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />

      <div
        dangerouslySetInnerHTML={{ __html: hotspots }}
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

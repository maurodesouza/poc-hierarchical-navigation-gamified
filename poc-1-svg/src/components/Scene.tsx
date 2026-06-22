import { AreaNode, ObjectInfo } from '../data/world';
import { AreaSvg } from './AreaSvg';
import { ObjectHotspot } from './ObjectHotspot';

interface SceneProps {
  area: AreaNode;
  onAreaClick: (areaId: string) => void;
  onObjectSelect: (object: ObjectInfo) => void;
}

export function Scene({ area, onAreaClick, onObjectSelect }: SceneProps) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <AreaSvg area={area} onAreaClick={onAreaClick} />
      
      {area.id === 'kitchen' && area.objects && (
        <svg
          width="800"
          height="600"
          viewBox="0 0 800 600"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none'
          }}
        >
          <g style={{ pointerEvents: 'auto' }}>
            {area.objects.map((object) => (
              <ObjectHotspot
                key={object.id}
                object={object}
                x="550"
                y="350"
                width="120"
                height="180"
                onSelect={onObjectSelect}
              />
            ))}
          </g>
        </svg>
      )}
    </div>
  );
}

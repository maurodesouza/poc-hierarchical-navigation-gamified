import type { ObjectInfo } from '../data/world';

interface ObjectHotspotProps {
  object: ObjectInfo;
  x: number;
  y: number;
  width: number;
  height: number;
  onSelect: (object: ObjectInfo) => void;
}

export function ObjectHotspot({ object, x, y, width, height, onSelect }: ObjectHotspotProps) {
  return (
    <g
      onClick={() => onSelect(object)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${object.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(object);
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="#ff6b6b"
        stroke="#c92a2a"
        strokeWidth="2"
        rx="4"
      />
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
        pointerEvents="none"
      >
        {object.name}
      </text>
    </g>
  );
}

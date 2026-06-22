import type { ObjectInfo } from '../data/world';
import { useState } from 'react';

interface ObjectHotspotProps {
  object: ObjectInfo;
  x: number;
  y: number;
  width: number;
  height: number;
  onSelect: (object: ObjectInfo) => void;
}

export function ObjectHotspot({ object, x, y, width, height, onSelect }: ObjectHotspotProps) {
  const [isHovered, setIsHovered] = useState(false);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* Invisible click area */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="transparent"
        stroke="transparent"
      />
      
      {/* Visible hotspot indicator (appears on hover) */}
      <g opacity={isHovered ? 1 : 0.3} style={{ transition: 'opacity 0.3s ease' }}>
        {/* Glow effect */}
        <rect
          x={x - 4}
          y={y - 4}
          width={width + 8}
          height={height + 8}
          fill="none"
          stroke="#4299e1"
          strokeWidth="2"
          rx="6"
          filter="url(#glow)"
          opacity={isHovered ? 0.8 : 0}
          style={{ transition: 'opacity 0.3s ease' }}
        />
        
        {/* Border outline */}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill="rgba(66, 153, 225, 0.1)"
          stroke="#4299e1"
          strokeWidth="2"
          rx="4"
          opacity={isHovered ? 1 : 0.5}
          style={{ transition: 'all 0.3s ease' }}
        />
        
        {/* Interactive indicator dots at corners */}
        {isHovered && (
          <>
            <circle cx={x} cy={y} r="3" fill="#4299e1" />
            <circle cx={x + width} cy={y} r="3" fill="#4299e1" />
            <circle cx={x} cy={y + height} r="3" fill="#4299e1" />
            <circle cx={x + width} cy={y + height} r="3" fill="#4299e1" />
          </>
        )}
      </g>
      
      {/* Glow filter definition */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </g>
  );
}

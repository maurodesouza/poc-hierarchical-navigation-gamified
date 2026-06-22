import type { AreaNode } from '../data/world';

interface AreaSvgProps {
  area: AreaNode;
  onAreaClick: (areaId: string) => void;
}

export function AreaSvg({ area, onAreaClick }: AreaSvgProps) {
  if (area.id === 'world') {
    return (
      <svg width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="#87CEEB" />
        <text x="400" y="50" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">
          {area.name}
        </text>
        {area.children?.map((child) => (
          <g
            key={child.id}
            onClick={() => onAreaClick(child.id)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x="300"
              y="200"
              width="200"
              height="150"
              fill="#8B4513"
              stroke="#5D3A1A"
              strokeWidth="3"
              rx="5"
            />
            <rect
              x="380"
              y="280"
              width="40"
              height="70"
              fill="#654321"
              stroke="#3D2914"
              strokeWidth="2"
            />
            <rect
              x="320"
              y="230"
              width="50"
              height="50"
              fill="#87CEEB"
              stroke="#5D3A1A"
              strokeWidth="2"
            />
            <rect
              x="430"
              y="230"
              width="50"
              height="50"
              fill="#87CEEB"
              stroke="#5D3A1A"
              strokeWidth="2"
            />
            <text
              x="400"
              y="190"
              textAnchor="middle"
              fontSize="18"
              fontWeight="bold"
              fill="#333"
              pointerEvents="none"
            >
              {child.name}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  if (area.id === 'house') {
    return (
      <svg width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="#F5F5DC" />
        <text x="400" y="50" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">
          {area.name}
        </text>
        {area.children?.map((child) => (
          <g
            key={child.id}
            onClick={() => onAreaClick(child.id)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x="250"
              y="150"
              width="300"
              height="250"
              fill="#E8E8E8"
              stroke="#999"
              strokeWidth="3"
              rx="5"
            />
            <rect
              x="350"
              y="300"
              width="100"
              height="100"
              fill="#8B4513"
              stroke="#5D3A1A"
              strokeWidth="2"
            />
            <rect
              x="280"
              y="180"
              width="80"
              height="100"
              fill="#87CEEB"
              stroke="#666"
              strokeWidth="2"
            />
            <rect
              x="440"
              y="180"
              width="80"
              height="100"
              fill="#87CEEB"
              stroke="#666"
              strokeWidth="2"
            />
            <text
              x="400"
              y="130"
              textAnchor="middle"
              fontSize="18"
              fontWeight="bold"
              fill="#333"
              pointerEvents="none"
            >
              {child.name}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  if (area.id === 'kitchen') {
    return (
      <svg width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="#FFF8DC" />
        <text x="400" y="50" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">
          {area.name}
        </text>
        <rect
          x="100"
          y="100"
          width="200"
          height="150"
          fill="#D2B48C"
          stroke="#8B4513"
          strokeWidth="2"
          rx="5"
        />
        <text
          x="200"
          y="180"
          textAnchor="middle"
          fontSize="14"
          fill="#333"
          pointerEvents="none"
        >
          Counter
        </text>
        <rect
          x="500"
          y="100"
          width="150"
          height="200"
          fill="#C0C0C0"
          stroke="#808080"
          strokeWidth="2"
          rx="5"
        />
        <text
          x="575"
          y="210"
          textAnchor="middle"
          fontSize="14"
          fill="#333"
          pointerEvents="none"
        >
          Stove
        </text>
        <rect
          x="100"
          y="350"
          width="200"
          height="150"
          fill="#F5F5F5"
          stroke="#CCC"
          strokeWidth="2"
          rx="5"
        />
        <text
          x="200"
          y="430"
          textAnchor="middle"
          fontSize="14"
          fill="#333"
          pointerEvents="none"
        >
          Table
        </text>
      </svg>
    );
  }

  return (
    <svg width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#f0f0f0" />
      <text x="400" y="300" textAnchor="middle" fontSize="18" fill="#666">
        Unknown area: {area.name}
      </text>
    </svg>
  );
}

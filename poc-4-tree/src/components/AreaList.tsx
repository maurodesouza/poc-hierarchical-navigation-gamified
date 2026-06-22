import type { AreaNode } from '../data/world';

interface AreaListProps {
  areas: AreaNode[];
  onEnter: (areaId: string) => void;
}

export function AreaList({ areas, onEnter }: AreaListProps) {
  if (areas.length === 0) return null;

  return (
    <section className="area-list-section">
      <h2 className="section-title">Areas</h2>
      <ul className="area-list">
        {areas.map((area) => (
          <li key={area.id}>
            <button
              className="area-item"
              onClick={() => onEnter(area.id)}
              aria-label={`Enter ${area.name}`}
            >
              <span className="area-icon">📁</span>
              <span className="area-name">{area.name}</span>
              <span className="area-arrow">›</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

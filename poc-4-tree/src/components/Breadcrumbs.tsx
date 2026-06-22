import type { AreaNode } from '../data/world';

interface BreadcrumbsProps {
  path: AreaNode[];
  onBack: () => void;
}

export function Breadcrumbs({ path, onBack }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="Navigation path">
      {path.length > 1 && (
        <button className="back-btn" onClick={onBack} aria-label="Go back">
          ← Back
        </button>
      )}
      <ol className="breadcrumb-list">
        {path.map((area, i) => (
          <li key={area.id} className="breadcrumb-item">
            {i < path.length - 1 ? (
              <span className="breadcrumb-link">{area.name}</span>
            ) : (
              <span className="breadcrumb-current">{area.name}</span>
            )}
            {i < path.length - 1 && <span className="breadcrumb-sep"> / </span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

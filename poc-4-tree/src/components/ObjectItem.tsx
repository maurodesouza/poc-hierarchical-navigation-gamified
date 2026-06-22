import type { ObjectInfo } from '../data/world';

interface ObjectItemProps {
  object: ObjectInfo;
  onSelect: (obj: ObjectInfo) => void;
}

export function ObjectItem({ object, onSelect }: ObjectItemProps) {
  return (
    <li>
      <button
        className="object-item"
        onClick={() => onSelect(object)}
        aria-label={`Select ${object.name}`}
      >
        <span className="object-icon">📦</span>
        <span className="object-name">{object.name}</span>
        <span className="object-hint">View details ›</span>
      </button>
    </li>
  );
}

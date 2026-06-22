import type { ObjectInfo } from '../data/world';

interface DrawerProps {
  object: ObjectInfo | null;
  onClose: () => void;
}

export function Drawer({ object, onClose }: DrawerProps) {
  if (!object) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} aria-hidden="true" />
      <aside className="drawer" role="complementary" aria-label="Object details">
        <header className="drawer-header">
          <h2 className="drawer-title">{object.name}</h2>
          <button className="drawer-close" onClick={onClose} aria-label="Close details">
            ✕
          </button>
        </header>

        <section className="drawer-section">
          <h3 className="drawer-section-title">Translations</h3>
          <dl className="translations-list">
            <div className="translation-entry">
              <dt>🇬🇧 English</dt>
              <dd>{object.translations.en}</dd>
            </div>
            <div className="translation-entry">
              <dt>🇧🇷 Portuguese</dt>
              <dd>{object.translations.pt}</dd>
            </div>
            <div className="translation-entry">
              <dt>🇯🇵 Japanese</dt>
              <dd>{object.translations.ja}</dd>
            </div>
          </dl>
        </section>

        <section className="drawer-section">
          <h3 className="drawer-section-title">Audio</h3>
          <button className="audio-btn" disabled aria-label="Play audio (unavailable)">
            ▶ Play Audio
          </button>
        </section>

        <section className="drawer-section">
          <h3 className="drawer-section-title">Description</h3>
          <p className="drawer-description">{object.description}</p>
        </section>

        <section className="drawer-section">
          <h3 className="drawer-section-title">Actions</h3>
          <ul className="actions-list">
            {object.actions.map((action) => (
              <li key={action} className="action-item">
                {action}
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </>
  );
}

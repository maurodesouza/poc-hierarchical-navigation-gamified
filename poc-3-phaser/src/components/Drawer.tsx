import type { ObjectInfo } from '../data/world';

interface DrawerProps {
  object: ObjectInfo | null;
  onClose: () => void;
}

export const Drawer = ({ object, onClose }: DrawerProps) => {
  if (!object) return null;

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: '400px',
        height: '100vh',
        backgroundColor: '#ffffff',
        boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
        padding: '20px',
        overflowY: 'auto',
        zIndex: 1000,
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '5px 10px',
          cursor: 'pointer',
        }}
      >
        ×
      </button>

      <h2 style={{ marginTop: 0 }}>{object.name}</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>Translations</h3>
        <p><strong>EN:</strong> {object.translations.en}</p>
        <p><strong>PT:</strong> {object.translations.pt}</p>
        <p><strong>JA:</strong> {object.translations.ja}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Description</h3>
        <p>{object.description}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Actions</h3>
        <ul>
          {object.actions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>

      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#4a90e2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => console.log('Play Audio clicked')}
      >
        Play Audio
      </button>
    </div>
  );
};

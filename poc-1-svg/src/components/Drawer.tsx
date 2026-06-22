import { ObjectInfo } from '../data/world';

interface DrawerProps {
  object: ObjectInfo | null;
  onClose: () => void;
}

export function Drawer({ object, onClose }: DrawerProps) {
  if (!object) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: '350px',
        height: '100%',
        backgroundColor: 'white',
        boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        boxSizing: 'border-box',
        zIndex: 1000,
        overflowY: 'auto'
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          color: '#666'
        }}
      >
        ×
      </button>

      <h2 style={{ marginTop: 0, color: '#333' }}>{object.name}</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}>
          Translations
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>
            <strong>EN:</strong> {object.translations.en}
          </div>
          <div>
            <strong>PT:</strong> {object.translations.pt}
          </div>
          <div>
            <strong>JA:</strong> {object.translations.ja}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}>
          Description
        </h3>
        <p style={{ color: '#333', lineHeight: '1.5' }}>{object.description}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}>
          Audio
        </h3>
        <button
          disabled
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'not-allowed',
            fontSize: '14px'
          }}
        >
          Play Audio
        </button>
      </div>

      <div>
        <h3 style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}>
          Actions
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {object.actions.map((action) => (
            <button
              key={action}
              disabled
              style={{
                padding: '6px 12px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'not-allowed',
                fontSize: '14px'
              }}
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

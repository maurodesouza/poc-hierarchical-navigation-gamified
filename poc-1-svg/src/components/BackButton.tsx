interface BackButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function BackButton({ onClick, disabled = false }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '8px 16px',
        backgroundColor: disabled ? '#ccc' : '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '14px'
      }}
    >
      ← Back
    </button>
  );
}

interface BackButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const BackButton = ({ onClick, disabled = false }: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '10px 20px',
        backgroundColor: disabled ? '#cccccc' : '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '16px',
      }}
    >
      Back
    </button>
  );
};

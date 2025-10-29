// src/components/Loader.jsx
export default function Loader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 0'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '4px solid #6e85d6',
        borderTop: '4px solid transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        boxShadow: '0 0 20px rgba(110, 133, 214, 0.4)',
        position: 'relative'
      }}>
        {/* Optional Inner Glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '20px',
          height: '20px',
          background: '#6e85d6',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.3,
          animation: 'pulse 1.5s ease-in-out infinite'
        }}></div>
      </div>
    </div>
  );
}
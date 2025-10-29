// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, Cloud } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'rgba(22, 33, 62, 0.95)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderBottom: '1px solid #2a3b5f',
      zIndex: 50
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#6e85d6',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#a78bfa';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#6e85d6';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Cloud style={{ width: '24px', height: '24px' }} />
          WeatherX
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: isActive('/') ? '#6e85d6' : '#9ca3af',
              textDecoration: 'none',
              fontWeight: isActive('/') ? '600' : '400',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!isActive('/')) {
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive('/')) {
                e.currentTarget.style.color = '#9ca3af';
              }
            }}
          >
            <Home style={{ width: '20px', height: '20px' }} />
            Home
          </Link>

          <Link
            to="/settings"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: isActive('/settings') ? '#6e85d6' : '#9ca3af',
              textDecoration: 'none',
              fontWeight: isActive('/settings') ? '600' : '400',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!isActive('/settings')) {
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive('/settings')) {
                e.currentTarget.style.color = '#9ca3af';
              }
            }}
          >
            <Settings style={{ width: '20px', height: '20px' }} />
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}
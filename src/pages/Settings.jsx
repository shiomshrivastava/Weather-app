// src/pages/Settings.jsx
import { useState, useEffect } from 'react';
import { ArrowLeft, Moon, Sun, Thermometer, RefreshCw, Info, Save, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [units, setUnits] = useState('metric');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(10);
  const [showSaved, setShowSaved] = useState(false);

  // Load settings
  useEffect(() => {
    const saved = localStorage.getItem('weatherX-settings');
    if (saved) {
      const settings = JSON.parse(saved);
      setIsDarkMode(settings.isDarkMode ?? true);
      setUnits(settings.units ?? 'metric');
      setAutoRefresh(settings.autoRefresh ?? true);
      setRefreshInterval(settings.refreshInterval ?? 10);
    }
  }, []);

  // Save settings
  const saveSettings = () => {
    const settings = { isDarkMode, units, autoRefresh, refreshInterval };
    localStorage.setItem('weatherX-settings', JSON.stringify(settings));
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  // APPLY THEME TO ROOT (html, body, #root)
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (isDarkMode) {
      root.style.background = 'linear-gradient(135deg, #0a0a1a, #0f0f23, #1a1a2e)';
      body.style.background = 'linear-gradient(135deg, #0a0a1a, #0f0f23, #1a1a2e)';
      root.style.color = '#e0e0ff';
      body.style.color = '#e0e0ff';
    } else {
      root.style.background = 'linear-gradient(135deg, #f0f4ff, #e0e7ff, #c7d2fe)';
      body.style.background = 'linear-gradient(135deg, #f0f4ff, #e0e7ff, #c7d2fe)';
      root.style.color = '#1f2937';
      body.style.color = '#1f2937';
    }

    root.style.minHeight = '100vh';
    body.style.minHeight = '100vh';
    root.style.backgroundAttachment = 'fixed';
    body.style.backgroundAttachment = 'fixed';
  }, [isDarkMode]);

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '2rem',
      background: isDarkMode ? 'rgba(22, 33, 62, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: '28px',
      border: isDarkMode ? '1px solid rgba(42, 59, 95, 0.6)' : '1px solid rgba(199, 210, 254, 0.6)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
      color: isDarkMode ? '#e0e0ff' : '#1f2937',
      transition: 'all 0.4s ease'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#6e85d6',
            textDecoration: 'none',
            fontSize: '0.875rem',
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(110, 133, 214, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <ArrowLeft style={{ width: '16px', height: '16px' }} />
          Back
        </Link>

        <button
          onClick={saveSettings}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: showSaved ? '#10b981' : '#6e85d6',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          {showSaved ? <Check style={{ width: '16px', height: '16px' }} /> : <Save style={{ width: '16px', height: '16px' }} />}
          {showSaved ? 'Saved!' : 'Save'}
        </button>
      </div>

      <h1 style={{
        fontSize: '2.25rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        background: isDarkMode
          ? 'linear-gradient(45deg, #6e85d6, #a78bfa)'
          : 'linear-gradient(45deg, #4f46e5, #7c3aed)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Settings
      </h1>

      {/* Dark Mode */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isDarkMode ? <Moon style={{ width: '20px', height: '20px', color: '#6e85d6' }} /> : <Sun style={{ width: '20px', height: '20px', color: '#f59e0b' }} />}
            <span style={{ fontWeight: '600' }}>Dark Mode</span>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              position: 'relative',
              width: '60px',
              height: '32px',
              background: isDarkMode ? '#6e85d6' : '#94a3b8',
              borderRadius: '16px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '4px',
              left: isDarkMode ? '30px' : '4px',
              width: '24px',
              height: '24px',
              background: 'white',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}></div>
          </button>
        </div>
      </div>

      {/* Units */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <Thermometer style={{ width: '20px', height: '20px', color: '#6e85d6' }} />
          <span style={{ fontWeight: '600' }}>Temperature Units</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {['metric', 'imperial'].map(unit => (
            <button
              key={unit}
              onClick={() => setUnits(unit)}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: units === unit ? '#6e85d6' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid',
                borderColor: units === unit ? '#6e85d6' : 'rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {unit === 'metric' ? '°C, m/s' : '°F, mph'}
            </button>
          ))}
        </div>
      </div>

      {/* Auto Refresh */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <RefreshCw style={{ width: '20px', height: '20px', color: '#6e85d6' }} />
          <span style={{ fontWeight: '600' }}>Auto Refresh</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.875rem', color: isDarkMode ? '#9ca3af' : '#64748b' }}>
            Update every {refreshInterval} minutes
          </span>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            style={{
              position: 'relative',
              width: '60px',
              height: '32px',
              background: autoRefresh ? '#10b981' : '#94a3b8',
              borderRadius: '16px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '4px',
              left: autoRefresh ? '30px' : '4px',
              width: '24px',
              height: '24px',
              background: 'white',
              borderRadius: '50%',
              transition: 'all 0.3s ease'
            }}></div>
          </button>
        </div>
        {autoRefresh && (
          <input
            type="range"
            min="5"
            max="60"
            step="5"
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(e.target.value)}
            style={{
              width: '100%',
              marginTop: '0.75rem',
              accentColor: '#6e85d6'
            }}
          />
        )}
      </div>

      {/* App Info */}
      <div style={{
        padding: '1.5rem',
        background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(79, 70, 229, 0.1)',
        borderRadius: '16px',
        border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(199, 210, 254, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Info style={{ width: '20px', height: '20px', color: '#6e85d6' }} />
          <span style={{ fontWeight: '600' }}>App Info</span>
        </div>
        <div style={{ fontSize: '0.875rem', lineHeight: '1.6', color: isDarkMode ? '#9ca3af' : '#64748b' }}>
          <p><strong>Data Source:</strong> OpenWeatherMap API</p>
          <p><strong>Update Interval:</strong> {autoRefresh ? `Every ${refreshInterval} min` : 'Manual'}</p>
          <p><strong>App Version:</strong> 1.0.0</p>
          <p><strong>Build:</strong> React + Vite + Pure CSS</p>
        </div>
      </div>

      {/* Pro Badge */}
      <div style={{
        marginTop: '2rem',
        padding: '1.25rem',
        background: 'linear-gradient(45deg, rgba(110, 133, 214, 0.2), rgba(167, 139, 250, 0.2))',
        borderRadius: '16px',
        textAlign: 'center',
        border: '1px solid rgba(110, 133, 214, 0.3)'
      }}>
        <p style={{ fontSize: '0.875rem', color: '#a78bfa', fontWeight: '600' }}>
          WeatherX is a premium dark theme weather app built with React + Vite + Pure CSS.
        </p>
        <p style={{ fontSize: '0.75rem', color: '#6e85d6', marginTop: '0.5rem' }}>
          No Tailwind. No Compromise.
        </p>
      </div>
    </div>
  );
}
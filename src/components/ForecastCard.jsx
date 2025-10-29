// src/components/ForecastCard.jsx
import { format } from 'date-fns';
import { Cloud, CloudRain, Sun, CloudSnow, Zap } from 'lucide-react';

const weatherIcons = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Snow: CloudSnow,
  Thunderstorm: Zap,
};

export default function ForecastCard({ day }) {
  // SAFE ACCESS
  const weather = day.weather?.[0] || {};
  const main = weather.main || 'Clear';
  const iconCode = weather.icon || '01d';
  const description = weather.description || 'No data';
  const maxTemp = day.temp?.max ? Math.round(day.temp.max) : '-';
  const minTemp = day.temp?.min ? Math.round(day.temp.min) : '-';

  const Icon = weatherIcons[main] || Cloud;

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        padding: '1.25rem',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.5s ease',
        textAlign: 'center',
        cursor: 'default'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 30px rgba(110, 133, 214, 0.5)';
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.borderColor = 'rgba(110, 133, 214, 0.6)';
        // Show orb
        const orb = e.currentTarget.querySelector('.forecast-orb');
        if (orb) orb.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        // Hide orb
        const orb = e.currentTarget.querySelector('.forecast-orb');
        if (orb) orb.style.opacity = '0';
      }}
    >
      {/* Gradient Orb */}
      <div
        className="forecast-orb"
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '80px',
          height: '80px',
          background: 'rgba(110, 133, 214, 0.2)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          opacity: 0,
          transition: 'opacity 0.5s ease'
        }}
      ></div>

      {/* Date */}
      <p style={{
        fontSize: '0.875rem',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '0.25rem'
      }}>
        {format(new Date(day.dt * 1000), 'EEE')}
      </p>
      <p style={{
        fontSize: '0.75rem',
        color: '#9ca3af',
        marginBottom: '0.75rem'
      }}>
        {format(new Date(day.dt * 1000), 'MMM d')}
      </p>

      {/* Weather Icon */}
      <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
        <img
          src={`https://openweathermap.org/img/wn/${iconCode}.png`}
          alt={description}
          style={{
            width: '56px',
            height: '56px',
            margin: '0 auto',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
          }}
        />
        {/* Lucide Icon Overlay on Hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.3'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
        >
          <Icon style={{ width: '40px', height: '40px', color: '#6e85d6' }} />
        </div>
      </div>

      {/* Temperature */}
      <div style={{ marginBottom: '0.5rem' }}>
        <p style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, white, #6e85d6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {maxTemp} degrees
        </p>
        <p style={{
          fontSize: '0.875rem',
          color: '#9ca3af'
        }}>
          {minTemp} degrees
        </p>
      </div>

      {/* Description (on hover) */}
      <p
        style={{
          fontSize: '0.75rem',
          color: '#d1d5db',
          textTransform: 'capitalize',
          marginTop: '0.5rem',
          fontWeight: '500',
          opacity: 0,
          transition: 'opacity 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.opacity = '1'}
        onMouseLeave={(e) => e.target.style.opacity = '0'}
      >
        {description}
      </p>

      {/* Day Number (on hover) */}
      <p
        style={{
          fontSize: '0.75rem',
          color: '#6e85d6',
          marginTop: '0.5rem',
          opacity: 0,
          transition: 'opacity 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.opacity = '1'}
        onMouseLeave={(e) => e.target.style.opacity = '0'}
      >
        Day {format(new Date(day.dt * 1000), 'd')}
      </p>
    </div>
  );
}
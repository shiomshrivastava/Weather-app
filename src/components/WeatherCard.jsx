// src/components/WeatherCard.jsx
import { Cloud, CloudRain, Sun, CloudSnow, Zap, Thermometer, Droplets, Wind, Gauge } from 'lucide-react';

const weatherIcons = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Snow: CloudSnow,
  Thunderstorm: Zap,
};

const detailIcons = {
  feels_like: Thermometer,
  humidity: Droplets,
  wind: Wind,
  pressure: Gauge,
};

export default function WeatherCard({ weather, isMain = false }) {
  const Icon = weatherIcons[weather.weather[0].main] || Cloud;
  const FeelsLikeIcon = detailIcons.feels_like;
  const HumidityIcon = detailIcons.humidity;
  const WindIcon = detailIcons.wind;
  const PressureIcon = detailIcons.pressure;

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '24px',
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.5s ease',
        cursor: 'pointer',
        maxWidth: isMain ? '600px' : 'auto',
        margin: isMain ? '0 auto' : '0'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 40px rgba(110, 133, 214, 0.4)';
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.borderColor = 'rgba(110, 133, 214, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      }}
    >
      {/* Gradient Orbs */}
      <div style={{
        position: 'absolute',
        top: '-80px',
        right: '-80px',
        width: '160px',
        height: '160px',
        background: 'rgba(110, 133, 214, 0.2)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        transition: 'background 0.5s ease'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-80px',
        left: '-80px',
        width: '160px',
        height: '160px',
        background: 'rgba(167, 139, 250, 0.2)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        transition: 'background 0.5s ease'
      }}></div>

      <div style={{ position: 'relative', zIndex: 10 }}>

        {/* City + Weather Icon */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {weather.name}
              <span style={{ fontSize: '0.875rem', fontWeight: 'normal', color: '#9ca3af' }}>
                , {weather.sys.country}
              </span>
            </h3>
          </div>
          <div style={{
            padding: '0.75rem',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Icon style={{ width: '48px', height: '48px', color: '#6e85d6', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
          </div>
        </div>

        {/* Temperature + Description */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            fontSize: '4.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, white, #6e85d6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {Math.round(weather.main.temp)}°
          </div>
          <p style={{
            fontSize: '1.125rem',
            color: '#d1d5db',
            textTransform: 'capitalize',
            marginTop: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {weather.weather[0].description}
          </p>
        </div>

        {/* Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem'
        }}>
          {[
            { label: 'Feels like', value: `${Math.round(weather.main.feels_like)}°C`, icon: FeelsLikeIcon },
            { label: 'Humidity', value: `${weather.main.humidity}%`, icon: HumidityIcon },
            { label: 'Wind', value: `${weather.wind.speed} m/s`, icon: WindIcon },
            { label: 'Pressure', value: `${weather.main.pressure} hPa`, icon: PressureIcon },
          ].map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(110, 133, 214, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <ItemIcon style={{ width: '20px', height: '20px', color: '#6e85d6' }} />
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{item.label}</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'white' }}>{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hover Hint */}
        {isMain && (
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{
              fontSize: '0.75rem',
              color: '#9ca3af',
              opacity: 0,
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = 1}
            onMouseLeave={(e) => e.target.style.opacity = 0}>
              Tap for detailed forecast
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
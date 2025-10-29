// src/pages/CityDetails.jsx
import { useParams, Link } from 'react-router-dom';
import { useWeatherStream } from '../hooks/useWeatherStream';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';

export default function CityDetails() {
  const { cityName } = useParams();
  const { weather, forecast, loading, error } = useWeatherStream(cityName);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a1a, #0f0f23, #1a1a2e)',
      padding: '1rem 1rem 2rem',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* BACK BUTTON */}
        <div style={{ marginBottom: '2rem' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              color: '#6e85d6',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(110, 133, 214, 0.6)';
              const icon = e.currentTarget.querySelector('.back-arrow');
              if (icon) icon.style.transform = 'translateX(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#6e85d6';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              const icon = e.currentTarget.querySelector('.back-arrow');
              if (icon) icon.style.transform = 'translateX(0)';
            }}
          >
            <ArrowLeft className="back-arrow" style={{ width: '20px', height: '20px', transition: 'transform 0.3s ease' }} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* LOADING */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <div style={{
              border: '4px solid #6e85d6',
              borderTop: '4px solid transparent',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div style={{ maxWidth: '800px', margin: '0 auto 3rem', textAlign: 'center' }}>
            <p style={{
              color: '#f87171',
              background: 'rgba(127, 29, 29, 0.2)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              fontSize: '1.1rem',
              fontWeight: '500'
            }}>
              {error}
            </p>
          </div>
        )}

        {/* CURRENT WEATHER - FULL WIDTH */}
        {weather && (
          <div style={{ maxWidth: '1000px', margin: '0 auto 4rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              padding: '2rem 3rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.5s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 40px rgba(110, 133, 214, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            }}>
              {/* City Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <MapPin style={{ width: '24px', height: '24px', color: '#6e85d6' }} />
                <h1 style={{
                  fontSize: '2.25rem',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  {weather.name}, {weather.sys.country}
                </h1>
              </div>

              <WeatherCard weather={weather} isMain />
            </div>
          </div>
        )}

        {/* 5-DAY EXTENDED FORECAST */}
        {forecast && (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <Calendar style={{ width: '28px', height: '28px', color: '#6e85d6' }} />
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #6e85d6, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                5-Day Extended Forecast
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem'
            }}>
              {forecast.map((day, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(110, 133, 214, 0.5)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(110, 133, 214, 0.2)';
                    const hint = e.currentTarget.querySelector('.forecast-hint');
                    if (hint) hint.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    const hint = e.currentTarget.querySelector('.forecast-hint');
                    if (hint) hint.style.opacity = '0';
                  }}
                >
                  <ForecastCard day={day} />
                  <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                    <p className="forecast-hint" style={{
                      fontSize: '0.75rem',
                      color: '#9ca3af',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }}>
                      Day {i + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div style={{
          textAlign: 'center',
          marginTop: '4rem',
          color: '#6b7280',
          fontSize: '0.875rem'
        }}>
          WeatherX • Real-time data from OpenWeatherMap
        </div>
      </div>
    </div>
  );
}
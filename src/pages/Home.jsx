// src/pages/Home.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeatherStream } from '../hooks/useWeatherStream';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import { Search, MapPin } from 'lucide-react';

export default function Home() {
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const navigate = useNavigate();

  const { weather, forecast, loading, error } = useWeatherStream(searchCity);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      setSearchCity(city);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a1a, #0f0f23, #1a1a2e)',
      padding: '1rem 1rem 2rem',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* HERO SEARCH SECTION */}
        <div style={{ maxWidth: '800px', margin: '0 auto 3rem' }}>
          <div style={{
            background: 'rgba(22, 33, 62, 0.8)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(42, 59, 95, 0.5)',
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '1.5rem',
              background: 'linear-gradient(45deg, #6e85d6, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              WeatherX
            </h1>

            <form onSubmit={handleSearch} style={{ position: 'relative' }}>
              <MapPin style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                color: '#9ca3af'
              }} />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search any city..."
                style={{
                  width: '100%',
                  padding: '16px 20px 16px 50px',
                  fontSize: '1.1rem',
                  background: 'rgba(22, 33, 62, 0.8)',
                  border: '1px solid rgba(42, 59, 95, 0.5)',
                  borderRadius: '50px',
                  color: 'white',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6e85d6';
                  e.target.style.boxShadow = '0 0 0 4px rgba(110, 133, 214, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(42, 59, 95, 0.5)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '12px',
                  background: 'linear-gradient(45deg, #6e85d6, #5a6fc7)',
                  border: 'none',
                  borderRadius: '50%',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(45deg, #5a6fc7, #4a5ab8)';
                  e.target.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(45deg, #6e85d6, #5a6fc7)';
                  e.target.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                <Search style={{ width: '20px', height: '20px' }} />
              </button>
            </form>
          </div>
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

        {/* CURRENT WEATHER CARD */}
        {weather && (
          <div style={{ maxWidth: '800px', margin: '0 auto 3rem', cursor: 'pointer' }}
               onClick={() => navigate(`/city/${weather.name}`)}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(22, 33, 62, 0.8), rgba(26, 26, 46, 0.6))',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(42, 59, 95, 0.5)',
              borderRadius: '24px',
              padding: '2rem',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.4s ease',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(110, 133, 214, 0.3)';
              e.currentTarget.style.borderColor = 'rgba(110, 133, 214, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)';
              e.currentTarget.style.borderColor = 'rgba(42, 59, 95, 0.5)';
            }}>
              <WeatherCard weather={weather} isMain />
              <p style={{
                marginTop: '1rem',
                fontSize: '0.875rem',
                color: '#9ca3af',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#6e85d6'}
              onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                Tap for detailed forecast
              </p>
            </div>
          </div>
        )}

        {/* 5-DAY FORECAST */}
        {forecast && (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '2rem',
              background: 'linear-gradient(45deg, #6e85d6, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              5-Day Forecast
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1.5rem'
            }}>
              {forecast.map((day, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(22, 33, 62, 0.6)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(42, 59, 95, 0.4)',
                    borderRadius: '16px',
                    padding: '1rem',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(22, 33, 62, 0.9)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(110, 133, 214, 0.2)';
                    e.currentTarget.style.borderColor = '#6e85d6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(22, 33, 62, 0.6)';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(42, 59, 95, 0.4)';
                  }}
                >
                  <ForecastCard day={day} />
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
          Powered by <span style={{ color: '#6e85d6', fontWeight: '600' }}>OpenWeatherMap</span>
        </div>
      </div>
    </div>
  );
}
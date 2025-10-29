import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export function useWeatherStream(city) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const [currentRes, forecastRes] = await Promise.all([
          axios.get(`${BASE_URL}/weather`, {
            params: { q: city, appid: API_KEY, units: 'metric' },
          }),
          axios.get(`${BASE_URL}/forecast`, {
            params: { q: city, appid: API_KEY, units: 'metric' },
          }),
        ]);

        setWeather(currentRes.data);

        // Group forecast by day
        const daily = {};
        forecastRes.data.list.forEach((item) => {
          const date = item.dt_txt.split(' ')[0];
          if (!daily[date]) daily[date] = [];
          daily[date].push(item);
        });

        const fiveDay = Object.values(daily)
          .map((day) => {
            const temps = day.map((d) => d.main.temp);
            const max = Math.max(...temps);
            const min = Math.min(...temps);

            // SAFE: Always return valid weather object
            const weatherItem = day.find((d) => d.weather?.[0])?.weather?.[0] || {
              main: 'Clear',
              description: 'clear sky',
              icon: '01d',
            };

            return {
              dt: day[0].dt,
              temp: { max, min },
              weather: [weatherItem], // Always array with one valid item
            };
          })
          .slice(0, 5);

        setForecast(fiveDay);
      } catch (err) {
        setError('City not found or API error');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, forecast, loading, error };
}
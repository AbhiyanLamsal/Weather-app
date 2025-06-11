import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setError('');
    setWeather(null);
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json`,
        {
          params: {
            key: apiKey,
            q: city,
            days: 5,
            aqi: 'no',
            alerts: 'no'
          }
        }
      );
      setWeather(response.data);
    } catch (err) {
      setError('Could not fetch weather. Please check the city name.');
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Weather App</h1>
      <div className="search-section">
        <input
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter city"
          className="city-input"
        />
        <button onClick={fetchWeather} className="search-btn">Get Weather</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <div className="weather-section">
          <div className="current-weather">
            <h2>{weather.location.name}, {weather.location.country}</h2>
            <h3>
              Current: {weather.current.temp_c}°C, {weather.current.condition.text}
            </h3>
          </div>
          <div className="daily-forecast">
            <h3>Daily Forecast</h3>
            <ul>
              {weather.forecast.forecastday.map(day => (
                <li key={day.date}>
                  {day.date}: {day.day.avgtemp_c}°C, {day.day.condition.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="hourly-forecast">
            <h3>Hourly Forecast (Today)</h3>
            <ul>
              {weather.forecast.forecastday[0].hour.map(hour => (
                <li key={hour.time}>
                  {hour.time.split(' ')[1]}: {hour.temp_c}°C, {hour.condition.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
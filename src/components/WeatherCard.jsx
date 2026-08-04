import React from "react";
import "../styles/WeatherCard.css";

function WeatherCard({ weather }) {
  if (!weather) return null;

  // Extraemos los datos necesarios del objeto de la API
  const { name, main, weather: weatherDetails, wind } = weather;
  const temp = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);
  const humidity = main.humidity;
  const windSpeed = Math.round(wind.speed * 3.6); // Convertir m/s a km/h
  const description = weatherDetails[0].description;
  const iconCode = weatherDetails[0].icon;

  // URL del icono oficial de OpenWeatherMap
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="weather-card">
      <h2 className="city-name">{name}</h2>
      <div className="temperature">{temp}°C</div>
      
      <div className="weather-condition">
        <img src={iconUrl} alt={description} className="weather-icon" />
        <span className="description">{description}</span>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="label">💧 Humedad</span>
          <span className="value">{humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="label">💨 Viento</span>
          <span className="value">{windSpeed} km/h</span>
        </div>
        <div className="detail-item">
          <span className="label">🌡️ Sensación</span>
          <span className="value">{feelsLike}°C</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
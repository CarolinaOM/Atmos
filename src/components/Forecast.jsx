import React from "react";
import "../styles/Forecast.css";

function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  // Filtramos la lista para obtener 1 pronóstico por día (alrededor de mediodía)
  const dailyForecasts = forecast.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", { weekday: "short" });
  };

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">Pronóstico de 5 Días</h3>
      <div className="forecast-list">
        {dailyForecasts.map((item, index) => {
          const dayName = getDayName(item.dt_txt);
          const temp = Math.round(item.main.temp);
          const iconCode = item.weather[0].icon;
          const description = item.weather[0].description;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

          return (
            <div key={index} className="forecast-item">
              <span className="forecast-day">{dayName}</span>
              <img src={iconUrl} alt={description} className="forecast-icon" />
              <span className="forecast-temp">{temp}°C</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
import React from "react";
import styles from "./Forecast.module.css";

function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  // Filtrar para obtener un pronóstico por día (aproximadamente a mediodía)
  const dailyForecasts = forecast.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", { weekday: "short" });
  };

  return (
    <div className={styles.forecastContainer}>
      <h3 className={styles.title}>Pronóstico de 5 Días</h3>
      <div className={styles.grid}>
        {dailyForecasts.map((item, index) => {
          const dayName = getDayName(item.dt_txt);
          const temp = Math.round(item.main.temp);
          const iconCode = item.weather[0]?.icon;
          const description = item.weather[0]?.description;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

          return (
            <div key={index} className={styles.card}>
              <span className={styles.day}>{dayName}</span>
              <img src={iconUrl} alt={description} className={styles.icon} />
              <span className={styles.temp}>{temp}°C</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
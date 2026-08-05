import React from "react";
import { Clock, Droplets } from "lucide-react";
import styles from "./HourlyForecast.module.css";

function HourlyForecast({ hourlyData }) {
  if (!hourlyData || hourlyData.length === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Clock size={16} className={styles.headerIcon} />
        <span className={styles.title}>Pronóstico por horas</span>
      </div>
      <div className={styles.scrollArea}>
        {hourlyData.slice(0, 12).map((item, index) => {
          const time = new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          const tempVal = item.main?.temp ?? item.temp ?? 0;
          const pop = Math.round((item.pop || 0) * 100);

          return (
            <div key={index} className={styles.card}>
              <span className={styles.time}>{time}</span>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather?.[0]?.icon}.png`}
                alt="weather"
                className={styles.icon}
              />
              <span className={styles.temp}>{Math.round(tempVal)}°C</span>
              {pop > 0 && (
                <div className={styles.pop}>
                  <Droplets size={10} />
                  <span>{pop}%</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HourlyForecast;
import React from "react";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Gauge, 
  Eye, 
  Sunrise, 
  Sunset, 
  Sun 
} from "lucide-react";
import styles from "./MainCard.module.css";

function MainCard({ data }) {
  if (!data) return null;

  const formatTime = (timestamp) => {
    if (!timestamp) return "--:--";
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getUVText = (uv) => {
    if (uv <= 2) return "Bajo";
    if (uv <= 5) return "Moderado";
    if (uv <= 7) return "Alto";
    if (uv <= 10) return "Muy Alto";
    return "Extremo";
  };

  return (
    <div className={styles.card}>
      {/* Cabecera centrada estilo Mumbai */}
      <div className={styles.hero}>
        <h2 className={styles.cityName}>{data.name}</h2>
        <div className={styles.tempRow}>
          <span className={styles.temp}>{Math.round(data.main?.temp)}°C</span>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`}
            alt={data.weather?.[0]?.description}
            className={styles.weatherIcon}
          />
        </div>
        <p className={styles.description}>{data.weather?.[0]?.description}</p>
      </div>

      <div className={styles.divider} />

      {/* Grid de 8 métricas */}
      <div className={styles.grid}>
        <div className={styles.metricBox}>
          <Thermometer className={styles.icon} size={22} />
          <div className={styles.metricInfo}>
            <span className={styles.label}>SENSACIÓN</span>
            <span className={styles.value}>{Math.round(data.main?.feels_like)}°C</span>
          </div>
        </div>

        <div className={styles.metricBox}>
          <Droplets className={styles.icon} size={22} />
          <div className={styles.metricInfo}>
            <span className={styles.label}>HUMEDAD</span>
            <span className={styles.value}>{data.main?.humidity}%</span>
          </div>
        </div>

        <div className={styles.metricBox}>
          <Wind className={styles.icon} size={22} />
          <div className={styles.metricInfo}>
            <span className={styles.label}>VIENTO</span>
            <span className={styles.value}>{Math.round(data.wind?.speed * 3.6)} km/h</span>
          </div>
        </div>

        <div className={styles.metricBox}>
          <Gauge className={styles.icon} size={22} />
          <div className={styles.metricInfo}>
            <span className={styles.label}>PRESIÓN</span>
            <span className={styles.value}>{data.main?.pressure} hPa</span>
          </div>
        </div>

        <div className={styles.metricBox}>
          <Eye className={styles.icon} size={22} />
          <div className={styles.metricInfo}>
            <span className={styles.label}>VISIBILIDAD</span>
            <span className={styles.value}>{(data.visibility / 1000).toFixed(1)} km</span>
          </div>
        </div>

        <div className={styles.metricBox}>
          <Sunrise className={styles.icon} size={22} />
          <div className={styles.metricInfo}>
            <span className={styles.label}>AMANECER</span>
            <span className={styles.value}>{formatTime(data.sys?.sunrise)}</span>
          </div>
        </div>

        <div className={styles.metricBox}>
          <Sunset className={styles.icon} size={22} />
          <div className={styles.metricInfo}>
            <span className={styles.label}>ATARDECER</span>
            <span className={styles.value}>{formatTime(data.sys?.sunset)}</span>
          </div>
        </div>

        <div className={styles.metricBox}>
          <Sun className={styles.icon} size={22} />
          <div className={styles.metricInfo}>
            <span className={styles.label}>ÍNDICE UV</span>
            <span className={styles.value}>{getUVText(data.uvi || 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainCard;
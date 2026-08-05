import React from "react";
import { motion } from "framer-motion";
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
import AnimatedNumber from "../AnimatedNumber/AnimatedNumber";
import styles from "./WeatherCard.module.css";

function WeatherCard({ weather }) {
  if (!weather) return null;

  const formatTime = (timestamp) => {
    if (!timestamp) return "--:--";
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    wind: { speed },
    weather: weatherDetails,
    sys: { sunrise, sunset },
    visibility
  } = weather;

  const visibilityKm = visibility ? `${(visibility / 1000).toFixed(1)} km` : "N/A";
  const iconCode = weatherDetails[0]?.icon;
  const description = weatherDetails[0]?.description;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.header}>
        <h2>{name}</h2>
        <div className={styles.tempContainer}>
          <h1 className={styles.temp}>
            <AnimatedNumber value={Math.round(temp)} />°C
          </h1>
          <motion.img 
            src={iconUrl} 
            alt={description} 
            className={styles.icon}
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </div>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.metricsGrid}>
        <motion.div className={styles.metricItem} whileHover={{ scale: 1.03 }}>
          <Thermometer className={styles.metricIcon} size={22} />
          <div className={styles.metricInfo}>
            <span className={styles.label}>Sensación</span>
            <span className={styles.value}>
              <AnimatedNumber value={Math.round(feels_like)} />°C
            </span>
          </div>
        </motion.div>

        <motion.div className={styles.metricItem} whileHover={{ scale: 1.03 }}>
          <Droplets className={styles.metricIcon} size={22} />
          <div className={styles.metricInfo}>
            <span className={styles.label}>Humedad</span>
            <span className={styles.value}>
              <AnimatedNumber value={humidity} />%
            </span>
          </div>
        </motion.div>

        <motion.div className={styles.metricItem} whileHover={{ scale: 1.03 }}>
          <Wind className={styles.metricIcon} size={22} />
          <div className={styles.metricInfo}>
            <span className={styles.label}>Viento</span>
            <span className={styles.value}>
              <AnimatedNumber value={Math.round(speed * 3.6)} /> km/h
            </span>
          </div>
        </motion.div>

        <motion.div className={styles.metricItem} whileHover={{ scale: 1.03 }}>
          <Gauge className={styles.metricIcon} size={22} />
          <div className={styles.metricInfo}>
            <span className={styles.label}>Presión</span>
            <span className={styles.value}>{pressure} hPa</span>
          </div>
        </motion.div>

        <motion.div className={styles.metricItem} whileHover={{ scale: 1.03 }}>
          <Eye className={styles.metricIcon} size={22} />
          <div className={styles.metricInfo}>
            <span className={styles.label}>Visibilidad</span>
            <span className={styles.value}>{visibilityKm}</span>
          </div>
        </motion.div>

        <motion.div className={styles.metricItem} whileHover={{ scale: 1.03 }}>
          <Sunrise className={styles.metricIcon} size={22} />
          <div className={styles.metricInfo}>
            <span className={styles.label}>Amanecer</span>
            <span className={styles.value}>{formatTime(sunrise)}</span>
          </div>
        </motion.div>

        <motion.div className={styles.metricItem} whileHover={{ scale: 1.03 }}>
          <Sunset className={styles.metricIcon} size={22} />
          <div className={styles.metricInfo}>
            <span className={styles.label}>Atardecer</span>
            <span className={styles.value}>{formatTime(sunset)}</span>
          </div>
        </motion.div>

        <motion.div className={styles.metricItem} whileHover={{ scale: 1.03 }}>
          <Sun className={styles.metricIcon} size={22} />
          <div className={styles.metricInfo}>
            <span className={styles.label}>Índice UV</span>
            <span className={styles.value}>{weather.uvIndex ?? "Moderado"}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default WeatherCard;
import React from "react";
import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";
import styles from "./WeatherCard.module.css";

function WeatherCard({ weather }) {
  if (!weather) return null;

  // Formatear horas de amanecer y atardecer desde timestamp Unix
  const formatTime = (timestamp) => {
    if (!timestamp) return "--:--";
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Convertir visibilidad de metros a kilómetros
  const visibilityKm = weather.visibility 
    ? (weather.visibility / 1000).toFixed(1) + " km" 
    : "N/A";

  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    wind: { speed },
    weather: weatherDetails,
    sys: { sunrise, sunset }
  } = weather;

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
      {/* Encabezado y temperatura principal */}
      <div className={styles.header}>
        <h2>{name}</h2>
        <div className={styles.tempContainer}>
          <h1 className={styles.temp}>
            <AnimatedNumber value={Math.round(temp)} />°C
          </h1>
          {/* Ícono animado flotante */}
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

      {/* Grid de Métricas Expandidas con microanimaciones hover */}
      <div className={styles.metricsGrid}>
        <motion.div 
          className={styles.metricItem}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className={styles.icon}>🌡️</span>
          <div className={styles.metricInfo}>
            <span className={styles.label}>Sensación</span>
            <span className={styles.value}>
              <AnimatedNumber value={Math.round(feels_like)} />°C
            </span>
          </div>
        </motion.div>

        <motion.div 
          className={styles.metricItem}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className={styles.icon}>💧</span>
          <div className={styles.metricInfo}>
            <span className={styles.label}>Humedad</span>
            <span className={styles.value}>
              <AnimatedNumber value={humidity} />%
            </span>
          </div>
        </motion.div>

        <motion.div 
          className={styles.metricItem}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className={styles.icon}>💨</span>
          <div className={styles.metricInfo}>
            <span className={styles.label}>Viento</span>
            <span className={styles.value}>
              <AnimatedNumber value={Math.round(speed * 3.6)} /> km/h
            </span>
          </div>
        </motion.div>

        <motion.div 
          className={styles.metricItem}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className={styles.icon}>⏲️</span>
          <div className={styles.metricInfo}>
            <span className={styles.label}>Presión</span>
            <span className={styles.value}>{pressure} hPa</span>
          </div>
        </motion.div>

        <motion.div 
          className={styles.metricItem}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className={styles.icon}>👁️</span>
          <div className={styles.metricInfo}>
            <span className={styles.label}>Visibilidad</span>
            <span className={styles.value}>{visibilityKm}</span>
          </div>
        </motion.div>

        <motion.div 
          className={styles.metricItem}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className={styles.icon}>🌅</span>
          <div className={styles.metricInfo}>
            <span className={styles.label}>Amanecer</span>
            <span className={styles.value}>{formatTime(sunrise)}</span>
          </div>
        </motion.div>

        <motion.div 
          className={styles.metricItem}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className={styles.icon}>🌇</span>
          <div className={styles.metricInfo}>
            <span className={styles.label}>Atardecer</span>
            <span className={styles.value}>{formatTime(sunset)}</span>
          </div>
        </motion.div>

        <motion.div 
          className={styles.metricItem}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className={styles.icon}>☀️</span>
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
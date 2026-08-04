import React from "react";
import styles from "./DynamicBackground.module.css";

function DynamicBackground({ weatherCode, iconCode }) {
  const getBackgroundClass = () => {
    if (!weatherCode) return styles.default;

    const isNight = iconCode?.endsWith("n");

    if (isNight && weatherCode < 200) {
      return styles.night;
    }

    if (weatherCode >= 200 && weatherCode < 300) return styles.thunderstorm;
    if (weatherCode >= 300 && weatherCode < 600) return styles.rain;
    if (weatherCode >= 600 && weatherCode < 700) return styles.snow;
    if (weatherCode === 800) return isNight ? styles.night : styles.sunny;
    if (weatherCode > 800) return isNight ? styles.night : styles.cloudy;

    return styles.default;
  };

  return <div className={`${styles.background} ${getBackgroundClass()}`} />;
}

export default DynamicBackground;
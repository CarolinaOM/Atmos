import React from "react";
import styles from "./DynamicBackground.module.css";

function DynamicBackground({ weatherCode, iconCode }) {
  const getThemeClass = () => {
    if (!weatherCode) return styles.clearDay;

    const isNight = iconCode?.endsWith("n");

    if (isNight) return styles.night;
    if (weatherCode >= 200 && weatherCode < 300) return styles.thunderstorm;
    if (weatherCode >= 300 && weatherCode < 600) return styles.rain;
    if (weatherCode >= 600 && weatherCode < 700) return styles.snow;
    if (weatherCode === 800) return styles.clearDay;
    if (weatherCode > 800) return styles.clouds;

    return styles.clearDay;
  };

  return (
    <div className={`${styles.bgContainer} ${getThemeClass()}`}>
      <div className={styles.overlay} />
    </div>
  );
}

export default DynamicBackground;
import React from "react";
import styles from "./DynamicBackground.module.css";

function DynamicBackground({ weatherCode, iconCode }) {
  const getThemeClass = () => {
    const code = Number(weatherCode);
    const isNight = iconCode?.endsWith("n");

    if (isNight) return styles.night;
    if (code >= 200 && code < 300) return styles.thunderstorm;
    if (code >= 300 && code < 600) return styles.rain;
    if (code >= 600 && code < 700) return styles.snow;
    if (code === 800) return styles.clearDay;
    if (code > 800) return styles.clouds;

    return styles.clearDay;
  };

  return (
    <div className={`${styles.bgContainer} ${getThemeClass()}`}>
      <div className={styles.overlay} />
    </div>
  );
}

export default DynamicBackground;
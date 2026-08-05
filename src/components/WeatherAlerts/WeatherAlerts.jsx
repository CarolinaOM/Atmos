import React from "react";
import { AlertTriangle } from "lucide-react";
import styles from "./WeatherAlerts.module.css";

function WeatherAlerts({ alerts }) {
  if (!alerts || alerts.length === 0) return null;

  const currentAlert = alerts[0];

  return (
    <div className={styles.alertBanner}>
      <AlertTriangle size={20} className={styles.icon} />
      <div className={styles.content}>
        <span className={styles.event}>{currentAlert.event}</span>
        <p className={styles.description}>{currentAlert.description}</p>
      </div>
    </div>
  );
}

export default WeatherAlerts;
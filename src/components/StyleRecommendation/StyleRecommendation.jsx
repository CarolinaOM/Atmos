import React from "react";
import { Shirt, Umbrella, Sun, Wind } from "lucide-react";
import styles from "./StyleRecommendation.module.css";

function StyleRecommendation({ temp, weatherCode, uvi, windSpeed }) {
  const getTips = () => {
    const tips = [];
    const isRainy = weatherCode >= 200 && weatherCode < 600;

    if (temp <= 12) {
      tips.push({ icon: Shirt, text: "Abrigo pesado o chaqueta térmica" });
    } else if (temp > 12 && temp <= 20) {
      tips.push({ icon: Shirt, text: "Chaqueta ligera o sudadera" });
    } else {
      tips.push({ icon: Shirt, text: "Ropa fresca y transpirable" });
    }

    if (isRainy) {
      tips.push({ icon: Umbrella, text: "Lleva paraguas o chubasquero" });
    }

    if (uvi >= 6) {
      tips.push({ icon: Sun, text: "Protector solar SPF 50+ y gafas" });
    }

    if (windSpeed > 25) {
      tips.push({ icon: Wind, text: "Viento fuerte, corta vientos recomendado" });
    }

    return tips;
  };

  const tips = getTips();

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Recomendación del día</h4>
      <div className={styles.grid}>
        {tips.map((tip, index) => {
          const IconComponent = tip.icon;
          return (
            <div key={index} className={styles.card}>
              <IconComponent size={20} className={styles.icon} />
              <span className={styles.text}>{tip.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StyleRecommendation;
import React from "react";
import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Cargando clima...</p>
    </div>
  );
}

export default Loading;
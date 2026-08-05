import React from "react";
import { Loader2 } from "lucide-react";
import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <Loader2 className={styles.spinner} size={36} />
      <p className={styles.text}>Cargando clima...</p>
    </div>
  );
}

export default Loading;
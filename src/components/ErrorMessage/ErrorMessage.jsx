import React from "react";
import styles from "./ErrorMessage.module.css";

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className={styles.errorCard}>
      <span className={styles.errorIcon}>⚠️</span>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
import React from "react";
import { AlertTriangle } from "lucide-react";
import styles from "./ErrorMessage.module.css";

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className={styles.errorCard}>
      <AlertTriangle size={20} className={styles.errorIcon} />
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
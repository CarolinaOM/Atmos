import React from "react";
import "../styles/ErrorMessage.css";

function ErrorMessage({ message }) {
  return (
    <div className="error-card">
      <span className="error-icon">⚠️</span>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
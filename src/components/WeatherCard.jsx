import "../styles/WeatherCard.css";

function WeatherCard() {
  return (
    <div className="weather-card">
      <h2>Madrid</h2>
      <h1>27°C</h1>
      <p className="weather-status">☀️ Soleado</p>

      {/* 🔽 NUEVO: Añadimos el contenedor de detalles del clima */}
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">💧 Humedad</span>
          <span className="detail-value">45%</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">💨 Viento</span>
          <span className="detail-value">12 km/h</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">🌡️ Sensación</span>
          <span className="detail-value">29°C</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
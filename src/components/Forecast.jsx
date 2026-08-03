import "../styles/Forecast.css";

function Forecast() {
  // Datos de prueba (mocked) para maquetar el diseño
  const days = [
    { day: "Lun", temp: "26°C", icon: "☀️" },
    { day: "Mar", temp: "24°C", icon: "⛅" },
    { day: "Mié", temp: "22°C", icon: "🌧️" },
    { day: "Jue", temp: "25°C", icon: "🌤️" },
    { day: "Vie", temp: "28°C", icon: "☀️" },
  ];

  return (
    <div className="forecast-container">
      <h3>Previsión de 5 días</h3>
      <div className="forecast-cards">
        {days.map((item, index) => (
          <div key={index} className="forecast-item">
            <span className="forecast-day">{item.day}</span>
            <span className="forecast-icon">{item.icon}</span>
            <span className="forecast-temp">{item.temp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
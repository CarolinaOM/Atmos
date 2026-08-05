import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./WeatherMap.module.css";

// Arreglo para corregir los íconos por defecto de Leaflet en React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Componente auxiliar para re-centrar el mapa cuando cambian las coordenadas
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 9);
  }, [center, map]);
  return null;
}

function WeatherMap({ lat, lon, cityName }) {
  const [layer, setLayer] = useState("rain"); // 'rain' o 'clouds'
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  if (!lat || !lon) return null;

  const position = [lat, lon];
  const weatherTileUrl = `https://tile.openweathermap.org/map/${layer}_new/{z}/{x}/{y}.png?appid=${API_KEY}`;

  return (
    <div className={styles.mapCard}>
      <div className={styles.mapHeader}>
        <h3>🗺️ Ubicación y Capas</h3>
        <div className={styles.controls}>
          <button
            className={`${styles.layerBtn} ${layer === "rain" ? styles.active : ""}`}
            onClick={() => setLayer("rain")}
          >
            🌧️ Lluvia
          </button>
          <button
            className={`${styles.layerBtn} ${layer === "clouds" ? styles.active : ""}`}
            onClick={() => setLayer("clouds")}
          >
            ☁️ Nubes
          </button>
        </div>
      </div>

      <div className={styles.mapContainer}>
        <MapContainer center={position} zoom={9} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
          <ChangeView center={position} />
          {/* Capa base en modo oscuro para adaptarse al estilo Glassmorphism */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          {/* Capa meteorológica superior de OpenWeather */}
          <TileLayer url={weatherTileUrl} opacity={0.7} />
          <Marker position={position}>
            <Popup>📍 {cityName}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default WeatherMap;
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Map, CloudRain, Cloud, Thermometer, Wind, MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./WeatherMap.module.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 9);
  }, [center, map]);
  return null;
}

function WeatherMap({ lat, lon, cityName }) {
  const [layer, setLayer] = useState("rain_new");
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  if (!lat || !lon) return null;

  const position = [lat, lon];
  const weatherTileUrl = `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${API_KEY}`;

  const layers = [
    { id: "rain_new", label: "Lluvia", icon: CloudRain },
    { id: "clouds_new", label: "Nubes", icon: Cloud },
    { id: "temp_new", label: "Temperatura", icon: Thermometer },
    { id: "wind_new", label: "Viento", icon: Wind }
  ];

  return (
    <div className={styles.mapCard}>
      <div className={styles.mapHeader}>
        <div className={styles.titleWrapper}>
          <Map size={20} className={styles.headerIcon} />
          <h3>Mapa meteorológico</h3>
        </div>
        <div className={styles.controls}>
          {layers.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                className={`${styles.layerBtn} ${layer === item.id ? styles.active : ""}`}
                onClick={() => setLayer(item.id)}
              >
                <IconComponent size={14} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.mapContainer}>
        <MapContainer center={position} zoom={9} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
          <ChangeView center={position} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <TileLayer url={weatherTileUrl} opacity={0.7} />
          <Marker position={position}>
            <Popup>
              <div className={styles.popupContent}>
                <MapPin size={14} />
                <span>{cityName}</span>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default WeatherMap;
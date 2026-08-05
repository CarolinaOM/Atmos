import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./WeatherMap.module.css";

const customIcon = L.divIcon({
  className: "custom-map-pin",
  html: `<div style="color: #60a5fa; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); display: flex;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-10a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function WeatherMap({ lat, lon, cityName }) {
  if (!lat || !lon) return null;

  return (
    <div className={styles.mapCard}>
      <div className={styles.header}>
        <MapPin size={18} className={styles.headerIcon} />
        <h3 className={styles.title}>Ubicación</h3>
      </div>
      <div className={styles.mapContainer}>
        <MapContainer
          center={[lat, lon]}
          zoom={10}
          scrollWheelZoom={false}
          className={styles.leafletContainer}
          key={`${lat}-${lon}`}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <Marker position={[lat, lon]} icon={customIcon}>
            <Popup>{cityName}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default WeatherMap;
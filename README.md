# 🌤️ Atmos | Aplicación Web del Clima

Atmos es una aplicación meteorológica en tiempo real que construí con React y Vite. La app consume la API de OpenWeatherMap para mostrar información del tiempo de forma visual e intuitiva, cambiando dinámicamente los fondos y efectos según el clima de cada ciudad.

---

## 🌐 Demo 

- **Sitio Web:** [VER APLICACIÓN EN NETLIFY](https://atmos-weather-app-ts.netlify.app/)

---

## 🎯 Sobre el Proyecto

Creé este proyecto con la idea de ofrecer una experiencia limpia y visualmente atractiva para consultar el clima. En lugar de mostrar solo números, Atmos adapta toda la interfaz (fondos, iconos y tarjetas) al estado meteorológico actual de la ubicación seleccionada.

---

## ✨ Qué puede hacer la aplicación

- **Datos meteorológicos en vivo:** Muestra la temperatura actual, sensación térmica, porcentaje de humedad, presión, visibilidad, velocidad del viento e índice UV.
- **Pronóstico extendido:** Incluye un desglose detallado por horas y el pronóstico para los próximos 5 días.
- **Mapa interactivo:** Integra mapas con Leaflet para ubicar la ciudad de forma visual.
- **Geolocalización:** Detecta la ubicación del usuario si concede permisos (con carga por defecto en Tenerife si la rechaza).
- **Diseño adaptativo:** Tarjetas con efecto *glassmorphism* y respuestas visuales inmediatas en dispositivos móviles y de escritorio.
- **Recomendaciones del día:** Sugerencias automáticas de ropa según la temperatura y las condiciones del día.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React + Vite
- **Estilos:** CSS Modules
- **Iconos:** Lucide React
- **Mapas:** React Leaflet / Leaflet
- **API:** OpenWeatherMap API

---

## 💻 Instalación y Uso Local

Si quieres probar el proyecto en tu máquina local:

1. **Clona el repositorio:**
   ```bash
   git clone [https://github.com/TU_USUARIO/atmos.git](https://github.com/TU_USUARIO/atmos.git)
   cd atmos
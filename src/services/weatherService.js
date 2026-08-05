const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

// Obtener el clima actual de una ciudad
export const getWeatherByCity = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`
    );

    if (!response.ok) {
      throw new Error("Ciudad no encontrada");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el clima:", error);
    throw error;
  }
};

// Obtener la previsión de 5 días de una ciudad
export const getForecastByCity = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`
    );

    if (!response.ok) {
      throw new Error("Previsión no disponible");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la previsión:", error);
    throw error;
  }
};

// Obtener clima por coordenadas (GPS)
export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
    );
    if (!response.ok) throw new Error("No se pudo obtener el clima de tu ubicación");
    return await response.json();
  } catch (error) {
    console.error("Error al obtener clima por coordenadas:", error);
    throw error;
  }
};

// Obtener previsión por coordenadas (GPS)
export const getForecastByCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
    );
    if (!response.ok) throw new Error("No se pudo obtener la previsión de tu ubicación");
    return await response.json();
  } catch (error) {
    console.error("Error al obtener previsión por coordenadas:", error);
    throw error;
  }
};

// Obtener sugerencias de ciudades para autocompletado
export const getCitySuggestions = async (query) => {
  if (!query || query.trim().length < 3) return [];

  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );

    if (!response.ok) return [];

    const data = await response.json();

    return data.map((item) => ({
      name: item.name,
      country: item.country,
      state: item.state ? `, ${item.state}` : "",
      fullLabel: `${item.name}${item.state ? `, ${item.state}` : ""}, ${item.country}`
    }));
  } catch (error) {
    console.error("Error al obtener sugerencias:", error);
    return [];
  }
};
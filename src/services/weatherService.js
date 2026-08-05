const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

export const getWeatherByCity = async (city) => {
  try {
    const res = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`
    );
    if (!res.ok) throw new Error("City not found");
    return await res.json();
  } catch (error) {
    console.error("getWeatherByCity error:", error);
    throw error;
  }
};

export const getForecastByCity = async (city) => {
  try {
    const res = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`
    );
    if (!res.ok) throw new Error("Forecast unavailable");
    return await res.json();
  } catch (error) {
    console.error("getForecastByCity error:", error);
    throw error;
  }
};

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const res = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
    );
    if (!res.ok) throw new Error("Location weather error");
    return await res.json();
  } catch (error) {
    console.error("getWeatherByCoords error:", error);
    throw error;
  }
};

export const getForecastByCoords = async (lat, lon) => {
  try {
    const res = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
    );
    if (!res.ok) throw new Error("Location forecast error");
    return await res.json();
  } catch (error) {
    console.error("getForecastByCoords error:", error);
    throw error;
  }
};

export const getCitySuggestions = async (query) => {
  if (!query || query.trim().length < 3) return [];

  try {
    const res = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );
    if (!res.ok) return [];

    const data = await res.json();
    return data.map((item) => ({
      name: item.name,
      country: item.country,
      state: item.state ? `, ${item.state}` : "",
      fullLabel: `${item.name}${item.state ? `, ${item.state}` : ""}, ${item.country}`
    }));
  } catch (error) {
    console.error("getCitySuggestions error:", error);
    return [];
  }
};
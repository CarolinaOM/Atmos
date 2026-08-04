import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import { 
  getWeatherByCity, 
  getForecastByCity, 
  getWeatherByCoords, 
  getForecastByCoords 
} from "./services/weatherService";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (searchCity) => {
    setLoading(true);
    setError(null);
    try {
      const weather = await getWeatherByCity(searchCity);
      const forecast = await getForecastByCity(searchCity);
      setWeatherData(weather);
      setForecastData(forecast.list);
    } catch (err) {
      setError("No encontramos esa ciudad. Por favor verifica el nombre e intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const weather = await getWeatherByCoords(lat, lon);
      const forecast = await getForecastByCoords(lat, lon);
      setWeatherData(weather);
      setForecastData(forecast.list);
    } catch (err) {
      fetchWeather("Madrid"); // Si falla por coordenadas, carga una ciudad por defecto
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        () => {
          // Si el usuario deniega el permiso de ubicación, carga Madrid
          fetchWeather("Madrid");
        }
      );
    } else {
      fetchWeather("Madrid");
    }
  }, []);

  return (
    <div className="app">
      <Header />
      <SearchBar onSearch={fetchWeather} />

      {loading && <Loading />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && weatherData && (
        <>
          <WeatherCard weather={weatherData} />
          <Forecast forecast={forecastData} />
        </>
      )}
    </div>
  );
}

export default App;
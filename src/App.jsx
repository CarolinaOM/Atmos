import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import Forecast from "./components/Forecast/Forecast";
import Loading from "./components/Loading/Loading";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import DynamicBackground from "./components/DynamicBackground/DynamicBackground";
import WeatherMap from "./components/WeatherMap/WeatherMap";

import { 
  getWeatherByCity, 
  getForecastByCity, 
  getWeatherByCoords, 
  getForecastByCoords 
} from "./services/weatherService";

const DEFAULT_CITY = "Madrid";

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
      setError("No pudimos obtener los datos de esa ubicación.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const weather = await getWeatherByCoords(lat, lon);
      const forecast = await getForecastByCoords(lat, lon);

      setWeatherData(weather);
      setForecastData(forecast.list);
    } catch (err) {
      fetchWeather(DEFAULT_CITY);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => fetchWeatherByLocation(coords.latitude, coords.longitude),
        () => fetchWeather(DEFAULT_CITY)
      );
    } else {
      fetchWeather(DEFAULT_CITY);
    }
  }, []);

  return (
    <>
      <DynamicBackground 
        weatherCode={weatherData?.weather[0]?.id} 
        iconCode={weatherData?.weather[0]?.icon} 
      />

      <div className="app">
        <Header />
        <SearchBar onSearch={fetchWeather} />

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && weatherData && (
          <>
            <WeatherCard weather={weatherData} />
            <WeatherMap 
              lat={weatherData.coord?.lat} 
              lon={weatherData.coord?.lon} 
              cityName={weatherData.name} 
            />
            <Forecast forecast={forecastData} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
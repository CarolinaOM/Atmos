import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import Loading from "./components/Loading/Loading";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import MainCard from "./components/MainCard/MainCard";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import StyleRecommendation from "./components/StyleRecommendation/StyleRecommendation";
import WeatherMap from "./components/WeatherMap/WeatherMap";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import WeatherAlerts from "./components/WeatherAlerts/WeatherAlerts";
import DynamicBackground from "./components/DynamicBackground/DynamicBackground";
import WeatherEffects from "./components/WeatherEffects/WeatherEffects";

function App() {
  const [data, setData] = useState(null);
  const [forecastList, setForecastList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchByUrl = async (currentUrl, forecastUrl) => {
    setLoading(true);
    setError(null);
    try {
      const resCurrent = await fetch(currentUrl);
      if (!resCurrent.ok) throw new Error("Ciudad no encontrada");
      const currentData = await resCurrent.json();

      const resForecast = await fetch(forecastUrl);
      const forecastData = await resForecast.json();

      setData(currentData);
      setForecastList(forecastData.list || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    if (!city) return;
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=es&appid=${API_KEY}`;
    fetchByUrl(currentUrl, forecastUrl);
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalización");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${API_KEY}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${API_KEY}`;
        fetchByUrl(currentUrl, forecastUrl);
      },
      () => {
        setError("Permiso de ubicación denegado");
      }
    );
  };

  // Ciudad por defecto: Tenerife
  useEffect(() => {
    handleSearch("Tenerife");
  }, []);

  const weatherCode = data?.weather?.[0]?.id;

  return (
    <div className="app">
      <WeatherEffects weatherCode={weatherCode} />
      <DynamicBackground weatherCode={weatherCode} iconCode={data?.weather?.[0]?.icon} />

      <Header />
      <SearchBar onSearch={handleSearch} onGeolocate={handleGeolocate} />

      {data?.alerts && <WeatherAlerts alerts={data.alerts} />}
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {data && (
        <main className="main-content">
          <MainCard data={data} />
          <HourlyForecast hourlyData={forecastList} />
          <StyleRecommendation
            temp={data.main?.temp}
            weatherCode={weatherCode}
            uvi={data.uvi || 0}
            windSpeed={data.wind?.speed}
          />
          <WeatherMap
            lat={data.coord?.lat}
            lon={data.coord?.lon}
            cityName={data.name}
          />
          <DailyForecast forecast={forecastList} />
        </main>
      )}
    </div>
  );
}

export default App;
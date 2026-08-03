import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";

function App() {
  return (
    <div className="app">
      <Header />
      <SearchBar />
      <WeatherCard />
      <Forecast /> 
    </div>
  );
}

export default App;
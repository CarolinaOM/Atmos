import { useState, useEffect, useRef } from "react";
import { getCitySuggestions } from "../../services/weatherService";
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  // Buscar sugerencias cuando el usuario escribe (con debounce de 300ms)
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (city.trim().length >= 3) {
        const results = await getCitySuggestions(city);
        setSuggestions(results || []);
        setShowDropdown((results || []).length > 0);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [city]);

  // Cerrar el desplegable al hacer clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      onSearch(city);
      setShowDropdown(false);
    }
  };

  const handleSelectCity = (selectedCity) => {
    setCity(selectedCity);
    onSearch(selectedCity);
    setShowDropdown(false);
  };

  return (
    <div className={styles.searchContainer} ref={containerRef}>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="🌍 Buscar cualquier ciudad..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          🔍
        </button>
      </form>

      {/* Lista desplegable de autocompletado */}
      {showDropdown && (
        <ul className={styles.dropdown}>
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelectCity(item.fullLabel)}
              className={styles.dropdownItem}
            >
              📍 {item.fullLabel}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
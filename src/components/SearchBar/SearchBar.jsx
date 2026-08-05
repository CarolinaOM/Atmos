import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Globe } from "lucide-react";
import { getCitySuggestions } from "../../services/weatherService";
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (city.trim().length >= 3) {
        const results = await getCitySuggestions(city);
        setSuggestions(results || []);
        setShowDropdown(Boolean(results?.length));
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [city]);

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
    if (city.trim()) {
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
        <div className={styles.inputWrapper}>
          <Globe size={18} className={styles.globeIcon} />
          <input
            type="text"
            placeholder="Buscar cualquier ciudad..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            className={styles.searchInput}
          />
        </div>
        <button type="submit" className={styles.searchButton} aria-label="Buscar">
          <Search size={18} />
        </button>
      </form>

      {showDropdown && (
        <ul className={styles.dropdown}>
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelectCity(item.fullLabel)}
              className={styles.dropdownItem}
            >
              <MapPin size={16} className={styles.pinIcon} />
              <span>{item.fullLabel}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
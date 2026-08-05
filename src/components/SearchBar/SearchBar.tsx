import React, { useState, useEffect, useRef } from "react";
import { Search, LocateFixed, History, X, Globe } from "lucide-react";
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch, onGeolocate, history = [], onSelectHistory, onClearHistory }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const cleanCityName = (rawName) => {
    return rawName
      .replace(/parroquia\s+/gi, "")
      .replace(/\s+parroquia/gi, "")
      .replace(/municipio\s+/gi, "")
      .replace(/\s+municipio/gi, "")
      .trim();
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 2) {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&featuretype=city&limit=5&addressdetails=1`
          );
          const data = await res.json();
          
          const formattedSuggestions = data.map((item) => {
            const rawCity = item.address.city || item.address.town || item.address.village || item.display_name.split(",")[0];
            const cleanCity = cleanCityName(rawCity);
            const country = item.address.country || "";
            return {
              displayName: country ? `${cleanCity}, ${country}` : cleanCity,
              searchTerm: cleanCity
            };
          });

          const uniqueSuggestions = formattedSuggestions.filter(
            (v, i, a) => a.findIndex(t => t.displayName === v.displayName) === i
          );

          setSuggestions(uniqueSuggestions);
          setShowDropdown(true);
        } catch (err) {
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const cleanTerm = cleanCityName(query);
      onSearch(cleanTerm);
      setQuery("");
      setShowDropdown(false);
    }
  };

  const handleSelectSuggestion = (item) => {
    onSearch(item.searchTerm);
    setQuery("");
    setShowDropdown(false);
  };

  const handleSelectHistory = (city) => {
    onSelectHistory(cleanCityName(city));
    setShowDropdown(false);
  };

  return (
    <div className={styles.searchWrapper} ref={dropdownRef}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.inputContainer}>
          <Globe size={18} className={styles.globeIcon} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            placeholder="Buscar ciudad en el mundo..."
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchSubmitBtn} title="Buscar">
            <Search size={16} />
          </button>
        </div>

        <button
          type="button"
          onClick={onGeolocate}
          className={styles.geoButton}
          title="Usar mi ubicación"
        >
          <LocateFixed size={18} />
        </button>
      </form>

      {showDropdown && (suggestions.length > 0 || (query.length <= 2 && history.length > 0)) && (
        <div className={styles.dropdown}>
          {suggestions.length > 0 ? (
            <ul className={styles.list}>
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectSuggestion(item)}
                  className={styles.item}
                >
                  <Globe size={14} className={styles.itemIcon} />
                  <span>{item.displayName}</span>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <div className={styles.dropdownHeader}>
                <span>Búsquedas recientes</span>
                <button type="button" onClick={onClearHistory} className={styles.clearBtn}>
                  <X size={12} /> Limpiar
                </button>
              </div>
              <ul className={styles.list}>
                {history.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectHistory(item)}
                    className={styles.item}
                  >
                    <History size={14} className={styles.itemIcon} />
                    <span>{cleanCityName(item)}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
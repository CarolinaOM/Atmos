import React, { useState } from "react";
import "../styles/SearchBar.css";

function SearchBar({ onSearch }) {
  const [cityInput, setCityInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario
    if (cityInput.trim() !== "") {
      onSearch(cityInput.trim());
      setCityInput(""); // Limpia el campo de texto tras la búsqueda
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar ciudad..."
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        🔍
      </button>
    </form>
  );
}

export default SearchBar;
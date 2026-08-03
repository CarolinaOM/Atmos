import "../styles/SearchBar.css";

function SearchBar() {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Buscar ciudad..."
      />

      <button className="search-button">
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
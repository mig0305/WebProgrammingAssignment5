import { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');
  const [validationError, setValidationError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setValidationError('Type a city name first.');
      return;
    }
    setValidationError('');
    onSearch(trimmedQuery);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="city-search">Look up a city:</label>
      <div className="searchbar">
        <input
          id="city-search"
          type="search"
          placeholder="Search a city..."
          value={query}
          onChange={event => {
            setQuery(event.target.value);
            setValidationError('');
          }}
          disabled={loading}
          aria-invalid={Boolean(validationError)}
          aria-describedby={validationError ? 'search-error' : undefined}
        />
        <button type="submit" disabled={loading}>🔍</button>
      </div>
      {validationError && <p id="search-error" className="validation-error" role="alert">{validationError}</p>}
    </form>
  );
}

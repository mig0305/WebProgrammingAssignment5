import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import UnitToggle from './components/UnitToggle';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { getCity, getWeatherData, friendlyError } from './services/weatherApi';
import './App.css';

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState('');
  const [unit, setUnit] = useState('C');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    if (!city) return;
    let ignore = false;

    async function loadWeather() {
      setStatus('loading');
      setError('');
      try {
        const location = await getCity(city);
        if (ignore) return;
        const data = await getWeatherData(location.latitude, location.longitude);
        if (ignore) return;
        setCityName([location.name, location.country].filter(Boolean).join(', '));
        setWeatherData(data);
        setStatus('success');
      } catch (err) {
        if (ignore) return;
        setError(friendlyError(err));
        setStatus('error');
      }
    }

    loadWeather();
    return () => { ignore = true; };
  }, [city, requestCount]);

  function handleSearch(query) {
    setCity(query);
    setRequestCount(count => count + 1);
  }

  function handleRetry() {
    setRequestCount(count => count + 1);
  }

  return (
    <div className="app">
      <header>
        <h1>WeatherForecast</h1>
        <p className="subtitle">Current weather & seven-day outlook</p>
      </header>
      <div className="controls">
        <SearchBar onSearch={handleSearch} loading={status === 'loading'} />
        <UnitToggle unit={unit} onUnitChange={setUnit} />
      </div>
      <main aria-busy={status === 'loading'}>
        {status === 'idle' && <p className="status">Search for a city to get started.</p>}
        {status === 'loading' && <LoadingSpinner />}
        {status === 'error' && <ErrorMessage message={error} onRetry={handleRetry} />}
        {status === 'success' && weatherData && (
          <>
            <WeatherCard cityName={cityName} current={weatherData.current} unit={unit} />
            <Forecast daily={weatherData.daily} unit={unit} />
          </>
        )}
      </main>
      <footer>
        Weather data by <a href="https://open-meteo.com/">Open-Meteo</a>
      </footer>
    </div>
  );
}

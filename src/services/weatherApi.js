const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WX_URL = 'https://api.open-meteo.com/v1/forecast';

async function getJSON(url) {
  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error('network');
  }
  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export function friendlyError(error) {
  if (error.message === 'network') return "Couldn't reach the server. Check your internet connection.";
  if (error.message === 'not-found') return "We couldn't find that city. Check the spelling and try again.";
  if (error.status === 429) return 'Too many searches. Wait a moment and try again.';
  if (error.status >= 500) return 'The weather service is having problems. Try again later.';
  return 'Something went wrong. Please try again.';
}

export async function getCity(query) {
  const params = new URLSearchParams({ name: query, count: 1 });
  const geo = await getJSON(`${GEO_URL}?${params}`);
  if (!geo.results?.length) throw new Error('not-found');
  return geo.results[0];
}

export async function getWeatherData(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    timezone: 'auto',
    forecast_days: 7,
  });
  return getJSON(`${WX_URL}?${params}`);
}

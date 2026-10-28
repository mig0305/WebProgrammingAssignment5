export function getWeather(code) {
  if (code === 0) return { label: 'Clear sky', icon: '☀️' };
  if (code === 1 || code === 2) return { label: 'Partly cloudy', icon: '🌤️' };
  if (code === 3) return { label: 'Overcast', icon: '☁️' };
  if (code === 45 || code === 48) return { label: 'Fog', icon: '🌫️' };
  if (code >= 51 && code <= 67) return { label: 'Rain', icon: '🌧️' };
  if (code >= 71 && code <= 77) return { label: 'Snow', icon: '❄️' };
  if (code >= 80 && code <= 82) return { label: 'Rain showers', icon: '🌧️' };
  if (code >= 85 && code <= 86) return { label: 'Snow showers', icon: '🌨️' };
  if (code >= 95) return { label: 'Thunderstorm', icon: '⛈️' };
  return { label: 'Unknown', icon: '❓' };
}

export function convertTemp(celsius, unit) {
  if (unit === 'F') return Math.round(celsius * 9 / 5 + 32);
  return Math.round(celsius);
}

export function formatWind(kmh, unit) {
  if (unit === 'F') return `${Math.round(kmh * 0.621371)} mph`;
  return `${Math.round(kmh)} km/h`;
}

export function getDateLabel(dateString, index) {
  if (index === 0) return 'Today';
  // Local noon avoids a UTC date-only string shifting to the previous weekday.
  return new Date(`${dateString}T12:00:00`).toLocaleDateString('en', { weekday: 'short' });
}

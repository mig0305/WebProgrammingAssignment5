import { getWeather, convertTemp, getDateLabel } from '../utils/weatherHelpers';

export default function ForecastDay({ date, index, code, high, low, unit }) {
  const weather = getWeather(code);
  return (
    <li className="forecast-day">
      <time dateTime={date}>{getDateLabel(date, index)}</time>
      <span role="img" aria-label={weather.label}>{weather.icon}</span>
      <span aria-label={`High ${convertTemp(high, unit)} degrees ${unit}`}>
        {convertTemp(high, unit)}°{unit}
      </span>
      <span aria-hidden="true">🌙</span>
      <span aria-label={`Low ${convertTemp(low, unit)} degrees ${unit}`}>
        {convertTemp(low, unit)}°{unit}
      </span>
    </li>
  );
}

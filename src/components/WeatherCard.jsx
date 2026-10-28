import { getWeather, convertTemp, formatWind } from '../utils/weatherHelpers';

export default function WeatherCard({ cityName, current, unit }) {
  const weather = getWeather(current.weather_code);

  return (
    <section className="chosen" aria-labelledby="city-name">
      <h2 id="city-name" className="cityname">{cityName}</h2>
      <p className="current-temp">{convertTemp(current.temperature_2m, unit)}°{unit}</p>
      <span className="now">Right now</span>
      <p className="current-condition">
        <span aria-hidden="true">{weather.icon} </span>{weather.label}
      </p>
      <dl className="details">
        <div><dt>Feels like</dt><dd>{convertTemp(current.apparent_temperature, unit)}°{unit}</dd></div>
        <div><dt>Humidity</dt><dd>{current.relative_humidity_2m}%</dd></div>
        <div><dt>Wind</dt><dd>{formatWind(current.wind_speed_10m, unit)}</dd></div>
      </dl>
    </section>
  );
}

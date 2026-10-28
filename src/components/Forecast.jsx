import ForecastDay from './ForecastDay';

export default function Forecast({ daily, unit }) {
  return (
    <section className="weekforecast" aria-labelledby="forecast-title">
      <h2 id="forecast-title">📅 7-day Forecast</h2>
      <ul className="forecast-list">
        {daily.time.map((date, index) => (
          <ForecastDay
            key={date}
            date={date}
            index={index}
            code={daily.weather_code[index]}
            high={daily.temperature_2m_max[index]}
            low={daily.temperature_2m_min[index]}
            unit={unit}
          />
        ))}
      </ul>
    </section>
  );
}

export default function UnitToggle({ unit, onUnitChange }) {
  return (
    <fieldset className="unit-toggle">
      <legend>Temperature unit:</legend>
      <label>
        <input type="radio" name="unit" value="C" checked={unit === 'C'}
          onChange={event => onUnitChange(event.target.value)} />
        Celsius (°C)
      </label>
      <label>
        <input type="radio" name="unit" value="F" checked={unit === 'F'}
          onChange={event => onUnitChange(event.target.value)} />
        Fahrenheit (°F)
      </label>
    </fieldset>
  );
}

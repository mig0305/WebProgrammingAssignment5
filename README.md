# WeatherForecast - Assignment 5

A React rebuild of the Assignment 4 Weather Dashboard, scaffolded with Vite's JavaScript React template. Uses functional components, `useState`, `useEffect`, props, controlled form inputs, conditional rendering, and list rendering with keys.

## Install and run

Use Node.js 22.12+ (or a supported newer version) and npm. Internet access is needed to install dependencies and retrieve weather data.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally http://localhost:5173. Run these commands inside the `weather-react` folder, where `package.json` is located. Do not open `index.html` directly.

Other commands:

```bash
npm run build
npm run lint
npm run preview
```

`preview` serves a previously generated production build locally.

## Features preserved from Assignment 4

- City-name search using Open-Meteo geocoding.
- Current temperature, weather description/icon, feels-like temperature, humidity, and wind.
- Seven-day forecast with daily high and low temperatures.
- Celsius and km/h, or Fahrenheit and mph, converted locally without a new request.
- Loading feedback, empty-input validation, friendly errors, and retry.
- Responsive layout, labeled controls, keyboard focus, and status announcements.

## Components and data flow

| Component | Responsibility |
| --- | --- |
| App | Shared state, data-fetching effect, screen selection |
| SearchBar | Local controlled search input, validation, submit callback |
| UnitToggle | Controlled radio inputs; reports the selected unit to App |
| WeatherCard | Current conditions from props |
| Forecast | Maps the daily data into a list |
| ForecastDay | One forecast row; uses a date as its stable key |
| LoadingSpinner | Loading feedback |
| ErrorMessage | Error text and retry callback |

Each component is in its own `.jsx` file. API functions and display helpers are ordinary JavaScript modules, not components.

App passes data to its direct children. Forecast passes individual daily values and the unit to ForecastDay. The maximum prop depth is two edges: App -> Forecast -> ForecastDay. No context or state library is needed.

## State and effect

SearchBar owns `query` and `validationError`, because those values concern only the form. App owns the submitted `city`, `weatherData`, `cityName`, `unit`, `status`, `error`, and `requestCount`. Shared weather and units are lifted to App so both the current-weather and forecast views use the same data.

The effect depends on `[city, requestCount]`. It skips the initial empty city. Submitting a valid city updates the city and increments the request counter. Retry increments the same counter, so repeating the same city still runs the effect. Typing does not fetch. Changing the unit does not fetch: temperatures are calculated from the stored Celsius values during rendering.

An inner async function performs geocoding, then the forecast request. HTTP failures are checked with `response.ok`; errors are caught and shown. The effect's cleanup sets an `ignore` flag so an obsolete request cannot update state after cleanup. Cleanup does not cancel the underlying HTTP request.

The JSX conditionally renders idle, loading, error, or success. The success components receive data only after both requests succeed. React owns all DOM rendering; there are no `querySelector`, `createElement`, or manual event listeners.

## API

- Geocoding: https://geocoding-api.open-meteo.com/v1/search
- Forecast: https://api.open-meteo.com/v1/forecast
- Documentation and attribution: https://open-meteo.com/

No API key or `.env` file is required for these public endpoints. The first geocoding match is used, as in Assignment 4. Network access and API availability are required for live results.


## Manual verification

1. Start from a clean extracted folder: `npm install`, then `npm run dev`.
2. On first open, verify the search prompt and no uncaught errors.
3. Submit an empty or spaces-only city: verify the validation message.
4. Search Beirut: verify loading, city/country, current details, and seven forecast rows.
5. Switch to Fahrenheit, then Celsius: verify current, feels-like, forecast, and wind units change. No weather fetch should occur for a unit change.
6. Submit the same city again: verify it loads again.
7. Search an unlikely name such as `zzzzzzzz`: verify a friendly not-found error.
8. Use Try again: verify a new loading attempt. Search a valid city to recover.
9. Disable your network and submit a city: verify a friendly network error. Restore the connection and retry.
10. Resize to a phone width: verify there is no horizontal overflow and all controls work.
11. Run `npm run build` and `npm run lint`.

## Submission

Submit BOTH a GitHub repository link and a ZIP of the project folder, excluding `node_modules`. Include `src`, `index.html`, `package.json`, `package-lock.json`, `vite.config.js`, the generated lint configuration, `.gitignore`, and this README. Generated `dist` and `.git` do not need to be in the ZIP.

If you use GitHub's website, create a repository, upload the source files (not just the ZIP), and copy its URL into your submission. Keep `.gitignore` so dependencies are excluded. No repository has been created automatically for you.

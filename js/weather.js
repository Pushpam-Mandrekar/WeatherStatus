/**
 * weather.js
 * Talks to Open-Meteo's forecast API and normalizes the response into a
 * flat shape the rest of the app (UI + recommendation engine) can rely on.
 * No API key required.
 */

(function () {
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

const WEATHER_CODES = {
  0: { label: 'Clear sky', icon: '☀️' },
  1: { label: 'Mainly clear', icon: '🌤️' },
  2: { label: 'Partly cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Fog', icon: '🌫️' },
  48: { label: 'Depositing rime fog', icon: '🌫️' },
  51: { label: 'Light drizzle', icon: '🌦️' },
  53: { label: 'Moderate drizzle', icon: '🌦️' },
  55: { label: 'Dense drizzle', icon: '🌧️' },
  56: { label: 'Light freezing drizzle', icon: '🌧️' },
  57: { label: 'Dense freezing drizzle', icon: '🌧️' },
  61: { label: 'Slight rain', icon: '🌧️' },
  63: { label: 'Moderate rain', icon: '🌧️' },
  65: { label: 'Heavy rain', icon: '🌧️' },
  66: { label: 'Light freezing rain', icon: '🌧️' },
  67: { label: 'Heavy freezing rain', icon: '🌧️' },
  71: { label: 'Slight snow fall', icon: '🌨️' },
  73: { label: 'Moderate snow fall', icon: '🌨️' },
  75: { label: 'Heavy snow fall', icon: '❄️' },
  77: { label: 'Snow grains', icon: '❄️' },
  80: { label: 'Slight rain showers', icon: '🌦️' },
  81: { label: 'Moderate rain showers', icon: '🌧️' },
  82: { label: 'Violent rain showers', icon: '⛈️' },
  85: { label: 'Slight snow showers', icon: '🌨️' },
  86: { label: 'Heavy snow showers', icon: '❄️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
  96: { label: 'Thunderstorm with hail', icon: '⛈️' },
  99: { label: 'Thunderstorm with heavy hail', icon: '⛈️' },
};

function describeWeatherCode(code) {
  return WEATHER_CODES[code] || { label: 'Unknown', icon: '🌡️' };
}

function windDirectionLabel(degrees) {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return dirs[index];
}

const CURRENT_PARAMS = [
  'temperature_2m',
  'relative_humidity_2m',
  'apparent_temperature',
  'is_day',
  'precipitation',
  'weather_code',
  'cloud_cover',
  'wind_speed_10m',
  'wind_direction_10m',
  'pressure_msl',
].join(',');

const HOURLY_PARAMS = [
  'temperature_2m',
  'apparent_temperature',
  'relative_humidity_2m',
  'precipitation_probability',
  'precipitation',
  'weather_code',
  'cloud_cover',
  'visibility',
  'wind_speed_10m',
  'wind_direction_10m',
  'uv_index',
  'is_day',
  'pressure_msl',
].join(',');

const DAILY_PARAMS = [
  'weather_code',
  'temperature_2m_max',
  'temperature_2m_min',
  'sunrise',
  'sunset',
  'uv_index_max',
  'precipitation_probability_max',
  'precipitation_sum',
  'wind_speed_10m_max',
  'relative_humidity_2m_mean',
].join(',');

/** Fetch and normalize forecast data for a given coordinate pair. */
async function fetchWeather(latitude, longitude) {
  const url =
    `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}` +
    `&current=${CURRENT_PARAMS}` +
    `&hourly=${HOURLY_PARAMS}` +
    `&daily=${DAILY_PARAMS}` +
    `&timezone=auto&forecast_days=7`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Weather data is currently unavailable. Please try again shortly.');
  }
  const data = await response.json();
  if (!data.current || !data.hourly || !data.daily) {
    throw new Error('Unexpected weather data format.');
  }
  return normalize(data);
}

function normalize(data) {
  const hourly = data.hourly;
  const nowIndex = findClosestHourIndex(hourly.time, data.current.time);

  const current = {
    time: data.current.time,
    temperature: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    isDay: data.current.is_day === 1,
    precipitation: data.current.precipitation,
    weatherCode: data.current.weather_code,
    cloudCover: data.current.cloud_cover,
    windSpeed: data.current.wind_speed_10m,
    windDirection: data.current.wind_direction_10m,
    pressure: data.current.pressure_msl,
    // Not present in the `current` block on Open-Meteo; sourced from the
    // matching hourly slice instead.
    precipitationProbability: hourly.precipitation_probability[nowIndex] ?? 0,
    uvIndex: hourly.uv_index[nowIndex] ?? 0,
    visibility: hourly.visibility ? hourly.visibility[nowIndex] : null,
  };
  current.description = describeWeatherCode(current.weatherCode).label;
  current.icon = describeWeatherCode(current.weatherCode).icon;
  current.windDirectionLabel = windDirectionLabel(current.windDirection);

  const hourlyForecast = hourly.time.map((time, i) => ({
    time,
    temperature: hourly.temperature_2m[i],
    feelsLike: hourly.apparent_temperature[i],
    humidity: hourly.relative_humidity_2m[i],
    precipitationProbability: hourly.precipitation_probability[i],
    precipitation: hourly.precipitation[i],
    weatherCode: hourly.weather_code[i],
    cloudCover: hourly.cloud_cover[i],
    visibility: hourly.visibility ? hourly.visibility[i] : null,
    windSpeed: hourly.wind_speed_10m[i],
    windDirection: hourly.wind_direction_10m[i],
    uvIndex: hourly.uv_index[i],
    pressure: hourly.pressure_msl[i],
    isDay: hourly.is_day[i] === 1,
    icon: describeWeatherCode(hourly.weather_code[i]).icon,
    description: describeWeatherCode(hourly.weather_code[i]).label,
  }));

  const daily = data.daily;
  const dailyForecast = daily.time.map((date, i) => ({
    date,
    tempMax: daily.temperature_2m_max[i],
    tempMin: daily.temperature_2m_min[i],
    sunrise: daily.sunrise[i],
    sunset: daily.sunset[i],
    uvIndexMax: daily.uv_index_max[i],
    precipitationProbabilityMax: daily.precipitation_probability_max[i],
    precipitationSum: daily.precipitation_sum[i],
    windSpeedMax: daily.wind_speed_10m_max[i],
    humidityMean: daily.relative_humidity_2m_mean[i],
    weatherCode: daily.weather_code[i],
    icon: describeWeatherCode(daily.weather_code[i]).icon,
    description: describeWeatherCode(daily.weather_code[i]).label,
  }));

  return {
    current,
    hourly: hourlyForecast,
    daily: dailyForecast,
    sunrise: dailyForecast[0] ? dailyForecast[0].sunrise : null,
    sunset: dailyForecast[0] ? dailyForecast[0].sunset : null,
    timezone: data.timezone,
  };
}

function findClosestHourIndex(times, targetIso) {
  const target = new Date(targetIso).getTime();
  let closestIndex = 0;
  let smallestDiff = Infinity;
  for (let i = 0; i < times.length; i++) {
    const diff = Math.abs(new Date(times[i]).getTime() - target);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closestIndex = i;
    }
  }
  return closestIndex;
}

window.WeatherService = {
  fetchWeather,
  describeWeatherCode,
  windDirectionLabel,
};
})();

/**
 * historical.js
 * Real historical weather via Open-Meteo's Archive API (archive-api.open-meteo.com)
 * — the same provider as the live forecast, no new API/key. All stats are
 * computed from actual daily records; nothing here is estimated or
 * invented. In-memory cache per lat/lon/date-range so switching tabs back
 * and forth, or re-rendering, doesn't refetch.
 *
 * "Rainy day" uses the IMD/WMO convention: a day with >= 2.5mm rainfall.
 */

(function () {
  const ARCHIVE_URL = 'https://archive-api.open-meteo.com/v1/archive';
  const RAINY_DAY_MM = 2.5;
  const cache = new Map();

  const RANGE_DAYS = { '7d': 7, '30d': 30, '3m': 90, '1y': 365 };
  const RANGE_LABELS = { '7d': 'Last 7 Days', '30d': 'Last 30 Days', '3m': 'Last 3 Months', '1y': 'Last Year' };

  function isoDate(d) {
    return d.toISOString().slice(0, 10);
  }

  function yesterday() {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - 1);
    return d;
  }

  async function fetchRaw(lat, lon, startDate, endDate) {
    const key = `${lat.toFixed(3)},${lon.toFixed(3)}|${startDate}|${endDate}`;
    if (cache.has(key)) return cache.get(key);

    const url =
      `${ARCHIVE_URL}?latitude=${lat}&longitude=${lon}` +
      `&start_date=${startDate}&end_date=${endDate}` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

    let response;
    try {
      response = await fetch(url);
    } catch (err) {
      throw new Error('Historical weather data is currently unavailable for this location.');
    }
    if (!response.ok) {
      throw new Error('Historical weather data is currently unavailable for this location.');
    }
    const data = await response.json();
    if (!data.daily || !data.daily.time || data.daily.time.length === 0) {
      throw new Error('Historical weather data is currently unavailable for this location.');
    }
    cache.set(key, data);
    return data;
  }

  function summarize(data) {
    const highs = data.daily.temperature_2m_max.filter((v) => v != null);
    const lows = data.daily.temperature_2m_min.filter((v) => v != null);
    const rain = data.daily.precipitation_sum.filter((v) => v != null);

    const avgHigh = highs.reduce((s, v) => s + v, 0) / highs.length;
    const avgLow = lows.reduce((s, v) => s + v, 0) / lows.length;
    const totalRainfall = rain.reduce((s, v) => s + v, 0);

    return {
      avgTemp: Math.round(((avgHigh + avgLow) / 2) * 10) / 10,
      highTemp: Math.max(...highs),
      lowTemp: Math.min(...lows),
      totalRainfall: Math.round(totalRainfall * 10) / 10,
      rainyDays: rain.filter((v) => v >= RAINY_DAY_MM).length,
      dayCount: data.daily.time.length,
    };
  }

  /** Summary stats for a fixed lookback range ending yesterday. */
  async function fetchRange(lat, lon, rangeKey) {
    const days = RANGE_DAYS[rangeKey] || 30;
    const end = yesterday();
    const start = new Date(end);
    start.setUTCDate(start.getUTCDate() - (days - 1));
    const startDate = isoDate(start);
    const endDate = isoDate(end);

    const data = await fetchRaw(lat, lon, startDate, endDate);
    return { ...summarize(data), rangeLabel: RANGE_LABELS[rangeKey] || rangeKey, startDate, endDate };
  }

  /** Real monthly rainfall totals for the last `months` months (current month is month-to-date). */
  async function monthlyRainfall(lat, lon, months) {
    months = months || 4;
    const today = yesterday();
    const results = [];
    for (let i = months - 1; i >= 0; i--) {
      const monthStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - i, 1));
      const monthEnd = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - i + 1, 0));
      const effectiveEnd = monthEnd > today ? today : monthEnd;
      if (effectiveEnd < monthStart) continue;

      const data = await fetchRaw(lat, lon, isoDate(monthStart), isoDate(effectiveEnd));
      const rain = data.daily.precipitation_sum.filter((v) => v != null);
      results.push({
        label: monthStart.toLocaleDateString([], { month: 'short' }),
        total: Math.round(rain.reduce((s, v) => s + v, 0) * 10) / 10,
        isCurrentMonth: i === 0,
      });
    }
    return results;
  }

  /**
   * Compares this month-to-date rainfall against the SAME date range last
   * year (not a multi-year "average" — we only ever compare like-for-like
   * real data, never an invented baseline).
   */
  async function yearOverYearRainfall(lat, lon) {
    const today = yesterday();
    const monthStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
    const lastYearStart = new Date(Date.UTC(today.getUTCFullYear() - 1, today.getUTCMonth(), 1));
    const lastYearEnd = new Date(Date.UTC(today.getUTCFullYear() - 1, today.getUTCMonth(), today.getUTCDate()));

    const [thisYearData, lastYearData] = await Promise.all([
      fetchRaw(lat, lon, isoDate(monthStart), isoDate(today)),
      fetchRaw(lat, lon, isoDate(lastYearStart), isoDate(lastYearEnd)),
    ]);

    const sum = (data) => data.daily.precipitation_sum.filter((v) => v != null).reduce((s, v) => s + v, 0);
    const thisYear = Math.round(sum(thisYearData) * 10) / 10;
    const lastYear = Math.round(sum(lastYearData) * 10) / 10;
    const percentDiff = lastYear > 0 ? Math.round(((thisYear - lastYear) / lastYear) * 1000) / 10 : null;

    return {
      monthLabel: today.toLocaleDateString([], { month: 'long', year: 'numeric' }),
      thisYear,
      lastYear,
      percentDiff,
    };
  }

  window.HistoricalWeather = { fetchRange, monthlyRainfall, yearOverYearRainfall, RANGE_LABELS };
})();

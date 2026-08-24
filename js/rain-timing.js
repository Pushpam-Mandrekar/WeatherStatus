/**
 * rain-timing.js
 * Answers "when is it likely to rain?" from the hourly forecast already
 * fetched by weather.js. Pure computation — no network calls of its own.
 */

(function () {
  const RAIN_PROBABILITY_THRESHOLD = 50; // %
  const HORIZON_HOURS = 12;

  function formatHour(iso) {
    return new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  /** Returns a rain-timing summary for the next `HORIZON_HOURS` hours. */
  function analyze(weatherData) {
    const now = new Date(weatherData.current.time).getTime();
    const upcoming = weatherData.hourly
      .filter((h) => new Date(h.time).getTime() >= now - 30 * 60 * 1000)
      .slice(0, HORIZON_HOURS);

    const currentlyRaining =
      weatherData.current.precipitationProbability >= RAIN_PROBABILITY_THRESHOLD && weatherData.current.precipitation > 0;
    const currentStatusText = currentlyRaining ? `${weatherData.current.description} right now` : 'No rain right now';

    let rainStartIndex = -1;
    for (let i = 0; i < upcoming.length; i++) {
      if (upcoming[i].precipitationProbability >= RAIN_PROBABILITY_THRESHOLD) {
        rainStartIndex = i;
        break;
      }
    }

    let nextRainTime = null;
    let nextRainTimeISO = null;
    let rainWindow = null;
    let probability = null;
    let rainfallAmount = null;
    let bestOutdoorTime = null;
    let summary;

    if (rainStartIndex === -1) {
      summary = 'No significant rain expected today.';
    } else {
      let rainEndIndex = rainStartIndex;
      while (
        rainEndIndex + 1 < upcoming.length &&
        upcoming[rainEndIndex + 1].precipitationProbability >= RAIN_PROBABILITY_THRESHOLD
      ) {
        rainEndIndex++;
      }

      const startHour = upcoming[rainStartIndex];
      const endHour = upcoming[rainEndIndex];
      const windowEnd = new Date(new Date(endHour.time).getTime() + 60 * 60 * 1000);

      nextRainTime = formatHour(startHour.time);
      nextRainTimeISO = startHour.time;
      rainWindow = { start: nextRainTime, end: formatHour(windowEnd.toISOString()) };

      const windowHours = upcoming.slice(rainStartIndex, rainEndIndex + 1);
      probability = Math.round(Math.max(...windowHours.map((h) => h.precipitationProbability)));
      rainfallAmount = Math.round(windowHours.reduce((sum, h) => sum + h.precipitation, 0) * 10) / 10;

      summary =
        rainStartIndex === rainEndIndex
          ? `Rain is most likely around ${rainWindow.start}.`
          : `Rain is most likely between ${rainWindow.start} and ${rainWindow.end}.`;

      if (rainStartIndex > 0) {
        bestOutdoorTime = `Before ${nextRainTime}`;
      }
    }

    const timeline = upcoming.map((h) => ({
      time: formatHour(h.time),
      icon: h.icon,
      probability: Math.round(h.precipitationProbability),
    }));

    return {
      currentlyRaining,
      currentStatusText,
      nextRainTime,
      nextRainTimeISO,
      rainWindow,
      probability,
      rainfallAmount,
      summary,
      bestOutdoorTime,
      timeline,
    };
  }

  window.RainTiming = { analyze, RAIN_PROBABILITY_THRESHOLD };
})();

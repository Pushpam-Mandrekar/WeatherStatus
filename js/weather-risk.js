/**
 * weather-risk.js
 * Interprets current conditions + today's daily totals into a small set of
 * "this may actually be dangerous or uncomfortable" cards. Returns an empty
 * list for ordinary weather — this must never manufacture risk out of
 * normal conditions. Thresholds are fixed, documented rules, not guesses
 * made per-call, so a given input always produces the same output.
 */

(function () {
  const SEVERITY_RANK = { severe: 3, high: 2, moderate: 1 };

  function levelAbove(value, thresholds) {
    for (const t of thresholds) {
      if (value >= t.min) return t.severity;
    }
    return null;
  }

  function levelBelow(value, thresholds) {
    for (const t of thresholds) {
      if (value <= t.max) return t.severity;
    }
    return null;
  }

  function assess(weatherData) {
    const c = weatherData.current;
    const today = weatherData.daily && weatherData.daily[0];
    const risks = [];

    const heatSeverity = levelAbove(c.feelsLike, [
      { min: 45, severity: 'severe' },
      { min: 41, severity: 'high' },
      { min: 38, severity: 'moderate' },
    ]);
    if (heatSeverity) {
      risks.push({
        type: 'heat',
        severity: heatSeverity,
        icon: '🔥',
        title: 'High Heat',
        message: `Feels like ${Math.round(c.feelsLike)}°C. Avoid prolonged outdoor activity, especially midday.`,
      });
    }

    const dailyRain = today ? today.precipitationSum : 0;
    const rainSeverity = levelAbove(dailyRain, [
      { min: 204.5, severity: 'severe' },
      { min: 115.6, severity: 'high' },
      { min: 64.5, severity: 'moderate' },
    ]);
    if (rainSeverity) {
      risks.push({
        type: 'rain',
        severity: rainSeverity,
        icon: '🌧️',
        title: 'Heavy Rain',
        message: `${Math.round(dailyRain)} mm of rain expected today. Outdoor activities may be affected.`,
      });
    }

    const windSeverity = levelAbove(c.windSpeed, [
      { min: 80, severity: 'severe' },
      { min: 60, severity: 'high' },
      { min: 40, severity: 'moderate' },
    ]);
    if (windSeverity) {
      risks.push({
        type: 'wind',
        severity: windSeverity,
        icon: '💨',
        title: 'Strong Wind',
        message: `Wind speeds around ${Math.round(c.windSpeed)} km/h. Outdoor work may be affected.`,
      });
    }

    const uvSeverity = levelAbove(c.uvIndex, [
      { min: 11, severity: 'severe' },
      { min: 8, severity: 'high' },
      { min: 6, severity: 'moderate' },
    ]);
    if (uvSeverity) {
      risks.push({
        type: 'uv',
        severity: uvSeverity,
        icon: '☀️',
        title: 'High UV',
        message: `UV index ${c.uvIndex.toFixed(1)}. Sun protection recommended outdoors.`,
      });
    }

    if (c.visibility != null) {
      const visSeverity = levelBelow(c.visibility, [
        { max: 500, severity: 'severe' },
        { max: 1000, severity: 'high' },
        { max: 2000, severity: 'moderate' },
      ]);
      if (visSeverity) {
        risks.push({
          type: 'visibility',
          severity: visSeverity,
          icon: '🌫️',
          title: 'Low Visibility',
          message: `Visibility around ${(c.visibility / 1000).toFixed(1)} km. Take care while travelling.`,
        });
      }
    }

    risks.sort((a, b) => SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity]);
    return risks;
  }

  window.WeatherRisk = { assess };
})();

/**
 * best-day.js
 * Ranks the 7-day forecast for a given activity type using the same
 * transparent, deterministic rule-based approach as decisions.js — no
 * randomness, no AI calls. Scores are recomputed fresh from the daily
 * forecast every time; nothing is cached or guessed.
 */

(function () {
  function rangePenalty(value, idealMin, idealMax, softMargin, maxPenalty) {
    if (value >= idealMin && value <= idealMax) return 0;
    const dist = value < idealMin ? idealMin - value : value - idealMax;
    return Math.min(dist / softMargin, 1) * maxPenalty;
  }

  // [idealMin, idealMax, softMargin, maxPenalty] per factor, per activity type.
  const PROFILES = {
    outdoor: {
      temp: [15, 30, 10, 25],
      rain: [20, 30, 30],
      wind: [25, 20, 15],
      humidity: [30, 75, 25, 15],
    },
    travel: {
      temp: [10, 34, 14, 10],
      rain: [15, 35, 40],
      wind: [30, 25, 15],
      humidity: [20, 85, 30, 10],
    },
    sports: {
      temp: [12, 26, 10, 25],
      rain: [15, 30, 30],
      wind: [20, 20, 15],
      humidity: [30, 65, 20, 20],
    },
  };

  function scoreDay(day, profile) {
    const p = PROFILES[profile] || PROFILES.outdoor;
    const avgTemp = (day.tempMax + day.tempMin) / 2;
    let penalty = 0;
    penalty += rangePenalty(avgTemp, p.temp[0], p.temp[1], p.temp[2], p.temp[3]);
    penalty += rangePenalty(day.precipitationProbabilityMax, 0, p.rain[0], p.rain[1], p.rain[2]);
    penalty += rangePenalty(day.windSpeedMax, 0, p.wind[0], p.wind[1], p.wind[2]);
    if (day.humidityMean != null) {
      penalty += rangePenalty(day.humidityMean, p.humidity[0], p.humidity[1], p.humidity[2], p.humidity[3]);
    }
    return Math.max(0, Math.round(100 - penalty));
  }

  function rateScore(score) {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 55) return 'Fair';
    if (score >= 35) return 'Poor';
    return 'Avoid';
  }

  function dayLabel(dateStr, index) {
    if (index === 0) return 'Today';
    return new Date(dateStr + 'T00:00:00').toLocaleDateString([], { weekday: 'long' });
  }

  /** Ranks the week and returns the top 3 days for the given activity type. */
  function rank(weatherData, activityType) {
    const scored = weatherData.daily.map((day, i) => {
      const score = scoreDay(day, activityType);
      return {
        date: day.date,
        label: dayLabel(day.date, i),
        icon: day.icon,
        description: day.description,
        tempMax: day.tempMax,
        tempMin: day.tempMin,
        precipitationProbabilityMax: day.precipitationProbabilityMax,
        score,
        rating: rateScore(score),
      };
    });
    return [...scored].sort((a, b) => b.score - a.score).slice(0, 3);
  }

  window.BestDay = { rank, ACTIVITY_TYPES: Object.keys(PROFILES) };
})();

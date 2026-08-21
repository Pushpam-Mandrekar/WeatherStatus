/**
 * decisions.js
 * The recommendation engine. Pure, deterministic, rule-based scoring —
 * no AI/API calls. Given normalized weather data (see weather.js), it scores
 * each activity for every upcoming hour, finds the best 2-hour window, and
 * returns a { score, rating, bestTime, reasons, advice } object.
 *
 * To add a new activity: push a new entry onto ACTIVITIES with an
 * `evaluate(hour)` function that returns { score, reasons }.
 */

(function () {
function round(n) {
  return Math.round(n);
}

/**
 * Generic "ideal range" penalty: 0 penalty inside [idealMin, idealMax],
 * scaling linearly up to maxPenalty as the value drifts `softMargin` units
 * past the ideal edge (and staying capped at maxPenalty beyond that).
 */
function rangePenalty(value, idealMin, idealMax, softMargin, maxPenalty) {
  if (value >= idealMin && value <= idealMax) return 0;
  const dist = value < idealMin ? idealMin - value : value - idealMax;
  const ratio = Math.min(dist / softMargin, 1);
  return ratio * maxPenalty;
}

/** A single evaluated factor: human-readable text + how much it hurt the score. */
function factor(text, penalty) {
  return { text, weight: penalty > 0 ? penalty : 1 };
}

function scoreFromPenalties(reasons) {
  const totalPenalty = reasons.reduce((sum, r) => sum + (r.weight > 1 ? r.weight : 0), 0);
  return Math.max(0, Math.round(100 - totalPenalty));
}

function topReasons(reasons, count) {
  return [...reasons]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, count)
    .map((r) => r.text);
}

function rateScore(score) {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 55) return 'Fair';
  if (score >= 35) return 'Poor';
  return 'Avoid';
}

// ---------------------------------------------------------------------------
// Shared factor evaluators (reused across activities)
// ---------------------------------------------------------------------------

function evalTemperature(temp, idealMin, idealMax, softMargin, maxPenalty) {
  const penalty = rangePenalty(temp, idealMin, idealMax, softMargin, maxPenalty);
  if (penalty === 0) return factor('Comfortable temperature', 0);
  const text = temp < idealMin ? `Cool temperature (${round(temp)}°C)` : `Hot temperature (${round(temp)}°C)`;
  return factor(text, penalty);
}

function evalFeelsLike(feelsLike, idealMin, idealMax, softMargin, maxPenalty) {
  const penalty = rangePenalty(feelsLike, idealMin, idealMax, softMargin, maxPenalty);
  if (penalty === 0) return factor('Feels-like temperature is pleasant', 0);
  const text =
    feelsLike < idealMin
      ? `Feels colder than actual (${round(feelsLike)}°C)`
      : `Feels hotter than actual (${round(feelsLike)}°C)`;
  return factor(text, penalty);
}

function evalRain(probability, idealMax, softMargin, maxPenalty) {
  const penalty = rangePenalty(probability, 0, idealMax, softMargin, maxPenalty);
  if (penalty === 0) return factor('Low chance of rain', 0);
  if (probability >= 60) return factor(`High chance of rain (${round(probability)}%)`, penalty);
  return factor(`Some chance of rain (${round(probability)}%)`, penalty);
}

function evalWind(speed, idealMax, softMargin, maxPenalty, label = 'wind') {
  const penalty = rangePenalty(speed, 0, idealMax, softMargin, maxPenalty);
  if (penalty === 0) return factor('Moderate wind', 0);
  return factor(`Strong ${label} (${round(speed)} km/h)`, penalty);
}

function evalUV(uv, idealMax, softMargin, maxPenalty) {
  const penalty = rangePenalty(uv, 0, idealMax, softMargin, maxPenalty);
  if (penalty === 0) return factor('Low UV', 0);
  return factor(`High UV index (${round(uv)})`, penalty);
}

function evalHumidity(humidity, idealMin, idealMax, softMargin, maxPenalty) {
  const penalty = rangePenalty(humidity, idealMin, idealMax, softMargin, maxPenalty);
  if (penalty === 0) return factor('Comfortable humidity', 0);
  const text = humidity > idealMax ? `High humidity (${round(humidity)}%)` : `Low humidity (${round(humidity)}%)`;
  return factor(text, penalty);
}

function evalCloudCover(cover, idealMin, idealMax, softMargin, maxPenalty, goodText) {
  const penalty = rangePenalty(cover, idealMin, idealMax, softMargin, maxPenalty);
  if (penalty === 0) return factor(goodText, 0);
  const text = cover < idealMin ? `Very clear sky (${round(cover)}% cloud)` : `Overcast sky (${round(cover)}% cloud)`;
  return factor(text, penalty);
}

function evalVisibility(visibilityMeters, idealMin, softMargin, maxPenalty) {
  if (visibilityMeters == null) return factor('Visibility data unavailable', 0);
  const penalty = rangePenalty(visibilityMeters, idealMin, Infinity, softMargin, maxPenalty);
  if (penalty === 0) return factor('Good visibility', 0);
  return factor(`Reduced visibility (${(visibilityMeters / 1000).toFixed(1)} km)`, penalty);
}

// ---------------------------------------------------------------------------
// Activity definitions
// ---------------------------------------------------------------------------

const ACTIVITIES = [
  {
    id: 'walking',
    name: 'Walking',
    icon: '🚶',
    evaluate(hour) {
      const reasons = [
        evalTemperature(hour.temperature, 12, 24, 10, 25),
        evalFeelsLike(hour.feelsLike, 10, 26, 10, 15),
        evalRain(hour.precipitationProbability, 20, 40, 30),
        evalWind(hour.windSpeed, 20, 20, 15),
        evalUV(hour.uvIndex, 6, 5, 10),
        evalHumidity(hour.humidity, 30, 70, 30, 5),
      ];
      return { score: scoreFromPenalties(reasons), reasons };
    },
    advice: {
      Excellent: 'Great conditions for an outdoor walk.',
      Good: 'A solid time to head out for a walk.',
      Fair: 'Walkable, but conditions are a bit mixed — dress accordingly.',
      Poor: 'Not ideal for walking — consider a shorter route or wait it out.',
      Avoid: 'Poor conditions for walking today. Consider staying indoors.',
    },
  },
  {
    id: 'running',
    name: 'Running',
    icon: '🏃',
    evaluate(hour) {
      const reasons = [
        evalTemperature(hour.temperature, 8, 20, 10, 25),
        evalFeelsLike(hour.feelsLike, 5, 22, 10, 15),
        evalRain(hour.precipitationProbability, 15, 40, 30),
        evalWind(hour.windSpeed, 18, 20, 10),
        evalUV(hour.uvIndex, 5, 5, 10),
        evalHumidity(hour.humidity, 30, 65, 30, 10),
      ];
      return { score: scoreFromPenalties(reasons), reasons };
    },
    advice: {
      Excellent: 'Excellent running weather — cool and dry.',
      Good: 'Good conditions for a run.',
      Fair: 'Runnable, but pace yourself — heat, humidity or wind may slow you down.',
      Poor: 'Tough conditions for running. Consider an easier effort or treadmill.',
      Avoid: 'Not recommended for running today — risk of overheating or slipping.',
    },
  },
  {
    id: 'cycling',
    name: 'Cycling',
    icon: '🚴',
    evaluate(hour) {
      const reasons = [
        evalTemperature(hour.temperature, 10, 26, 12, 20),
        evalFeelsLike(hour.feelsLike, 8, 27, 12, 10),
        evalRain(hour.precipitationProbability, 15, 40, 30),
        evalWind(hour.windSpeed, 15, 20, 25, 'gusts'),
        evalUV(hour.uvIndex, 7, 5, 8),
        evalHumidity(hour.humidity, 30, 75, 30, 7),
      ];
      return { score: scoreFromPenalties(reasons), reasons };
    },
    advice: {
      Excellent: 'Ideal cycling conditions — calm wind and dry roads.',
      Good: 'Good day for a ride.',
      Fair: 'Rideable, but watch for wind or wet roads.',
      Poor: 'Cycling will be challenging — strong wind or rain likely.',
      Avoid: 'Not safe for cycling today — high wind and/or heavy rain expected.',
    },
  },
  {
    id: 'laundry',
    name: 'Laundry',
    icon: '🧺',
    evaluate(hour) {
      const reasons = [
        evalRain(hour.precipitationProbability, 10, 40, 40),
        evalHumidity(hour.humidity, 0, 60, 30, 25),
        evalWind(hour.windSpeed, 30, 25, 15),
        evalCloudCover(hour.cloudCover, 0, 50, 40, 10, 'Sunny skies help drying'),
        evalTemperature(hour.temperature, 15, 35, 15, 10),
      ];
      // Very low wind slows drying but isn't a real "strong wind" problem —
      // swap in a specific note if wind is nearly still.
      if (hour.windSpeed < 3) {
        reasons[2] = factor('Very still air — clothes will dry slowly', 8);
      }
      return { score: scoreFromPenalties(reasons), reasons };
    },
    advice: {
      Excellent: 'Perfect drying conditions — dry, breezy and sunny.',
      Good: 'Good day to hang laundry outside.',
      Fair: 'Drying will work, but may be slower than usual.',
      Poor: 'Drying outside is risky — humidity or rain could interfere.',
      Avoid: 'Skip outdoor drying today — rain is likely.',
    },
  },
  {
    id: 'carwashing',
    name: 'Car Washing',
    icon: '🚗',
    evaluate(hour) {
      const reasons = [
        evalRain(hour.precipitationProbability, 10, 30, 45),
        evalTemperature(hour.temperature, 5, 35, 8, 20),
        evalWind(hour.windSpeed, 20, 20, 15, 'wind (dust/debris)'),
        evalUV(hour.uvIndex, 8, 5, 10),
      ];
      return { score: scoreFromPenalties(reasons), reasons };
    },
    advice: {
      Excellent: 'Great time to wash the car — dry skies ahead.',
      Good: 'Good conditions for a car wash.',
      Fair: 'Should be fine, but there is some chance of rain or dust.',
      Poor: 'Risky — rain may undo your work. Consider waiting.',
      Avoid: 'Rain is likely — skip the car wash today.',
    },
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: '📷',
    evaluate(hour) {
      const reasons = [
        evalCloudCover(hour.cloudCover, 20, 70, 35, 20, 'Interesting light with varied cloud cover'),
        evalRain(hour.precipitationProbability, 20, 40, 25),
        evalWind(hour.windSpeed, 20, 20, 15),
        evalVisibility(hour.visibility, 8000, 6000, 15),
        evalUV(hour.uvIndex, 6, 5, 15),
        evalTemperature(hour.temperature, 5, 28, 12, 10),
      ];
      return { score: scoreFromPenalties(reasons), reasons };
    },
    advice: {
      Excellent: 'Beautiful light expected — great time to shoot.',
      Good: 'Good conditions for photography.',
      Fair: 'Workable light, though not the most dramatic.',
      Poor: 'Flat or harsh light expected — tricky for photography.',
      Avoid: 'Poor conditions for outdoor photography today.',
    },
  },
];

// ---------------------------------------------------------------------------
// Best-time-of-day search + public API
// ---------------------------------------------------------------------------

function formatHour(iso) {
  return new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

/**
 * Scans the next `horizonHours` of hourly data and finds the 2-hour window
 * with the highest average score for this activity. All six activities are
 * daytime pursuits, so daylight hours (per Open-Meteo's `is_day`) are
 * preferred; if none fall within the horizon (e.g. it's late at night), the
 * search falls back to any upcoming hour rather than returning nothing.
 */
function findBestWindow(activity, hourlyData, now, horizonHours = 24) {
  const withinHorizon = hourlyData
    .filter((h) => new Date(h.time).getTime() >= now.getTime() - 30 * 60 * 1000)
    .slice(0, horizonHours);

  const daylightOnly = withinHorizon.filter((h) => h.isDay);
  const upcoming = daylightOnly.length > 0 ? daylightOnly : withinHorizon;

  if (upcoming.length === 0) return null;

  const ONE_HOUR_MS = 60 * 60 * 1000;
  let best = null;

  const considerSingle = (h) => {
    const evaluation = activity.evaluate(h);
    const end = new Date(new Date(h.time).getTime() + ONE_HOUR_MS);
    if (!best || evaluation.score > best.avgScore) {
      best = { avgScore: evaluation.score, reasons: evaluation.reasons, start: h.time, end: end.toISOString() };
    }
  };

  for (let i = 0; i < upcoming.length; i++) {
    const h1 = upcoming[i];
    const h2 = upcoming[i + 1];
    // Only pair two hours into a single window if they are truly
    // back-to-back — filtering out night hours can otherwise leave two
    // unrelated hours adjacent in the array (e.g. dusk and next dawn).
    const areAdjacent = h2 && new Date(h2.time).getTime() - new Date(h1.time).getTime() === ONE_HOUR_MS;

    if (areAdjacent) {
      const e1 = activity.evaluate(h1);
      const e2 = activity.evaluate(h2);
      const avgScore = (e1.score + e2.score) / 2;
      const representative = e1.score >= e2.score ? e1 : e2;
      const end = new Date(new Date(h2.time).getTime() + ONE_HOUR_MS);
      if (!best || avgScore > best.avgScore) {
        best = { avgScore, reasons: representative.reasons, start: h1.time, end: end.toISOString() };
      }
    } else {
      considerSingle(h1);
    }
  }
  return best;
}

/** Compute the full recommendation object for one activity. */
function getRecommendation(activity, weatherData) {
  const now = new Date(weatherData.current.time);
  const window = findBestWindow(activity, weatherData.hourly, now);

  if (!window) {
    const evaluation = activity.evaluate(weatherData.current);
    const score = evaluation.score;
    const rating = rateScore(score);
    return {
      id: activity.id,
      name: activity.name,
      icon: activity.icon,
      score,
      rating,
      bestTime: 'Now',
      reasons: topReasons(evaluation.reasons, 4),
      advice: activity.advice[rating],
    };
  }

  const score = Math.round(window.avgScore);
  const rating = rateScore(score);
  return {
    id: activity.id,
    name: activity.name,
    icon: activity.icon,
    score,
    rating,
    bestTime: `${formatHour(window.start)} – ${formatHour(window.end)}`,
    reasons: topReasons(window.reasons, 4),
    advice: activity.advice[rating],
  };
}

/** Compute recommendations for every registered activity. */
function getAllRecommendations(weatherData) {
  return ACTIVITIES.map((activity) => getRecommendation(activity, weatherData));
}

window.DecisionEngine = {
  ACTIVITIES,
  getAllRecommendations,
  getRecommendation,
};
})();

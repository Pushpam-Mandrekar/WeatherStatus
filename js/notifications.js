/**
 * notifications.js
 * Rain/severe-weather alerts. Two honest layers:
 *
 *  1. In-tab checks: a setInterval reuses the weather data already fetched
 *     (no extra network calls) and, when rain becomes imminent or a severe
 *     risk appears, fires a browser Notification (if permission was
 *     granted) and lets app.js show an in-page banner. This only works
 *     while this tab is open.
 *
 *  2. A minimal service worker (sw.js) is registered so the standard PWA
 *     architecture is in place. It does NOT enable background/closed-tab
 *     push — that requires a push server (Web Push + VAPID keys) this
 *     project has no backend to run. Nothing here pretends otherwise.
 *
 * Permission is requested at most once per browser (never re-prompted
 * after a denial), and only in response to an explicit user action.
 */

(function () {
  const CHECK_INTERVAL_MS = 5 * 60 * 1000;
  const IMMINENT_RAIN_WINDOW_MIN = 60;

  let checkTimer = null;
  let weatherDataRef = null;
  let placeNameRef = '';
  let prefs = { rainAlerts: false, severeAlerts: false };
  let notifiedRainKey = null;
  let notifiedSevereKey = null;
  let onImminentRain = null; // optional callback for the in-page banner

  function isSupported() {
    return 'Notification' in window;
  }

  function permissionState() {
    return isSupported() ? Notification.permission : 'unsupported';
  }

  /** Requests permission once; returns the resulting state without re-prompting on repeat calls. */
  async function requestPermission() {
    if (!isSupported()) return 'unsupported';
    if (Notification.permission !== 'default') return Notification.permission;
    try {
      return await Notification.requestPermission();
    } catch (err) {
      return Notification.permission;
    }
  }

  function setPreferences(newPrefs) {
    prefs = { ...prefs, ...newPrefs };
    runCheck();
  }

  function onImminentRainChange(callback) {
    onImminentRain = callback;
  }

  /** Call whenever new weather data is loaded for the location on screen. */
  function updateContext(weatherData, placeName) {
    weatherDataRef = weatherData;
    placeNameRef = placeName;
    notifiedRainKey = null;
    notifiedSevereKey = null;
    runCheck();
  }

  function notify(title, body) {
    if (permissionState() !== 'granted') return;
    try {
      new Notification(title, { body });
    } catch (err) {
      // Some browsers require a service worker registration for
      // Notification construction; fail quietly rather than throwing.
    }
  }

  function runCheck() {
    if (!weatherDataRef) return;

    const rt = RainTiming.analyze(weatherDataRef);
    let minsUntilRain = null;
    if (rt.nextRainTimeISO) {
      minsUntilRain = Math.round(
        (new Date(rt.nextRainTimeISO).getTime() - new Date(weatherDataRef.current.time).getTime()) / 60000
      );
    }
    // Hourly slots are on-the-hour while `current.time` can carry finer
    // granularity (e.g. :15), so an already-started rain hour can compute
    // as a few minutes "in the past" -- clamp at 0 rather than excluding
    // it, and treat currently-raining as trivially imminent regardless.
    const isImminent =
      rt.currentlyRaining || (minsUntilRain != null && minsUntilRain <= IMMINENT_RAIN_WINDOW_MIN);
    if (isImminent) {
      minsUntilRain = minsUntilRain != null ? Math.max(0, minsUntilRain) : 0;
    }
    const imminentTimeLabel = rt.nextRainTime || 'now';

    if (onImminentRain) {
      onImminentRain(isImminent ? { minutes: minsUntilRain, time: imminentTimeLabel } : null);
    }

    if (prefs.rainAlerts && isImminent) {
      const key = rt.nextRainTimeISO || 'raining-now';
      if (notifiedRainKey !== key) {
        const body =
          minsUntilRain === 0
            ? `Rain is happening now in ${placeNameRef}.`
            : `Rain is likely in ${placeNameRef} within the next ${minsUntilRain} minutes.`;
        notify('🌧️ MyVillageWeather', body);
        notifiedRainKey = key;
      }
    }

    if (prefs.severeAlerts) {
      const risks = WeatherRisk.assess(weatherDataRef);
      const severe = risks.find((r) => r.severity === 'high' || r.severity === 'severe');
      if (severe) {
        const key = severe.type + severe.severity;
        if (notifiedSevereKey !== key) {
          notify('⚠️ MyVillageWeather', `${severe.title} expected in ${placeNameRef}. ${severe.message}`);
          notifiedSevereKey = key;
        }
      }
    }
  }

  function start() {
    if (checkTimer) return;
    checkTimer = setInterval(runCheck, CHECK_INTERVAL_MS);
  }

  function stop() {
    if (checkTimer) clearInterval(checkTimer);
    checkTimer = null;
  }

  /** Isolated, optional: registering this does not by itself enable push. See file header. */
  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return Promise.resolve(null);
    return navigator.serviceWorker.register('sw.js').catch(() => null);
  }

  window.NotificationService = {
    isSupported,
    permissionState,
    requestPermission,
    setPreferences,
    updateContext,
    onImminentRainChange,
    start,
    stop,
    registerServiceWorker,
  };
})();

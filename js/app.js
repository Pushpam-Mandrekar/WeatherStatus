/**
 * app.js
 * UI orchestration only: wires up DOM events, calls into LocationsDB /
 * LocationService / WeatherService / DecisionEngine, and renders results.
 * No weather or recommendation logic lives here.
 *
 * Flow: LocationsDB (curated, offline) resolves a search term to exact
 * coordinates -> WeatherService fetches weather for those coordinates.
 * The two are intentionally separate: a location that isn't in the
 * database is a "no results" case and never reaches the weather API at
 * all; a location that IS in the database but whose weather fetch fails
 * is a distinct "no weather data" case. Neither ever falls back to a
 * different place.
 */

(function () {
  const els = {
    form: document.getElementById('location-form'),
    input: document.getElementById('location-input'),
    searchResults: document.getElementById('search-results'),
    useLocationBtn: document.getElementById('use-location-btn'),
    retryBtn: document.getElementById('retry-btn'),
    quickCities: document.getElementById('quick-cities'),
    quickTalukas: document.getElementById('quick-talukas'),

    emptyState: document.getElementById('empty-state'),
    loadingState: document.getElementById('loading-state'),
    noResultsState: document.getElementById('no-results-state'),
    noResultsMessage: document.getElementById('no-results-message'),
    errorState: document.getElementById('error-state'),
    errorMessage: document.getElementById('error-message'),
    content: document.getElementById('content'),

    currentName: document.getElementById('current-name'),
    currentState: document.getElementById('current-state'),
    currentType: document.getElementById('current-type'),
    currentDistrict: document.getElementById('current-district'),
    currentIcon: document.getElementById('current-icon'),
    currentTemp: document.getElementById('current-temp'),
    currentDesc: document.getElementById('current-desc'),
    currentFeels: document.getElementById('current-feels'),
    statHumidity: document.getElementById('stat-humidity'),
    statWind: document.getElementById('stat-wind'),
    statRain: document.getElementById('stat-rain'),
    statRainfall: document.getElementById('stat-rainfall'),
    statUv: document.getElementById('stat-uv'),
    statClouds: document.getElementById('stat-clouds'),
    statPressure: document.getElementById('stat-pressure'),
    statVisibility: document.getElementById('stat-visibility'),
    statSunrise: document.getElementById('stat-sunrise'),
    statSunset: document.getElementById('stat-sunset'),

    hourlyScroll: document.getElementById('hourly-scroll'),
    dailyList: document.getElementById('daily-list'),
    activityGrid: document.getElementById('activity-grid'),

    rainTimingBody: document.getElementById('rain-timing-body'),
    weatherRiskBody: document.getElementById('weather-risk-body'),
    bestDayBody: document.getElementById('best-day-body'),
    bestDayTabs: document.getElementById('best-day-tabs'),

    historicalSection: document.getElementById('historical-section'),
    historicalBody: document.getElementById('historical-body'),
    historicalTabs: document.getElementById('historical-tabs'),
    rainfallTrackerSection: document.getElementById('rainfall-tracker-section'),
    rainfallTrackerBody: document.getElementById('rainfall-tracker-body'),

    weatherMapSection: document.getElementById('weather-map-section'),
    weatherMapStatus: document.getElementById('weather-map-status'),
    weatherMapContainer: document.getElementById('weather-map-container'),
    weatherMapTabs: document.getElementById('weather-map-tabs'),

    notifBell: document.getElementById('notif-bell'),
    notifPanel: document.getElementById('notif-panel'),
    notifLocation: document.getElementById('notif-location'),
    notifRainToggle: document.getElementById('notif-rain-toggle'),
    notifSevereToggle: document.getElementById('notif-severe-toggle'),
    notifPermissionNote: document.getElementById('notif-permission-note'),
    rainBanner: document.getElementById('rain-banner'),
    rainBannerBody: document.getElementById('rain-banner-body'),
  };

  let lastAction = null; // remembers how to retry after an error
  let lastWeatherData = null; // for re-rendering Best Day when its tab changes
  let bestDayActivity = 'outdoor';
  let weatherMapLayer = 'rain';
  let currentPlace = null; // { latitude, longitude, ... } of the location currently on screen
  let historicalRange = '30d';
  let historicalObserver = null;
  let rainfallObserver = null;

  // ---- state machine -------------------------------------------------

  function showState(state) {
    els.emptyState.classList.toggle('hidden', state !== 'empty');
    els.loadingState.classList.toggle('hidden', state !== 'loading');
    els.noResultsState.classList.toggle('hidden', state !== 'no-results');
    els.errorState.classList.toggle('hidden', state !== 'error');
    els.content.classList.toggle('hidden', state !== 'content');
  }

  function showError(message, retryFn) {
    els.errorMessage.textContent = message;
    lastAction = retryFn;
    showState('error');
  }

  function showNoResults(query) {
    els.noResultsMessage.textContent = `No results found for ${query}`;
    showState('no-results');
  }

  // ---- data loading ----------------------------------------------------

  /** place: { name, type: 'taluka'|'city'|'gps', state, district?, latitude, longitude } */
  async function loadForLocation(place) {
    showState('loading');
    lastAction = () => loadForLocation(place);
    try {
      const weatherData = await WeatherService.fetchWeather(place.latitude, place.longitude);
      render(weatherData, place);
      showState('content');
    } catch (err) {
      showError(`No weather data available for ${place.name}.`, () => loadForLocation(place));
    }
  }

  async function handleUseLocation() {
    showState('loading');
    lastAction = handleUseLocation;
    try {
      const { latitude, longitude } = await LocationService.getCurrentPosition();
      let place;
      try {
        place = await LocationService.reverseGeocode(latitude, longitude);
      } catch (err) {
        place = { name: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`, type: 'gps', state: '', latitude, longitude };
      }
      await loadForLocation(place);
    } catch (err) {
      showError(err.message || 'Could not access your location.', handleUseLocation);
    }
  }

  function searchAndLoad(query) {
    const matches = LocationsDB.search(query);
    if (matches.length === 0) {
      showNoResults(query);
      return;
    }
    loadForLocation(matches[0]);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    hideSearchResults();
    const query = els.input.value.trim();
    if (!query) return;
    searchAndLoad(query);
  }

  function handleSearchInput() {
    const query = els.input.value.trim();
    if (!query) {
      hideSearchResults();
      return;
    }
    renderSearchResults(LocationsDB.search(query));
  }

  function typeLabel(type) {
    if (type === 'taluka') return 'Taluka';
    if (type === 'city') return 'City';
    if (type === 'town') return 'Town';
    if (type === 'village') return 'Village';
    return 'Current Location';
  }

  /** Secondary line for a search suggestion; includes taluka for Goa
   * towns/villages since duplicate village names are disambiguated by it. */
  function searchMetaLine(place) {
    const parts = [place.state || 'India'];
    if (place.taluka && (place.type === 'town' || place.type === 'village')) {
      parts.push(`${place.taluka} taluka`);
    } else {
      parts.push(typeLabel(place.type));
    }
    return parts.join(' • ');
  }

  /** Small text under the state/type line: taluka + district for Goa
   * places, or just the district for a taluka itself. */
  function districtLineFor(place) {
    if (place.type === 'taluka' && place.district) {
      return `${place.district} District`;
    }
    if ((place.type === 'town' || place.type === 'village') && place.taluka) {
      return `${place.taluka} Taluka, ${place.district || ''}`.replace(/,\s*$/, '');
    }
    return null;
  }

  function renderSearchResults(results) {
    if (results.length === 0) {
      hideSearchResults();
      return;
    }
    els.searchResults.innerHTML = results
      .map(
        (place, i) => `
      <div class="search-result" role="option" data-index="${i}">
        <span class="sr-name">${escapeHtml(place.name)}</span>
        <span class="sr-meta">${escapeHtml(searchMetaLine(place))}</span>
      </div>`
      )
      .join('');
    els.searchResults.classList.remove('hidden');

    els.searchResults.querySelectorAll('.search-result').forEach((node, i) => {
      node.addEventListener('click', () => {
        const place = results[i];
        hideSearchResults();
        els.input.value = place.name;
        loadForLocation(place);
      });
    });
  }

  function hideSearchResults() {
    els.searchResults.classList.add('hidden');
    els.searchResults.innerHTML = '';
  }

  function handleChipClick(event) {
    const chip = event.target.closest('.chip');
    if (!chip) return;
    const matches = LocationsDB.search(chip.dataset.place);
    if (matches.length === 0) return; // chip labels always match the DB by construction
    els.input.value = chip.dataset.place;
    loadForLocation(matches[0]);
  }

  // ---- rendering ---------------------------------------------------------

  function render(weatherData, place) {
    lastWeatherData = weatherData;
    currentPlace = place;
    renderCurrent(weatherData, place);
    renderHourly(weatherData.hourly, weatherData.current.time);
    renderRainTiming(weatherData);
    renderWeatherRisk(weatherData);
    renderBestDay(weatherData);
    renderDaily(weatherData.daily);
    renderActivities(weatherData);
    armLazySection(els.weatherMapSection, 'map', () => loadWeatherMap(place));
    armLazySection(els.historicalSection, 'historical', () => loadHistorical(place));
    armLazySection(els.rainfallTrackerSection, 'rainfall', () => loadRainfallTracker(place));

    els.notifLocation.textContent = `📍 ${place.name}, ${place.state || 'India'}`;
    NotificationService.updateContext(weatherData, place.name);
  }

  function renderCurrent(weatherData, place) {
    const c = weatherData.current;
    els.currentName.textContent = place.name;
    els.currentState.textContent = place.state || 'India';
    els.currentType.textContent = typeLabel(place.type);

    const districtLine = districtLineFor(place);
    if (districtLine) {
      els.currentDistrict.textContent = districtLine;
      els.currentDistrict.classList.remove('hidden');
    } else {
      els.currentDistrict.classList.add('hidden');
    }

    els.currentIcon.textContent = c.icon;
    els.currentTemp.textContent = `${round(c.temperature)}°C`;
    els.currentDesc.textContent = c.description;
    els.currentFeels.textContent = `${round(c.feelsLike)}°C`;
    els.statHumidity.textContent = `${round(c.humidity)}%`;
    els.statWind.textContent = `${round(c.windSpeed)} km/h ${c.windDirectionLabel}`;
    els.statRain.textContent = `${round(c.precipitationProbability)}%`;
    els.statRainfall.textContent = `${c.precipitation.toFixed(1)} mm`;
    els.statUv.textContent = `${c.uvIndex.toFixed(1)}`;
    els.statClouds.textContent = `${round(c.cloudCover)}%`;
    els.statPressure.textContent = `${round(c.pressure)} hPa`;
    els.statVisibility.textContent = c.visibility != null ? `${(c.visibility / 1000).toFixed(1)} km` : 'N/A';
    els.statSunrise.textContent = weatherData.sunrise ? formatTime(weatherData.sunrise) : '--:--';
    els.statSunset.textContent = weatherData.sunset ? formatTime(weatherData.sunset) : '--:--';
  }

  function renderHourly(hourly, currentTimeIso) {
    const now = new Date(currentTimeIso).getTime();
    const upcoming = hourly.filter((h) => new Date(h.time).getTime() >= now - 30 * 60 * 1000).slice(0, 24);

    els.hourlyScroll.innerHTML = upcoming
      .map(
        (h) => `
      <div class="hourly-item">
        <div class="hourly-time">${formatTime(h.time)}</div>
        <div class="hourly-icon">${h.icon}</div>
        <div class="hourly-temp">${round(h.temperature)}°</div>
        <div class="hourly-rain">💧 ${round(h.precipitationProbability)}%</div>
      </div>`
      )
      .join('');
  }

  function renderRainTiming(weatherData) {
    const r = RainTiming.analyze(weatherData);

    const statusLine = r.rainWindow
      ? `<div class="rain-stat"><span class="label">Next expected rain</span><span class="value">${r.nextRainTime}</span></div>
         <div class="rain-stat"><span class="label">Rain probability</span><span class="value">${r.probability}%</span></div>
         ${r.rainfallAmount != null ? `<div class="rain-stat"><span class="label">Expected rainfall</span><span class="value">${r.rainfallAmount} mm</span></div>` : ''}`
      : '';

    const timelineHtml = r.timeline
      .map(
        (h) => `
      <div class="rain-timeline-item ${h.probability >= RainTiming.RAIN_PROBABILITY_THRESHOLD ? 'is-rain' : ''}">
        <div class="rt-time">${h.time}</div>
        <div class="rt-icon">${h.icon}</div>
        <div class="rt-prob">💧 ${h.probability}%</div>
      </div>`
      )
      .join('');

    els.rainTimingBody.innerHTML = `
      <p class="rain-current-status">${escapeHtml(r.currentStatusText)}</p>
      ${statusLine ? `<div class="rain-stats-row">${statusLine}</div>` : ''}
      <div class="rain-timeline">${timelineHtml}</div>
      <p class="rain-summary">${escapeHtml(r.summary)}</p>
      ${r.bestOutdoorTime ? `<p class="rain-best-time"><strong>Best outdoor time:</strong> ${escapeHtml(r.bestOutdoorTime)}</p>` : ''}
    `;
  }

  function renderWeatherRisk(weatherData) {
    const risks = WeatherRisk.assess(weatherData);

    if (risks.length === 0) {
      els.weatherRiskBody.innerHTML = `
        <div class="risk-card severity-normal">
          <span class="risk-icon">🟢</span>
          <div>
            <div class="risk-title">Normal</div>
            <p class="risk-message">No significant weather risks right now.</p>
          </div>
        </div>`;
      return;
    }

    const severityDot = { moderate: '🟡', high: '🟠', severe: '🔴' };
    els.weatherRiskBody.innerHTML = risks
      .map(
        (r) => `
      <div class="risk-card severity-${r.severity}">
        <span class="risk-icon">${r.icon}</span>
        <div>
          <div class="risk-title">${severityDot[r.severity]} ${escapeHtml(r.title.toUpperCase())}</div>
          <p class="risk-message">${escapeHtml(r.message)}</p>
        </div>
      </div>`
      )
      .join('');
  }

  function renderBestDay(weatherData) {
    const top = BestDay.rank(weatherData, bestDayActivity);
    const medals = ['🥇', '🥈', '🥉'];
    els.bestDayBody.innerHTML = top
      .map(
        (d, i) => `
      <div class="best-day-item">
        <span class="best-day-medal">${medals[i] || ''}</span>
        <span class="best-day-icon">${d.icon}</span>
        <div class="best-day-info">
          <div class="best-day-name">${escapeHtml(d.label)}</div>
          <div class="best-day-desc">${escapeHtml(d.description)} • ${round(d.tempMax)}°/${round(d.tempMin)}° • 💧 ${round(d.precipitationProbabilityMax)}%</div>
        </div>
        <div class="best-day-score badge-${d.rating.toLowerCase()}">${d.score}% — ${d.rating}</div>
      </div>`
      )
      .join('');
  }

  // ---- lazy-loaded sections (Weather History, Rainfall Tracker) ---------

  const lazyObservers = {};

  /** Resets a section to its placeholder and loads it once the user scrolls it into view. */
  function armLazySection(sectionEl, key, loadFn) {
    if (lazyObservers[key]) lazyObservers[key].disconnect();
    const body = sectionEl.querySelector('[id$="-body"]');
    if (body) body.innerHTML = '<p class="lazy-placeholder">Scroll here to load…</p>';

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          loadFn();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(sectionEl);
    lazyObservers[key] = observer;
  }

  async function loadWeatherMap(place) {
    els.weatherMapStatus.textContent = 'Loading map…';
    els.weatherMapStatus.classList.remove('hidden');
    els.weatherMapContainer.classList.remove('hidden');
    try {
      await WeatherMap.show('weather-map-container', place, weatherMapLayer);
      els.weatherMapStatus.classList.add('hidden');
    } catch (err) {
      els.weatherMapContainer.classList.add('hidden');
      els.weatherMapStatus.textContent = err.message || 'Weather map could not be loaded. Please try again.';
      els.weatherMapStatus.classList.remove('hidden');
    }
  }

  async function loadHistorical(place) {
    els.historicalBody.innerHTML = '<p class="section-loading">Loading historical weather…</p>';
    try {
      const stats = await HistoricalWeather.fetchRange(place.latitude, place.longitude, historicalRange);
      renderHistorical(stats, place);
    } catch (err) {
      els.historicalBody.innerHTML = `<p class="section-error">${escapeHtml(err.message || 'Historical weather data is currently unavailable for this location.')}</p>`;
    }
  }

  function renderHistorical(stats, place) {
    els.historicalBody.innerHTML = `
      <p class="historical-location">${escapeHtml(place.name)}, ${escapeHtml(place.state || 'India')} • ${escapeHtml(stats.rangeLabel)}</p>
      <div class="historical-stats">
        <div class="hist-stat"><span class="label">Average Temperature</span><span class="value">${stats.avgTemp}°C</span></div>
        <div class="hist-stat"><span class="label">Highest</span><span class="value">${round(stats.highTemp)}°C</span></div>
        <div class="hist-stat"><span class="label">Lowest</span><span class="value">${round(stats.lowTemp)}°C</span></div>
        <div class="hist-stat"><span class="label">Rainfall</span><span class="value">${stats.totalRainfall} mm</span></div>
        <div class="hist-stat"><span class="label">Rainy Days</span><span class="value">${stats.rainyDays} / ${stats.dayCount}</span></div>
      </div>
    `;
  }

  async function loadRainfallTracker(place) {
    els.rainfallTrackerBody.innerHTML = '<p class="section-loading">Loading rainfall history…</p>';
    try {
      const [monthly, yoy] = await Promise.all([
        HistoricalWeather.monthlyRainfall(place.latitude, place.longitude, 4),
        HistoricalWeather.yearOverYearRainfall(place.latitude, place.longitude),
      ]);
      renderRainfallTracker(monthly, yoy);
    } catch (err) {
      els.rainfallTrackerBody.innerHTML = `<p class="section-error">${escapeHtml(err.message || 'Historical weather data is currently unavailable for this location.')}</p>`;
    }
  }

  function renderRainfallTracker(monthly, yoy) {
    const maxTotal = Math.max(...monthly.map((m) => m.total), 1);
    const barsHtml = monthly
      .map((m) => {
        const pct = Math.max(4, Math.round((m.total / maxTotal) * 100));
        return `
        <div class="rainfall-bar-row">
          <span class="rainfall-bar-label">${escapeHtml(m.label)}${m.isCurrentMonth ? ' (so far)' : ''}</span>
          <div class="rainfall-bar-track"><div class="rainfall-bar-fill" style="width:${pct}%"></div></div>
          <span class="rainfall-bar-value">${m.total} mm</span>
        </div>`;
      })
      .join('');

    const comparisonHtml =
      yoy.percentDiff == null
        ? ''
        : `<p class="rainfall-comparison">${yoy.percentDiff >= 0 ? '+' : ''}${yoy.percentDiff}% vs the same period last year (${yoy.lastYear} mm)</p>`;

    els.rainfallTrackerBody.innerHTML = `
      <p class="rainfall-headline">${escapeHtml(yoy.monthLabel)} so far: <strong>${yoy.thisYear} mm</strong></p>
      ${comparisonHtml}
      <div class="rainfall-bars">${barsHtml}</div>
    `;
  }

  function renderDaily(daily) {
    els.dailyList.innerHTML = daily
      .map(
        (d, i) => `
      <div class="daily-item">
        <div class="daily-day">${i === 0 ? 'Today' : formatDay(d.date)}</div>
        <div class="daily-icon">${d.icon}</div>
        <div class="daily-desc">${d.description}</div>
        <div class="daily-rain">💧 ${round(d.precipitationProbabilityMax)}%</div>
        <div class="daily-temps">
          <span class="temp-max">${round(d.tempMax)}°</span>
          <span class="temp-min">${round(d.tempMin)}°</span>
        </div>
      </div>`
      )
      .join('');
  }

  function renderActivities(weatherData) {
    const recommendations = DecisionEngine.getAllRecommendations(weatherData);
    els.activityGrid.innerHTML = recommendations
      .map((rec) => {
        const ratingClass = rec.rating.toLowerCase();
        return `
        <div class="activity-card rating-${ratingClass}">
          <div class="activity-header">
            <span class="activity-icon">${rec.icon}</span>
            <div>
              <div class="activity-name">${rec.name}</div>
              <div class="activity-rating badge-${ratingClass}">${rec.rating}</div>
            </div>
            <div class="activity-score">${rec.score}<span>/100</span></div>
          </div>
          <div class="activity-best-time">
            <span class="label">Best time</span>
            <span class="value">${rec.bestTime}</span>
          </div>
          <ul class="activity-reasons">
            ${rec.reasons.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}
          </ul>
          <p class="activity-advice">${escapeHtml(rec.advice)}</p>
        </div>`;
      })
      .join('');
  }

  // ---- helpers -------------------------------------------------------

  function round(n) {
    return Math.round(n);
  }

  function formatTime(iso) {
    return new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  function formatDay(dateStr) {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString([], { weekday: 'short' });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ---- wiring ----------------------------------------------------------

  els.form.addEventListener('submit', handleSearchSubmit);
  els.input.addEventListener('input', handleSearchInput);
  els.input.addEventListener('blur', () => setTimeout(hideSearchResults, 150));
  els.useLocationBtn.addEventListener('click', handleUseLocation);
  els.retryBtn.addEventListener('click', () => {
    if (lastAction) lastAction();
  });
  els.quickCities.addEventListener('click', handleChipClick);
  els.quickTalukas.addEventListener('click', handleChipClick);
  els.bestDayTabs.addEventListener('click', (event) => {
    const tab = event.target.closest('.tab-btn');
    if (!tab || !lastWeatherData) return;
    bestDayActivity = tab.dataset.activity;
    els.bestDayTabs.querySelectorAll('.tab-btn').forEach((btn) => btn.classList.toggle('active', btn === tab));
    renderBestDay(lastWeatherData);
  });
  els.weatherMapTabs.addEventListener('click', (event) => {
    const tab = event.target.closest('.tab-btn');
    if (!tab || !currentPlace) return;
    weatherMapLayer = tab.dataset.layer;
    els.weatherMapTabs.querySelectorAll('.tab-btn').forEach((btn) => btn.classList.toggle('active', btn === tab));
    loadWeatherMap(currentPlace);
  });
  els.historicalTabs.addEventListener('click', (event) => {
    const tab = event.target.closest('.tab-btn');
    if (!tab || !currentPlace) return;
    historicalRange = tab.dataset.range;
    els.historicalTabs.querySelectorAll('.tab-btn').forEach((btn) => btn.classList.toggle('active', btn === tab));
    loadHistorical(currentPlace);
  });

  // ---- weather alerts (notifications) -----------------------------------

  function updatePermissionNote() {
    const state = NotificationService.permissionState();
    els.notifPermissionNote.className = 'notif-permission-note state-' + state;
    if (state === 'unsupported') {
      els.notifPermissionNote.textContent = 'Browser notifications are not supported on this device.';
    } else if (state === 'denied') {
      els.notifPermissionNote.textContent = 'Notifications are blocked. You can enable them from your browser settings.';
    } else if (state === 'granted') {
      els.notifPermissionNote.textContent = 'Notifications are enabled for this site.';
    } else {
      els.notifPermissionNote.textContent = '';
    }
    const disabled = state === 'unsupported';
    els.notifRainToggle.disabled = disabled;
    els.notifSevereToggle.disabled = disabled;
  }

  async function handleAlertToggle(toggleEl, prefKey) {
    if (!toggleEl.checked) {
      NotificationService.setPreferences({ [prefKey]: false });
      updateBellBadge();
      return;
    }
    const state = await NotificationService.requestPermission();
    updatePermissionNote();
    if (state !== 'granted') {
      toggleEl.checked = false; // can't actually notify — don't leave the toggle in a lying state
      return;
    }
    NotificationService.setPreferences({ [prefKey]: true });
    updateBellBadge();
  }

  function updateBellBadge() {
    const anyOn = els.notifRainToggle.checked || els.notifSevereToggle.checked;
    els.notifBell.classList.toggle('has-alert', anyOn && NotificationService.permissionState() === 'granted');
  }

  els.notifBell.addEventListener('click', (event) => {
    event.stopPropagation();
    updatePermissionNote();
    els.notifPanel.classList.toggle('hidden');
  });
  document.addEventListener('click', (event) => {
    if (!els.notifPanel.classList.contains('hidden') && !els.notifPanel.contains(event.target) && event.target !== els.notifBell) {
      els.notifPanel.classList.add('hidden');
    }
  });
  els.notifRainToggle.addEventListener('change', () => handleAlertToggle(els.notifRainToggle, 'rainAlerts'));
  els.notifSevereToggle.addEventListener('change', () => handleAlertToggle(els.notifSevereToggle, 'severeAlerts'));

  NotificationService.onImminentRainChange((info) => {
    if (!info) {
      els.rainBanner.classList.add('hidden');
      return;
    }
    els.rainBannerBody.textContent = `Rain may begin around ${info.time} (in about ${info.minutes} minutes).`;
    els.rainBanner.classList.remove('hidden');
  });
  updatePermissionNote();
  NotificationService.start();
  NotificationService.registerServiceWorker();

  showState('empty');
})();

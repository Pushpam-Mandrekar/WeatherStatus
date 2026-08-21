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
  };

  let lastAction = null; // remembers how to retry after an error

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
    renderCurrent(weatherData, place);
    renderHourly(weatherData.hourly, weatherData.current.time);
    renderDaily(weatherData.daily);
    renderActivities(weatherData);
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

  showState('empty');
})();

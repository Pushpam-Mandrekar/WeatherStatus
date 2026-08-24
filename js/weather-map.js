/**
 * weather-map.js
 * A Leaflet map (OpenStreetMap tiles, free, no key) with three switchable
 * layers:
 *  - Rain: live radar imagery from RainViewer's public tile API (free, no
 *    key, confirmed at https://api.rainviewer.com/public/weather-maps.json).
 *  - Temperature / Wind: NOT continuous heatmap tiles — those require a
 *    keyed provider (e.g. OpenWeatherMap) this app has no backend to hold
 *    a key for. Instead, markers at the selected location and nearby
 *    curated locations, each showing a real fetched value. Every number
 *    on the map is real Open-Meteo data, never estimated.
 */

(function () {
  const RAINVIEWER_INDEX_URL = 'https://api.rainviewer.com/public/weather-maps.json';
  const MAX_NEARBY_MARKERS = 6;
  const NEARBY_RADIUS_KM = 60;

  let map = null;
  let baseLayer = null;
  let rainLayer = null;
  let markerLayerGroup = null;
  const weatherCache = new Map(); // "lat,lon" -> weatherData, avoids refetching between tab switches

  function haversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function nearbyLocations(place) {
    return LocationsDB.ALL_LOCATIONS.filter((loc) => loc.name !== place.name || loc.latitude !== place.latitude)
      .map((loc) => ({ loc, dist: haversineKm(place.latitude, place.longitude, loc.latitude, loc.longitude) }))
      .filter((entry) => entry.dist <= NEARBY_RADIUS_KM)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, MAX_NEARBY_MARKERS)
      .map((entry) => entry.loc);
  }

  async function weatherFor(lat, lon) {
    const key = `${lat.toFixed(3)},${lon.toFixed(3)}`;
    if (weatherCache.has(key)) return weatherCache.get(key);
    const data = await WeatherService.fetchWeather(lat, lon);
    weatherCache.set(key, data);
    return data;
  }

  function divIcon(label, className) {
    return L.divIcon({
      html: `<div class="wm-marker ${className}">${label}</div>`,
      className: 'wm-marker-wrap',
      iconSize: null,
    });
  }

  function windArrow(degrees) {
    // Wind direction is "from"; rotate an upward arrow to point where it's blowing toward.
    return `<span style="display:inline-block; transform: rotate(${degrees + 180}deg);">↑</span>`;
  }

  async function buildMarkers(place, mode) {
    const points = [place, ...nearbyLocations(place)];
    const group = L.layerGroup();

    await Promise.all(
      points.map(async (p) => {
        let data;
        try {
          data = await weatherFor(p.latitude, p.longitude);
        } catch (err) {
          return; // skip a point whose weather couldn't be fetched, never show a fake value
        }
        const c = data.current;
        const label =
          mode === 'temperature' ? `${Math.round(c.temperature)}°` : `${windArrow(c.windDirection)} ${Math.round(c.windSpeed)}`;
        const marker = L.marker([p.latitude, p.longitude], {
          icon: divIcon(label, mode === 'temperature' ? 'wm-temp' : 'wm-wind'),
        });
        marker.bindPopup(
          `<strong>${p.name}</strong><br>${c.description}<br>${Math.round(c.temperature)}°C, feels ${Math.round(c.feelsLike)}°C<br>Wind ${Math.round(c.windSpeed)} km/h ${c.windDirectionLabel}`
        );
        marker.addTo(group);
      })
    );

    return group;
  }

  async function rainTileLayer() {
    let response;
    try {
      response = await fetch(RAINVIEWER_INDEX_URL);
    } catch (err) {
      throw new Error('Weather map could not be loaded. Please try again.');
    }
    if (!response.ok) throw new Error('Weather map could not be loaded. Please try again.');
    const index = await response.json();
    const frames = index.radar && index.radar.past;
    if (!frames || frames.length === 0) throw new Error('Weather map could not be loaded. Please try again.');
    const latest = frames[frames.length - 1];
    return L.tileLayer(`${index.host}${latest.path}/256/{z}/{x}/{y}/2/1_1.png`, {
      opacity: 0.6,
      attribution: 'Radar © RainViewer',
      maxNativeZoom: 7, // RainViewer's radar tiles only go up to z7; Leaflet upscales beyond that
    });
  }

  async function setLayer(place, mode) {
    if (markerLayerGroup) {
      map.removeLayer(markerLayerGroup);
      markerLayerGroup = null;
    }
    if (rainLayer) {
      map.removeLayer(rainLayer);
      rainLayer = null;
    }

    if (mode === 'rain') {
      rainLayer = await rainTileLayer();
      rainLayer.addTo(map);
    } else {
      markerLayerGroup = await buildMarkers(place, mode);
      markerLayerGroup.addTo(map);
    }
  }

  /** Creates the map (once) or recenters an existing one, then shows `mode`. */
  async function show(containerId, place, mode) {
    if (!map) {
      map = L.map(containerId, { scrollWheelZoom: false }).setView([place.latitude, place.longitude], 10);
      baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      });
      baseLayer.addTo(map);
    } else {
      map.setView([place.latitude, place.longitude], 10);
      map.invalidateSize();
    }
    await setLayer(place, mode);
  }

  function destroy() {
    if (map) {
      map.remove();
      map = null;
      rainLayer = null;
      markerLayerGroup = null;
    }
  }

  window.WeatherMap = { show, destroy };
})();

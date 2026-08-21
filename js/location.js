/**
 * location.js
 * Handles the "use my location" (GPS) flow only. Text search is handled
 * entirely by the curated database in locations-db.js — this file never
 * does live geocoding for search, only reverse-geocoding a GPS fix into a
 * display name via OpenStreetMap Nominatim (free, no API key). GPS
 * coordinates are exact by definition, so this isn't a "substitution" —
 * it's showing wherever the browser says the user actually is.
 */

(function () {
const REVERSE_GEOCODE_URL = 'https://nominatim.openstreetmap.org/reverse';

/**
 * Ask the browser for the user's current position.
 * Rejects with a human-readable message on denial/timeout/unsupported.
 */
function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          reject(new Error('Location access was denied. Please search for a city instead.'));
        } else if (error.code === error.TIMEOUT) {
          reject(new Error('Location request timed out. Please try again or search for a city.'));
        } else {
          reject(new Error('Could not determine your location. Please search for a city.'));
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 }
    );
  });
}

/**
 * Turn coordinates into a display name + state via Nominatim (OpenStreetMap).
 * zoom=12 is tuned to resolve both metros ("Mumbai") and smaller towns
 * ("Shirdi") to their settlement name rather than a district/county.
 * Returns a location-shaped object so the UI can render it the same way
 * as a curated database match, just tagged as 'gps' instead of a type.
 */
async function reverseGeocode(latitude, longitude) {
  const url = `${REVERSE_GEOCODE_URL}?lat=${latitude}&lon=${longitude}&format=json&zoom=12&addressdetails=1`;
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error('Reverse geocoding failed');
  }
  const data = await response.json();
  const addr = data.address || {};
  const name = addr.city || addr.town || addr.village || addr.county || addr.state_district || data.name;
  if (!name) {
    throw new Error('No place name found for these coordinates');
  }
  return {
    name,
    type: 'gps',
    state: addr.state || '',
    latitude,
    longitude,
  };
}

window.LocationService = {
  getCurrentPosition,
  reverseGeocode,
};
})();

/**
 * locations-db.js
 * The curated, offline location database this app searches against. Search
 * is deliberately NOT a live geocoding lookup — it only ever matches names
 * (and aliases) in this fixed list, so results are predictable and a miss
 * is always a real miss, never a silently-approximated nearby place.
 *
 * Scope, as designed: all 12 Goa talukas, every Goa town/village (from
 * goa-villages-data.js, loaded before this file), and a curated set of
 * major Indian cities. Not every village in India — see app requirements.
 *
 * Each entry: { name, type: 'taluka'|'city'|'town'|'village', state,
 * district?, taluka?, latitude, longitude, aliases? }. Taluka coordinates
 * were resolved against Open-Meteo's geocoding database (headquarters
 * town). Aliases that duplicate a standalone Goa town/village entry
 * (e.g. Mapusa, Margao, Panaji) are deliberately omitted here — search
 * finds those through the more precise standalone entry instead.
 */

(function () {
const GOA_TALUKAS = [
  { name: 'Bardez', type: 'taluka', state: 'Goa', district: 'North Goa', latitude: 15.5915, longitude: 73.8090 },
  { name: 'Bicholim', type: 'taluka', state: 'Goa', district: 'North Goa', latitude: 15.5932, longitude: 73.9457 },
  { name: 'Pernem', type: 'taluka', state: 'Goa', district: 'North Goa', latitude: 15.7230, longitude: 73.7951 },
  { name: 'Sattari', type: 'taluka', state: 'Goa', district: 'North Goa', latitude: 15.5324, longitude: 74.1367 },
  { name: 'Tiswadi', type: 'taluka', state: 'Goa', district: 'North Goa', latitude: 15.4957, longitude: 73.8262, aliases: ['Panjim', 'Ilhas'] },
  { name: 'Canacona', type: 'taluka', state: 'Goa', district: 'South Goa', latitude: 14.9959, longitude: 74.0506, aliases: ['Chaudi'] },
  { name: 'Dharbandora', type: 'taluka', state: 'Goa', district: 'South Goa', latitude: 15.2627, longitude: 74.1197 },
  { name: 'Mormugao', type: 'taluka', state: 'Goa', district: 'South Goa', latitude: 15.3959, longitude: 73.8157, aliases: ['Vasco'] },
  { name: 'Quepem', type: 'taluka', state: 'Goa', district: 'South Goa', latitude: 15.2128, longitude: 74.0772 },
  { name: 'Salcete', type: 'taluka', state: 'Goa', district: 'South Goa', latitude: 15.2750, longitude: 73.9579, aliases: ['Madgaon'] },
  { name: 'Sanguem', type: 'taluka', state: 'Goa', district: 'South Goa', latitude: 15.2290, longitude: 74.1515 },
  { name: 'Ponda', type: 'taluka', state: 'Goa', district: 'South Goa', latitude: 15.4034, longitude: 74.0152 },
];

/** Every Goa town/village, pre-enriched with taluka + district. See goa-villages-data.js. */
const GOA_VILLAGES = window.GOA_VILLAGES_DATA || [];

const INDIAN_CITIES = [
  { name: 'Mumbai', type: 'city', state: 'Maharashtra', latitude: 19.0728, longitude: 72.8826, aliases: ['Bombay'] },
  { name: 'Delhi', type: 'city', state: 'Delhi', latitude: 28.6519, longitude: 77.2315, aliases: ['New Delhi'] },
  { name: 'Bengaluru', type: 'city', state: 'Karnataka', latitude: 12.9719, longitude: 77.5937, aliases: ['Bangalore'] },
  { name: 'Chennai', type: 'city', state: 'Tamil Nadu', latitude: 13.0878, longitude: 80.2785, aliases: ['Madras'] },
  { name: 'Kolkata', type: 'city', state: 'West Bengal', latitude: 22.5626, longitude: 88.3630, aliases: ['Calcutta'] },
  { name: 'Hyderabad', type: 'city', state: 'Telangana', latitude: 17.3841, longitude: 78.4564 },
  { name: 'Pune', type: 'city', state: 'Maharashtra', latitude: 18.5196, longitude: 73.8554 },
  { name: 'Ahmedabad', type: 'city', state: 'Gujarat', latitude: 23.0258, longitude: 72.5873 },
  { name: 'Jaipur', type: 'city', state: 'Rajasthan', latitude: 26.9196, longitude: 75.7878 },
  { name: 'Lucknow', type: 'city', state: 'Uttar Pradesh', latitude: 26.8393, longitude: 80.9231 },
  { name: 'Surat', type: 'city', state: 'Gujarat', latitude: 21.1959, longitude: 72.8302 },
  { name: 'Kanpur', type: 'city', state: 'Uttar Pradesh', latitude: 26.4652, longitude: 80.3498 },
  { name: 'Nagpur', type: 'city', state: 'Maharashtra', latitude: 21.1463, longitude: 79.0849 },
  { name: 'Indore', type: 'city', state: 'Madhya Pradesh', latitude: 22.7179, longitude: 75.8333 },
  { name: 'Thane', type: 'city', state: 'Maharashtra', latitude: 19.1970, longitude: 72.9636 },
  { name: 'Bhopal', type: 'city', state: 'Madhya Pradesh', latitude: 23.2547, longitude: 77.4029 },
  { name: 'Visakhapatnam', type: 'city', state: 'Andhra Pradesh', latitude: 17.6801, longitude: 83.2016, aliases: ['Vizag'] },
  { name: 'Patna', type: 'city', state: 'Bihar', latitude: 25.5941, longitude: 85.1356 },
  { name: 'Vadodara', type: 'city', state: 'Gujarat', latitude: 22.2994, longitude: 73.2081, aliases: ['Baroda'] },
  { name: 'Ghaziabad', type: 'city', state: 'Uttar Pradesh', latitude: 28.6653, longitude: 77.4392 },
  { name: 'Ludhiana', type: 'city', state: 'Punjab', latitude: 30.9120, longitude: 75.8538 },
  { name: 'Agra', type: 'city', state: 'Uttar Pradesh', latitude: 27.1833, longitude: 78.0167 },
  { name: 'Nashik', type: 'city', state: 'Maharashtra', latitude: 19.9973, longitude: 73.7910 },
  { name: 'Faridabad', type: 'city', state: 'Haryana', latitude: 28.4112, longitude: 77.3132 },
  { name: 'Meerut', type: 'city', state: 'Uttar Pradesh', latitude: 28.9800, longitude: 77.7064 },
  { name: 'Rajkot', type: 'city', state: 'Gujarat', latitude: 22.2916, longitude: 70.7932 },
  { name: 'Varanasi', type: 'city', state: 'Uttar Pradesh', latitude: 25.3167, longitude: 83.0104, aliases: ['Banaras', 'Kashi'] },
  { name: 'Srinagar', type: 'city', state: 'Jammu and Kashmir', latitude: 34.0857, longitude: 74.8056 },
  { name: 'Amritsar', type: 'city', state: 'Punjab', latitude: 31.6223, longitude: 74.8753 },
  { name: 'Chandigarh', type: 'city', state: 'Chandigarh', latitude: 30.7363, longitude: 76.7884 },
  { name: 'Gurugram', type: 'city', state: 'Haryana', latitude: 28.4601, longitude: 77.0264, aliases: ['Gurgaon'] },
  { name: 'Noida', type: 'city', state: 'Uttar Pradesh', latitude: 28.5800, longitude: 77.3300 },
  { name: 'Coimbatore', type: 'city', state: 'Tamil Nadu', latitude: 11.0056, longitude: 76.9661 },
  { name: 'Kochi', type: 'city', state: 'Kerala', latitude: 9.9399, longitude: 76.2602, aliases: ['Cochin'] },
  { name: 'Thiruvananthapuram', type: 'city', state: 'Kerala', latitude: 8.4855, longitude: 76.9492, aliases: ['Trivandrum'] },
  { name: 'Guwahati', type: 'city', state: 'Assam', latitude: 26.1844, longitude: 91.7458 },
  { name: 'Bhubaneswar', type: 'city', state: 'Odisha', latitude: 20.2724, longitude: 85.8339 },
  { name: 'Dehradun', type: 'city', state: 'Uttarakhand', latitude: 30.3244, longitude: 78.0339 },
  { name: 'Shimla', type: 'city', state: 'Himachal Pradesh', latitude: 31.1044, longitude: 77.1666 },
  { name: 'Ranchi', type: 'city', state: 'Jharkhand', latitude: 23.3432, longitude: 85.3094 },
  { name: 'Raipur', type: 'city', state: 'Chhattisgarh', latitude: 21.2333, longitude: 81.6333 },
  { name: 'Jodhpur', type: 'city', state: 'Rajasthan', latitude: 26.2684, longitude: 73.0059 },
  { name: 'Mysuru', type: 'city', state: 'Karnataka', latitude: 12.2979, longitude: 76.6393, aliases: ['Mysore'] },
  { name: 'Madurai', type: 'city', state: 'Tamil Nadu', latitude: 9.9190, longitude: 78.1195 },
  { name: 'Vijayawada', type: 'city', state: 'Andhra Pradesh', latitude: 16.5075, longitude: 80.6466 },
  { name: 'Imphal', type: 'city', state: 'Manipur', latitude: 24.8081, longitude: 93.9442 },
  { name: 'Shillong', type: 'city', state: 'Meghalaya', latitude: 25.5689, longitude: 91.8831 },
  { name: 'Gangtok', type: 'city', state: 'Sikkim', latitude: 27.3257, longitude: 88.6122 },
  { name: 'Puducherry', type: 'city', state: 'Puducherry', latitude: 11.9338, longitude: 79.8298, aliases: ['Pondicherry'] },
  { name: 'Leh', type: 'city', state: 'Ladakh', latitude: 34.1650, longitude: 77.5840 },
];

const ALL_LOCATIONS = [...GOA_TALUKAS, ...GOA_VILLAGES, ...INDIAN_CITIES];

function normalize(str) {
  return str.trim().toLowerCase();
}

/**
 * Rank a location against a query: 0 = no match, higher = better match.
 * Exact name match beats a name that merely starts with the query, which
 * beats a name that merely contains it; alias matches rank below name
 * matches at the same tier so a real place name is always preferred.
 */
function matchRank(location, q) {
  const name = normalize(location.name);
  if (name === q) return 100;
  if (name.startsWith(q)) return 80;
  if (name.includes(q)) return 60;

  for (const alias of location.aliases || []) {
    const a = normalize(alias);
    if (a === q) return 90;
    if (a.startsWith(q)) return 70;
    if (a.includes(q)) return 50;
  }
  return 0;
}

/**
 * Search the curated database only — never falls back to a live geocoder,
 * so an empty result here is a genuine "not supported", not a network gap.
 */
function search(query) {
  const q = normalize(query);
  if (!q) return [];

  return ALL_LOCATIONS.map((loc) => ({ loc, rank: matchRank(loc, q) }))
    .filter((entry) => entry.rank > 0)
    .sort((a, b) => b.rank - a.rank)
    .slice(0, 8)
    .map((entry) => entry.loc);
}

window.LocationsDB = {
  ALL_LOCATIONS,
  GOA_TALUKAS,
  GOA_VILLAGES,
  INDIAN_CITIES,
  search,
};
})();

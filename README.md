# Weather Decision Assistant 🇮🇳

This is completely vibe coded using Claude Code.

It's not a traditional weather app — the goal is to use forecast data to help you decide whether conditions are actually good for something (a walk, a ride, hanging laundry out) rather than just showing you numbers.

The app is India-focused, with a special focus on **Goa**: every village, town and taluka in Goa is searchable, sourced from the latest Census 2011 village directory records, alongside a curated list of major Indian cities.

## Features

**Location search**
- Search any of Goa's 12 talukas, or any of its ~330 villages/towns, by name
- Search 50 major Indian cities (Mumbai, Delhi, Bengaluru, Chennai, Kolkata, Hyderabad, Pune, and more)
- Case-insensitive, partial matching (typing "Mum" finds Mumbai)
- Common aliases work too (Bombay → Mumbai, Bangalore → Bengaluru, Panjim → Tiswadi, Vasco → Mormugao, ...)
- Duplicate village names (a handful of Goan villages share a name across different talukas) are disambiguated in the suggestions dropdown by showing which taluka each one is in
- "Use my location" resolves your GPS position to a place name — works anywhere, not just the curated list
- Search is a fixed, offline lookup, not a live geocoder — searching something outside the supported list always returns a clear "No results found for X", never a silently substituted nearby place

**Weather dashboard**
- Current temperature, feels-like, condition, humidity, wind speed + direction, rain probability, rainfall, UV index, cloud cover, atmospheric pressure, visibility, sunrise/sunset
- 24-hour hourly forecast strip
- 7-day forecast
- A location header showing exactly what was matched: name, state, type (Taluka / City / Town / Village), and district/taluka context

**Decision Assistant** — the main feature
- Six everyday activities, each independently scored: Walking, Running, Cycling, Laundry, Car Washing, Photography
- Deterministic, rule-based scoring (0–100) against temperature, feels-like, rain probability, wind, UV, humidity, cloud cover and visibility — no AI/LLM calls, so it works with zero API keys
- A rating band (Excellent / Good / Fair / Poor / Avoid) plus the specific reasons behind the score
- A "best time" window: scans the day's hourly forecast (restricted to daylight hours) and finds the best 2-hour block for that activity, rather than just judging the current instant
- Modular — new activities are added by pushing one object with an `evaluate()` function onto a list

**UI**
- Clean, responsive layout (desktop + mobile)
- Distinct states for empty, loading, no-results, API/data error, and loaded content
- Quick-access chips for popular cities and all 12 Goa talukas

## Tech stack

Plain HTML, CSS and vanilla JavaScript — no framework, no build step, no bundler.

- No backend, no database, no authentication, no accounts
- [Open-Meteo](https://open-meteo.com/) for weather forecasts and Indian-city geocoding (free, no API key)
- [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/) for reverse-geocoding GPS coordinates when you use "Use my location" (free, no API key)

## Project structure

```
weather-decision-assistant/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── app.js               UI orchestration — DOM, events, rendering
    ├── weather.js            Open-Meteo forecast API + response normalization
    ├── location.js           Browser geolocation + reverse geocoding (GPS flow)
    ├── locations-db.js       Curated search database (talukas, cities) + search logic
    ├── goa-villages-data.js  Goa village/town data (Census 2011-derived)
    └── decisions.js          The rule-based activity recommendation engine
```

Weather logic, location logic, and recommendation logic are kept in separate files on purpose — the UI layer (`app.js`) only orchestrates them.

## How to run

You need a local web server — opening `index.html` directly (`file://`) will break geolocation and some fetch behavior in most browsers.

```bash
cd weather-decision-assistant
python3 -m http.server 8000
```

Then open **http://localhost:8000** in your browser.

(Any static server works — `npx serve .` or VS Code's Live Server extension are fine alternatives to Python's.)

## How to use

1. Type a location into the search bar — a Goa village/town/taluka ("Calangute", "Bardez", "Sanguem") or a major Indian city ("Mumbai", "Delhi") — and hit Search, or pick a suggestion as you type.
2. Or click **Use my location** and allow browser location access.
3. Or click one of the quick-access chips (popular cities or Goa talukas) on the start screen.
4. Scroll down to **"Is today good for…"** to see the six activity recommendation cards, each with a score, best time window, and reasons.

## Known limitations

- Village → taluka assignment for Goa is computed by nearest distance to each taluka's headquarters town, not real administrative boundary polygons. It's been spot-checked against well-known places and is accurate for those, but places right on a taluka border could be mis-assigned.
- Weather forecasts come from Open-Meteo's model grid — neighboring villages a few kilometers apart may show identical or near-identical data, since the underlying weather model doesn't resolve at village-level granularity.
- Recommendations are rule-based estimates, not professional or safety advice.

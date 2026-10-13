# Weather Decision Assistant 🇮🇳

https://myvillageweather.online/ - For Demo

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

**🌧️ Rain Timing**
- Answers "when is it likely to rain?" from the hourly forecast: current rain status, next expected rain time, probability, expected rainfall, an hour-by-hour timeline, and a plain-language summary ("Rain is most likely between 3 PM and 5 PM" / "No significant rain expected today")

**⚠️ Weather Risk**
- Interprets (not just displays) conditions into a risk card — High Heat, Heavy Rain, Strong Wind, High UV, Low Visibility — each with a severity level (🟡 Moderate / 🟠 High / 🔴 Severe). Shows a calm 🟢 Normal state when nothing crosses a threshold; never manufactures risk out of ordinary weather

**📅 Best Days This Week**
- Ranks the 7-day forecast and surfaces the top 3 days, with separate scoring profiles for Outdoor / Travel / Sports (switchable tabs)

**🗺️ Weather Map**
- A Leaflet map (OpenStreetMap tiles) with three switchable layers: live rain radar (RainViewer), and Temperature/Wind markers showing real fetched values for the selected location and nearby places — not fabricated heatmap tiles, since that requires a keyed provider this app (no backend) can't hold securely
- Lazy-loaded: only initializes once you scroll to it

**📊 Weather History & 🌧️ Rainfall Tracker**
- Real historical data from Open-Meteo's Archive API (same provider as live forecasts, no new key): average/high/low temperature and rainfall over 7 days / 30 days / 3 months / 1 year, plus a monthly rainfall bar chart and a this-month-vs-same-period-last-year comparison
- Never fabricates an "average" — every number is a real archived value or a real year-over-year comparison

**🔔 Rain Alerts**
- An in-page banner appears automatically when rain becomes imminent (within ~60 minutes), regardless of notification permission
- Browser push notifications are opt-in via toggles in the bell menu (Rain Alert / Severe Weather), asked for once and never re-prompted after a denial
- **Honest scope**: notifications only fire while this tab is open. True background (closed-tab) push needs a push server with VAPID keys, which this project — by design, no backend — doesn't have. A minimal service worker (`sw.js`) is registered so the standard architecture is in place for that to be added later, but it does not currently deliver anything on its own.

**Decision Assistant** — the original core feature
- Six everyday activities, each independently scored: Walking, Running, Cycling, Laundry, Car Washing, Photography
- Deterministic, rule-based scoring (0–100) against temperature, feels-like, rain probability, wind, UV, humidity, cloud cover and visibility — no AI/LLM calls, so it works with zero API keys
- A rating band (Excellent / Good / Fair / Poor / Avoid) plus the specific reasons behind the score
- A "best time" window: scans the day's hourly forecast (restricted to daylight hours) and finds the best 2-hour block for that activity, rather than just judging the current instant
- Modular — new activities are added by pushing one object with an `evaluate()` function onto a list

**UI**
- Clean, responsive layout (desktop + mobile), sections ordered current → hourly → rain timing → risk → best days → 7-day → map → history → rainfall tracker → activities
- Distinct states for empty, loading, no-results, API/data error, and loaded content — including per-section failure states ("Historical weather data is currently unavailable...", "Weather map could not be loaded...")
- Quick-access chips for popular cities and all 12 Goa talukas

## Tech stack

Plain HTML, CSS and vanilla JavaScript — no framework, no build step, no bundler.

- No backend, no database, no authentication, no accounts
- [Open-Meteo](https://open-meteo.com/) forecast + archive (historical) APIs, and Indian-city geocoding (free, no API key)
- [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/) for reverse-geocoding GPS coordinates when you use "Use my location" (free, no API key)
- [RainViewer](https://www.rainviewer.com/) public tile API for live rain radar (free, no API key)
- [Leaflet](https://leafletjs.com/) (via CDN) for the map — the one external library in the project, used because hand-rolling map tile rendering isn't reasonable
- Browser `Notification` API + a minimal service worker for in-tab rain/severe-weather alerts

## Project structure

```
weather-decision-assistant/
├── index.html
├── sw.js                    Minimal service worker (see Rain Alerts above)
├── css/
│   └── style.css
└── js/
    ├── app.js                UI orchestration — DOM, events, rendering
    ├── weather.js             Open-Meteo forecast API + response normalization
    ├── location.js            Browser geolocation + reverse geocoding (GPS flow)
    ├── locations-db.js        Curated search database (talukas, cities) + search logic
    ├── goa-villages-data.js   Goa village/town data (Census 2011-derived)
    ├── decisions.js           Activity recommendation engine (Walking, Running, ...)
    ├── rain-timing.js         "When will it rain?" analysis
    ├── weather-risk.js        Dangerous/uncomfortable conditions detector
    ├── best-day.js            7-day ranking by activity type
    ├── historical.js          Open-Meteo Archive API + aggregation
    ├── weather-map.js         Leaflet map + RainViewer radar + data markers
    └── notifications.js       Rain/severe-weather alerts (in-tab + banner)
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
4. Scroll down to see Rain Timing, Weather Risk, Best Days This Week, the 7-day forecast, the Weather Map, Weather History, and the Rainfall Tracker.
5. Click the 🔔 bell (top-right) to turn on Rain Alert or Severe Weather notifications — you'll be asked for browser permission once.
6. Scroll further to **"Is today good for…"** for the six activity recommendation cards, each with a score, best time window, and reasons.

## Known limitations

- Village → taluka assignment for Goa is computed by nearest distance to each taluka's headquarters town, not real administrative boundary polygons. It's been spot-checked against well-known places and is accurate for those, but places right on a taluka border could be mis-assigned.
- Weather forecasts come from Open-Meteo's model grid — neighboring villages a few kilometers apart may show identical or near-identical data, since the underlying weather model doesn't resolve at village-level granularity.
- The Weather Map's rain radar reflects real ground-station coverage, which varies by region — a blank area means no signal detected there, not missing functionality.
- Notifications only work while the browser tab is open (see Rain Alerts above for why).
- Recommendations are rule-based estimates, not professional or safety advice.

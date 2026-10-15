# Weather Decision Assistant 🇮🇳 — Weather Forecasts, Rain Timing & Activity Recommendations

**A free, India-focused weather app that helps you decide the best time to walk, run, cycle, travel outdoors, or do laundry based on real weather forecast data.**

🌐 **Live Demo:** https://myvillageweather.online/

Weather Decision Assistant is a lightweight weather forecasting and decision-support app built with HTML, CSS, and vanilla JavaScript. Instead of simply displaying temperature and weather conditions, it interprets forecast data to help answer practical questions:

* Is today a good day for a walk, run, or cycling?
* When is it likely to rain?
* Which day this week is best for outdoor activities?
* Are heat, heavy rain, strong wind, or high UV conditions a concern?
* What were the recent temperature and rainfall trends?

The app is designed for India, with a special focus on **Goa weather, village-level location search, and all 12 Goa talukas**. It combines weather forecasts, historical weather data, rain timing, weather risk analysis, and activity recommendations in one responsive dashboard.

## ✨ Key Features

### 🌦️ Weather Forecast for Goa and Major Indian Cities

Check current weather conditions and forecasts for supported locations across India.

* Search Goa's 12 talukas and approximately 330 villages and towns.
* Search 50 major Indian cities, including Mumbai, Delhi, Bengaluru, Chennai, Kolkata, Hyderabad, and Pune.
* View temperature, feels-like temperature, humidity, wind speed and direction, rain probability, rainfall, UV index, cloud cover, atmospheric pressure, visibility, sunrise, and sunset.
* Explore a 24-hour hourly forecast and a 7-day weather forecast.
* See the matched location's name, state, type, and district or taluka context.
* Use GPS-based location detection to resolve your current coordinates to a place name.

The location search supports case-insensitive partial matches and common aliases, including Bombay → Mumbai, Bangalore → Bengaluru, Panjim → Tiswadi, and Vasco → Mormugao.

Goa village and town data is derived from Census 2011 village directory records. The location database is a curated offline lookup rather than a live geocoder, so unsupported locations return an explicit no-results message instead of silently selecting a nearby place.

### 🌧️ Rain Timing — When Will It Rain?

Understand the expected timing of rainfall using hourly forecast data.

* Current rain status.
* Next expected rain time.
* Rain probability and expected rainfall.
* An hour-by-hour rain timeline.
* A plain-language summary of the expected conditions.

For example, the app can summarize when rain is most likely or indicate when no significant rain is expected, based on the available forecast.

### ⚠️ Weather Risk Assessment

Identify potentially uncomfortable or hazardous weather conditions without exaggerating ordinary weather.

The risk dashboard evaluates:

* High heat
* Heavy rain
* Strong wind
* High UV
* Low visibility

Each detected risk receives a severity level: Moderate, High, or Severe. When no configured risk threshold is crossed, the dashboard displays a Normal state.

### 📅 Best Days This Week

Find the most suitable days for planned activities using the 7-day forecast.

* Ranks the upcoming seven days.
* Highlights the top three days.
* Offers separate scoring profiles for Outdoor activities, Travel, and Sports.

This makes it easier to compare upcoming weather conditions before choosing a day for an outdoor plan.

### 🧠 Weather Decision Assistant — Is Today Good for…?

The core feature translates weather forecast data into practical recommendations for six everyday activities:

* Walking
* Running
* Cycling
* Laundry
* Car washing
* Photography

Each activity receives a score from 0 to 100, a rating of Excellent, Good, Fair, Poor, or Avoid, and specific reasons behind the result.

The rule-based recommendation engine evaluates relevant conditions such as temperature, feels-like temperature, rain probability, wind, UV, humidity, cloud cover, and visibility.

It also searches the daylight hours of the hourly forecast for the best two-hour window for each activity, rather than evaluating only the current weather.

**No AI or LLM calls are used for scoring.** Recommendations are generated through deterministic rules, without requiring AI API keys. The activity system is modular, making it straightforward to add more activities.

### 🗺️ Interactive Weather Map

Explore weather information on a Leaflet map using OpenStreetMap tiles.

Available layers include:

* **Rain Radar:** Live radar tiles from RainViewer.
* **Temperature:** Weather markers displaying fetched temperature values.
* **Wind:** Weather markers displaying fetched wind values.

Temperature and wind markers use actual fetched values for the selected location and nearby places. They are not presented as fabricated heatmap data.

The map initializes lazily when the user scrolls to it, helping avoid unnecessary work during the initial page load.

### 📊 Historical Weather and Rainfall Tracker

Explore historical weather observations using the Open-Meteo Archive API.

Available time ranges include 7 days, 30 days, 3 months, and 1 year.

Historical information includes:

* Average, maximum, and minimum temperature.
* Historical rainfall.
* A monthly rainfall bar chart.
* A comparison of this month's rainfall against the corresponding period last year.

Historical statistics are based on archived API values and calculated comparisons. The app does not fabricate historical averages or year-over-year figures.

### 🔔 Rain Alerts and Severe Weather Notifications

Get an in-page alert when rain is expected to become imminent, approximately within the next 60 minutes.

Optional browser notification settings include:

* Rain Alert
* Severe Weather

Notification permission is requested through the browser, and the app does not repeatedly prompt users after permission has been denied.

**Current limitation:** Notifications work only while the browser tab is open. Reliable push notifications after the tab is closed would require additional background push infrastructure and a push server with VAPID keys. The included service worker establishes a starting point for future development but does not independently provide closed-tab push delivery.

### 📱 Responsive User Interface

The dashboard is designed for desktop and mobile screens, with sections ordered to make essential information easy to find:

1. Current weather
2. Hourly forecast
3. Rain timing
4. Weather risk
5. Best days this week
6. Seven-day forecast
7. Weather map
8. Historical weather
9. Rainfall tracker
10. Activity recommendations

The interface also includes quick-access chips for popular Indian cities and all 12 Goa talukas.

Loading, empty, no-results, API-error, and loaded states are handled explicitly. Individual sections can display their own error states when a particular data source is unavailable.

## 🛠️ Technology Stack

Weather Decision Assistant is built with plain HTML, CSS, and vanilla JavaScript. It has no framework, build step, bundler, or application backend.

| Technology / Service     | Purpose                                       |
| ------------------------ | --------------------------------------------- |
| HTML5                    | Application structure                         |
| CSS3                     | Responsive styling and layout                 |
| Vanilla JavaScript       | UI, weather analysis, and recommendations     |
| Open-Meteo Forecast API  | Current conditions and weather forecasts      |
| Open-Meteo Archive API   | Historical weather and rainfall               |
| Open-Meteo Geocoding API | City geocoding                                |
| OpenStreetMap Nominatim  | Reverse geocoding GPS coordinates             |
| Leaflet                  | Interactive weather map                       |
| OpenStreetMap            | Map tiles                                     |
| RainViewer               | Rain radar tiles                              |
| Browser Geolocation API  | Current location detection                    |
| Browser Notification API | In-tab rain and severe-weather notifications  |
| Service Worker           | Foundation for future background capabilities |

### External APIs and Resources

* [Open-Meteo](https://open-meteo.com/) — Weather forecasts, historical weather, and geocoding.
* [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/) — Reverse geocoding for GPS-based location detection.
* [RainViewer](https://www.rainviewer.com/) — Rain radar tile data.
* [Leaflet](https://leafletjs.com/) — Interactive map library.

The app does not require user accounts, authentication, a database, or a custom backend. The weather services used by the application do not require a project-managed API key for the configured requests.

## 📂 Project Structure

```text
weather-decision-assistant/
├── index.html
├── sw.js
├── css/
│   └── style.css
└── js/
    ├── app.js
    ├── weather.js
    ├── location.js
    ├── locations-db.js
    ├── goa-villages-data.js
    ├── decisions.js
    ├── rain-timing.js
    ├── weather-risk.js
    ├── best-day.js
    ├── historical.js
    ├── weather-map.js
    └── notifications.js
```

### Code Organization

* `app.js` — UI orchestration, DOM events, and rendering.
* `weather.js` — Forecast API requests and response normalization.
* `location.js` — Browser geolocation and reverse geocoding.
* `locations-db.js` — Curated location search database and search logic.
* `goa-villages-data.js` — Goa village and town data derived from Census 2011 records.
* `decisions.js` — Activity scoring and recommendation engine.
* `rain-timing.js` — Hourly rainfall analysis.
* `weather-risk.js` — Weather risk detection.
* `best-day.js` — Seven-day activity ranking.
* `historical.js` — Historical API requests and aggregation.
* `weather-map.js` — Leaflet map, radar layer, and weather markers.
* `notifications.js` — Rain and severe-weather notification handling.
* `sw.js` — Minimal service worker.

Weather retrieval, location handling, historical analysis, risk detection, and activity scoring are kept in separate modules so that the UI layer primarily coordinates the application rather than containing all the business logic.

## 🚀 Getting Started

### Prerequisites

* A modern web browser.
* Python 3 or another local static HTTP server.
* Internet access for external weather APIs and map resources.

### Run Locally

Clone your repository and navigate to the project directory:

```bash
git clone https://github.com/YOUR_USERNAME/weatherstatus.git
cd weatherstatus
```

Start a local web server:

```bash
python3 -m http.server 8000
```

Open the application:

```text
http://localhost:8000
```

You can also use another static server, such as `npx serve .` or the VS Code Live Server extension.

Opening `index.html` directly through a `file://` URL can interfere with geolocation and network requests. Use a local HTTP server for development.

## 📖 How to Use

1. Open the [Weather Decision Assistant demo](https://myvillageweather.online/).
2. Search for a Goa village, town, or taluka, or select a supported Indian city.
3. Alternatively, select **Use my location** and grant location permission.
4. Review current conditions, the hourly forecast, and the seven-day forecast.
5. Check Rain Timing to understand when rainfall is expected.
6. Review Weather Risk and Best Days This Week before planning an activity.
7. Explore the interactive weather map and historical rainfall charts.
8. Open the notification menu to configure available rain and severe-weather alerts.
9. Scroll to **Is today good for…?** to compare the six activity recommendations, their scores, reasons, and best time windows.

## ⚠️ Known Limitations

* **Village-to-taluka mapping:** Goa village assignments are calculated using distance from taluka headquarters rather than official administrative boundary polygons. Border locations may occasionally be assigned to the wrong taluka.
* **Forecast resolution:** Weather forecasts come from Open-Meteo's model grid. Nearby villages can display identical or similar values because the model does not resolve every village independently.
* **Rain radar coverage:** Radar availability varies by region. A blank radar area may indicate a lack of available radar coverage.
* **Notifications:** Rain and severe-weather notifications are limited to the open browser tab; reliable closed-tab push notifications are not implemented.
* **Activity recommendations:** Scores are rule-based estimates based on forecast data. They are intended for everyday planning and are not professional weather, medical, or safety advice.
* **Location search:** The searchable location list is curated and finite. Locations outside the supported database will not necessarily be found through text search, although GPS-based location resolution can work outside the list.

## 🎯 Project Goals

Weather Decision Assistant explores a practical alternative to traditional weather dashboards: turning weather data into useful, explainable decisions.

The project focuses on:

* Making weather forecasts easier to act on.
* Improving access to weather information for Goa's villages and towns.
* Providing transparent, rule-based activity recommendations.
* Combining current forecasts with historical weather trends.
* Keeping the application lightweight, modular, and free of a custom backend.

## 👨‍💻 Development

This project was developed with assistance from Claude Code using a vibe-coding workflow. Its weather analysis and recommendation logic is implemented in JavaScript.

Feedback, bug reports, and suggestions for additional activities or location coverage are welcome.

## 📄 License

No license is specified here. Add a `LICENSE` file to the repository if you want to define the permissions and conditions for others to use, modify, and redistribute the code.

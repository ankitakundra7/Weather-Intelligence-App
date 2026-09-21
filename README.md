# Weather Intelligence App

A modern, responsive meteorological intelligence and activity planning web application built with **React**, **TypeScript**, and **Tailwind CSS**, powered by the **Open-Meteo APIs**.

---

## 🌟 Key Features

### 1. City Search & Geocoding
- **Open-Meteo Geocoding API Integration**: Converts city and place names into exact geographic coordinates (`latitude` and `longitude`).
- **Popular City Quick Select**: Fast-tap chips for popular worldwide destinations (New York, London, Tokyo, Paris, San Francisco, Sydney, Singapore, Dubai).
- **Device Geolocation**: Optional "My Location" button with coordinate detection and reverse lookup.
- **Form Validation & Clean Clearing**: Immediate input validation, loading spinners, and one-click query resets.

### 2. Current Weather Card
- **Real-Time Telemetry**: Real-time ambient temperature with high and low bounds for the day.
- **Unit Toggle**: Toggle between Celsius (°C) and Fahrenheit (°F) with persisted user preferences.
- **Wind Vector**: Wind speed in km/h or mph with directional degrees and 16-point cardinal compass directions (N, NE, ESE, etc.).
- **WMO Weather Interpretation**: Decodes WMO weather codes into plain-language descriptions, condition badges, and day/night indicators.
- **Location Metadata**: Displays latitude, longitude, elevation in meters, local timezone, region/state, and country code.

### 3. Planning Intelligence & Activity Recommendations
- **Outdoor Comfort Index**: Algorithmic 0–100 suitability score based on precipitation, thermal comfort bands, and wind speed.
- **Outdoor Pursuits vs. Indoor Alternatives**: Dynamic activity cards categorized by suitability (`Ideal`, `Caution`, or `Avoid`) depending on whether it is raining, freezing, or clear.
- **Attire & Layering Guide**: Automated clothing advice suited to temperature ranges (lightweight cottons, thermal base layers, alpaca mid-layers, heavy parkas).
- **Essential Gear**: Packing recommendations such as wind-vented umbrellas, polarized UV sunglasses, hydration bottles, or slip-resistant boots.
- **Commute & Travel Advisory**: Road and commuting conditions, crosswind notices, and peak time-of-day windows.

### 4. 7-Day Forecast & Trend Analysis
- **Daily Cards View**: High/low temperatures, weather condition icons, and proportional temperature range bars.
- **Interactive Trend Chart**: SVG line chart tracking maximum (red) and minimum (blue) temperature trajectories across the week with day selection.

### 5. Error & Fallback Handling
- **Designated Error State**: Clear error banner for unresolved city queries, empty result sets, or network interruptions.
- **Recovery Actions**: One-click query retry and immediate fallback city suggestions.
- **Skeleton Loaders**: Polished skeleton loading animations while telemetry is being retrieved.

---

## 🔌 API Endpoints Used

1. **Open-Meteo Geocoding API**:
   ```
   https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1
   ```
2. **Open-Meteo Forecast API**:
   ```
   https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto
   ```

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animation**: Motion

---

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The application runs on `http://localhost:3000`.

### Production Build

```bash
npm run build
```

---

## 📄 License

Apache-2.0

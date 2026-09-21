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

## 📦 Exporting from AI Studio to GitHub

You can export this application directly from Google AI Studio to a GitHub repository or download it locally:

### Option 1: Direct Export via AI Studio UI
1. In the upper-right corner of the **Google AI Studio** workspace, click the **Settings** / **Overflow Menu** (`⋮` or gear icon).
2. Select **Export to GitHub** (or **Download as ZIP**).
3. Authorize your GitHub account when prompted.
4. Choose whether to export to a new repository or an existing one, set the repository visibility (Public or Private), and confirm.
5. AI Studio will commit and push the codebase directly to your repository's default branch.

### Option 2: Push via Local Git CLI
If you downloaded the project as a ZIP:
1. Extract the downloaded archive on your computer.
2. Initialize and push to GitHub:
   ```bash
   cd weather-intelligence
   git init
   git add .
   git commit -m "Initial commit from Google AI Studio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

---

## ☁️ Cloudflare Pages Deployment Instructions

This project is a client-side Single Page Application (SPA) built with Vite and Tailwind CSS. It is fully compatible with **Cloudflare Pages** and can be deployed with zero backend configuration.

### Method 1: Git Integration via Cloudflare Dashboard (Recommended)

1. **Log in to Cloudflare**:
   Navigate to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and sign in.
2. **Open Pages**:
   Go to **Compute (Workers) > Workers & Pages**, then click **Create** > **Pages** tab (or **Connect to Git**).
3. **Connect Your GitHub Account**:
   Select your Git provider (**GitHub**), authorize Cloudflare, and choose the exported `weather-intelligence` repository.
4. **Configure Build & Deployment Settings**:
   Fill in the project build configuration:
   - **Project Name**: `weather-intelligence` (or your preferred name)
   - **Production Branch**: `main`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
   - **Root Directory**: *(leave blank or `/`)*
5. **Node.js Compatibility (Optional)**:
   Under **Environment Variables**, you can specify:
   - Variable: `NODE_VERSION`
   - Value: `20` (or `22`)
6. **Deploy**:
   Click **Save and Deploy**. Cloudflare Pages will run the Vite build and provision a live preview URL on `*.pages.dev` (along with custom domain support and automatic branch deployments on every git push).

---

### Method 2: Direct CLI Deployment via Wrangler

You can also deploy directly from your local terminal using Cloudflare's **Wrangler** CLI:

1. **Build the production bundle**:
   ```bash
   npm run build
   ```
   This generates the static distribution assets in the `/dist` directory.

2. **Deploy to Cloudflare Pages with Wrangler**:
   ```bash
   npx wrangler pages deploy dist --project-name=weather-intelligence
   ```

3. Follow the CLI login prompt if prompted. Once uploaded, Wrangler will print your live deployment URL (e.g., `https://weather-intelligence.pages.dev`).

---

### SPA Routing on Cloudflare Pages
Because this application runs as a Single Page Application (SPA), all client-side paths fall back to `index.html`. Cloudflare Pages automatically handles standard Vite output out of the box with zero additional redirect configuration.

---

## 📄 License

Apache-2.0

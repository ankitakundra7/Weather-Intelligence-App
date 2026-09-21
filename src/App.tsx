/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { ForecastSection } from './components/ForecastSection';
import { PlanningRecommendations } from './components/PlanningRecommendations';
import { ErrorBanner } from './components/ErrorBanner';
import { WeatherSkeleton } from './components/WeatherSkeleton';
import { WeatherData, TempUnit } from './types';
import {
  searchCity,
  getWeatherData,
  resolveLocationFromCoords,
  WeatherApiError,
} from './services/weatherApi';

const DEFAULT_CITY = 'San Francisco';

export default function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [unit, setUnit] = useState<TempUnit>(() => {
    try {
      const saved = localStorage.getItem('weather_unit');
      return saved === 'fahrenheit' ? 'fahrenheit' : 'celsius';
    } catch {
      return 'celsius';
    }
  });

  const handleToggleUnit = () => {
    setUnit((prev) => {
      const next = prev === 'celsius' ? 'fahrenheit' : 'celsius';
      try {
        localStorage.setItem('weather_unit', next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  const fetchWeather = useCallback(async (cityName: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Step 1: Open-Meteo Geocoding API:
      // https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1
      const locations = await searchCity(cityName, 1);
      const topLocation = locations[0];

      // Step 2: Open-Meteo Forecast API:
      // https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto
      const data = await getWeatherData(topLocation);
      setWeatherData(data);
    } catch (err: unknown) {
      if (err instanceof WeatherApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(
          'An unexpected error occurred while querying the weather service. Please try again.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setErrorMessage(
        'Geolocation is not supported by your browser environment. Please search for your city name manually.'
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const locationMeta = await resolveLocationFromCoords(latitude, longitude);
          const data = await getWeatherData(locationMeta);
          setWeatherData(data);
        } catch (err: unknown) {
          if (err instanceof WeatherApiError) {
            setErrorMessage(err.message);
          } else {
            setErrorMessage('Unable to retrieve weather for your coordinates.');
          }
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setIsLoading(false);
        let msg = 'Could not access device location.';
        if (err.code === 1) {
          msg = 'Location access permission was not granted. Please search by city name.';
        } else if (err.code === 2) {
          msg = 'Location position unavailable. Please search by city name.';
        } else if (err.code === 3) {
          msg = 'Location request timed out. Please try searching for your city.';
        }
        setErrorMessage(msg);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  const handleRefresh = () => {
    if (weatherData?.location) {
      setIsLoading(true);
      setErrorMessage(null);
      getWeatherData(weatherData.location)
        .then((data) => setWeatherData(data))
        .catch((err: unknown) => {
          if (err instanceof WeatherApiError) {
            setErrorMessage(err.message);
          } else {
            setErrorMessage('Failed to refresh meteorological telemetry.');
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      fetchWeather(DEFAULT_CITY);
    }
  };

  // Initial load
  useEffect(() => {
    fetchWeather(DEFAULT_CITY);
  }, [fetchWeather]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased selection:bg-sky-500 selection:text-white">
      {/* Top Navigation & Controls */}
      <Header
        unit={unit}
        onToggleUnit={handleToggleUnit}
        onRefresh={handleRefresh}
        isLoading={isLoading}
        lastUpdated={weatherData?.lastUpdated}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Search & Location Selection */}
        <section aria-label="Location search">
          <SearchBar
            onSearch={fetchWeather}
            onUseCurrentLocation={handleUseCurrentLocation}
            isLoading={isLoading}
            currentCityName={weatherData?.location?.name}
          />
        </section>

        {/* Designated Error State Banner */}
        {errorMessage && (
          <section aria-label="Error announcement">
            <ErrorBanner
              message={errorMessage}
              onRetry={handleRefresh}
              onSelectCity={fetchWeather}
            />
          </section>
        )}

        {/* Loading State Skeleton */}
        {isLoading && !weatherData && <WeatherSkeleton />}

        {/* Meteorological Telemetry & Intelligence */}
        {weatherData && (
          <div className="space-y-6">
            {/* 1. Current Weather Card */}
            <section aria-label="Current weather metrics">
              <CurrentWeatherCard data={weatherData} unit={unit} />
            </section>

            {/* 2. Planning Recommendations: Dynamic activity advice */}
            <section aria-label="Dynamic activity planning recommendations">
              <PlanningRecommendations
                current={weatherData.current}
                daily={weatherData.daily}
              />
            </section>

            {/* 3. 7-Day Forecast (Cards & Interactive Temperature Trend Chart) */}
            <section aria-label="7-day meteorological forecast">
              <ForecastSection daily={weatherData.daily} unit={unit} />
            </section>
          </div>
        )}
      </main>

      {/* Footer & Source Attribution */}
      <footer className="w-full border-t border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <p>
            Weather data retrieved via{' '}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noreferrer"
              className="text-sky-600 dark:text-sky-400 font-medium hover:underline"
            >
              Open-Meteo Free Weather API
            </a>{' '}
            and Open-Meteo Geocoding.
          </p>
          <p className="text-[11px]">
            Activity guidance generated dynamically based on real-time atmospheric readings.
          </p>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';
import {
  Compass,
  Wind,
  MapPin,
  Mountain,
  Clock,
  ArrowUp,
  ArrowDown,
  Sun,
  Moon,
  Thermometer,
} from 'lucide-react';
import { WeatherData, TempUnit } from '../types';
import {
  getWeatherCondition,
  formatTemp,
  formatWind,
  getWindDirection,
} from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherCardProps {
  data: WeatherData;
  unit: TempUnit;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ data, unit }) => {
  const { current, location, daily, timezone, elevation } = data;
  const condition = getWeatherCondition(current.weathercode, current.is_day);
  const windDir = getWindDirection(current.winddirection);

  const todayMax = daily.temperature_2m_max?.[0] ?? current.temperature;
  const todayMin = daily.temperature_2m_min?.[0] ?? current.temperature;

  const latText = `${Math.abs(location.latitude).toFixed(2)}° ${location.latitude >= 0 ? 'N' : 'S'}`;
  const lonText = `${Math.abs(location.longitude).toFixed(2)}° ${location.longitude >= 0 ? 'E' : 'W'}`;

  return (
    <div
      id="current-weather-card"
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800/95 border border-slate-200/90 dark:border-slate-700/80 p-6 md:p-8 shadow-xs"
    >
      {/* Subtle atmospheric ambient glow */}
      <div
        className={`absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br ${condition.accentBg} blur-3xl pointer-events-none opacity-80`}
      />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Top Bar: Location Metadata & Day/Night Indicator */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
                <MapPin className="w-4 h-4" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {location.name}
              </h2>
              {location.country_code && (
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                  {location.country_code}
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span>{[location.admin1, location.country].filter(Boolean).join(', ')}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${condition.badgeColor}`}
            >
              <WeatherIcon name={condition.icon} className="w-3.5 h-3.5" />
              <span>{condition.label}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              {current.is_day ? <Sun className="w-3 h-3 text-amber-500" /> : <Moon className="w-3 h-3 text-indigo-400" />}
              <span>{current.is_day ? 'Daytime' : 'Night'}</span>
            </span>
          </div>
        </div>

        {/* Center: Hero Temperature & Condition Overview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
          {/* Main Temperature Display */}
          <div className="md:col-span-6 flex items-baseline gap-4">
            <div className="flex items-start">
              <span className="text-6xl sm:text-7xl font-extrabold tracking-tighter text-slate-900 dark:text-white">
                {Math.round(unit === 'fahrenheit' ? (current.temperature * 9) / 5 + 32 : current.temperature)}
              </span>
              <span className="text-2xl sm:text-3xl font-light text-slate-500 dark:text-slate-400 ml-1">
                °{unit === 'fahrenheit' ? 'F' : 'C'}
              </span>
            </div>

            <div className="flex flex-col gap-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium">
                <ArrowUp className="w-3.5 h-3.5" />
                <span>High: {formatTemp(todayMax, unit)}</span>
              </div>
              <div className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-medium">
                <ArrowDown className="w-3.5 h-3.5" />
                <span>Low: {formatTemp(todayMin, unit)}</span>
              </div>
            </div>
          </div>

          {/* Condition Description */}
          <div className="md:col-span-6 bg-slate-50/80 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-300 shrink-0">
                <WeatherIcon name={condition.icon} className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {condition.label}
                </h3>
                <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {condition.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Details Grid: Wind, Coordinates, Elevation, Timezone */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-200/80 dark:border-slate-700/80">
          {/* Wind Speed & Direction */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-sky-500" />
              Wind Speed
            </span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-base font-semibold text-slate-900 dark:text-white">
                {formatWind(current.windspeed, unit)}
              </span>
            </div>
            <div className="mt-1 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Compass
                className="w-3.5 h-3.5 text-slate-400"
                style={{ transform: `rotate(${current.winddirection}deg)` }}
              />
              <span>{windDir.full} ({windDir.label})</span>
            </div>
          </div>

          {/* Coordinates */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              Coordinates
            </span>
            <div className="mt-1 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
              {latText}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {lonText}
            </div>
          </div>

          {/* Elevation */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Mountain className="w-3.5 h-3.5 text-emerald-500" />
              Elevation
            </span>
            <div className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
              {elevation !== undefined ? `${Math.round(elevation)} m` : 'Sea Level'}
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {elevation && elevation > 1000 ? 'Alpine Altitude' : 'Standard Baseline'}
            </div>
          </div>

          {/* Timezone */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Local Timezone
            </span>
            <div className="mt-1 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate" title={timezone}>
              {timezone.replace(/_/g, ' ')}
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Thermometer className="w-3 h-3 text-slate-400" />
              <span>Real-Time Sync</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

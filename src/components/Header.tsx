import React from 'react';
import { CloudSun, RotateCw } from 'lucide-react';
import { TempUnit } from '../types';

interface HeaderProps {
  unit: TempUnit;
  onToggleUnit: () => void;
  onRefresh: () => void;
  isLoading: boolean;
  lastUpdated?: string;
}

export const Header: React.FC<HeaderProps> = ({
  unit,
  onToggleUnit,
  onRefresh,
  isLoading,
  lastUpdated,
}) => {
  const formattedTime = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 transition-colors dark:bg-slate-900/90 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-sm shadow-sky-500/20">
            <CloudSun className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                Weather Intelligence
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase bg-sky-50 text-sky-700 rounded-full border border-sky-200/60 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800">
                Open-Meteo
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Meteorological metrics & dynamic planning recommendations
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {formattedTime && (
            <span className="hidden md:inline-flex items-center text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
              Updated {formattedTime}
            </span>
          )}

          {/* Unit Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700">
            <button
              id="unit-celsius-btn"
              onClick={() => unit !== 'celsius' && onToggleUnit()}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                unit === 'celsius'
                  ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Display Celsius"
            >
              °C
            </button>
            <button
              id="unit-fahrenheit-btn"
              onClick={() => unit !== 'fahrenheit' && onToggleUnit()}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                unit === 'fahrenheit'
                  ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Display Fahrenheit"
            >
              °F
            </button>
          </div>

          {/* Refresh Action */}
          <button
            id="refresh-weather-btn"
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white rounded-lg border border-slate-200/80 dark:border-slate-700 transition-colors disabled:opacity-50"
            title="Refresh weather data"
          >
            <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-sky-500' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { Search, MapPin, X, Loader2, Navigation } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onUseCurrentLocation: () => void;
  isLoading: boolean;
  currentCityName?: string;
}

const POPULAR_CITIES = [
  'New York',
  'London',
  'Tokyo',
  'Paris',
  'San Francisco',
  'Sydney',
  'Singapore',
  'Dubai',
];

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onUseCurrentLocation,
  isLoading,
  currentCityName,
}) => {
  const [query, setQuery] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setValidationError('Please enter a city or region name.');
      return;
    }
    setValidationError(null);
    onSearch(trimmed);
  };

  const handleSelectCity = (city: string) => {
    setQuery(city);
    setValidationError(null);
    onSearch(city);
  };

  const handleClear = () => {
    setQuery('');
    setValidationError(null);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>

          <input
            id="city-search-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (validationError) setValidationError(null);
            }}
            placeholder="Search any city or coordinates (e.g., Tokyo, London, Zurich)..."
            disabled={isLoading}
            className={`w-full pl-10 pr-10 py-3 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl border ${
              validationError
                ? 'border-red-400 focus:ring-red-400/20'
                : 'border-slate-300 dark:border-slate-700 focus:border-sky-500 focus:ring-sky-500/20'
            } shadow-xs focus:outline-hidden focus:ring-3 transition-all placeholder:text-slate-400 disabled:opacity-60`}
          />

          {query && !isLoading && (
            <button
              id="clear-search-query-btn"
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          {/* Main Search Submit Button */}
          <button
            id="submit-search-btn"
            type="submit"
            disabled={isLoading}
            className="flex-1 sm:flex-none px-5 py-3 bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium rounded-xl shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Search</span>
              </>
            )}
          </button>

          {/* Current Location Button */}
          <button
            id="use-current-location-btn"
            type="button"
            onClick={onUseCurrentLocation}
            disabled={isLoading}
            title="Use device location"
            className="px-3.5 py-3 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-300 dark:border-slate-700 transition-colors flex items-center justify-center gap-1.5 text-sm font-medium disabled:opacity-60"
          >
            <Navigation className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span className="hidden md:inline">My Location</span>
          </button>
        </div>
      </form>

      {validationError && (
        <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1">
          <span>•</span>
          {validationError}
        </p>
      )}

      {/* Popular City Quick-Select Chips */}
      <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1 shrink-0 mr-1 font-medium">
          <MapPin className="w-3 h-3" />
          Popular:
        </span>
        {POPULAR_CITIES.map((city) => {
          const isActive = currentCityName?.toLowerCase() === city.toLowerCase();
          return (
            <button
              key={city}
              id={`popular-city-${city.toLowerCase().replace(/\s+/g, '-')}`}
              type="button"
              onClick={() => handleSelectCity(city)}
              disabled={isLoading}
              className={`shrink-0 px-2.5 py-1 rounded-lg border transition-colors ${
                isActive
                  ? 'bg-sky-100 border-sky-300 text-sky-900 font-medium dark:bg-sky-950/70 dark:border-sky-700 dark:text-sky-200'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-sky-300 hover:text-sky-600 dark:hover:border-sky-800 dark:hover:text-sky-300'
              }`}
            >
              {city}
            </button>
          );
        })}
      </div>
    </div>
  );
};

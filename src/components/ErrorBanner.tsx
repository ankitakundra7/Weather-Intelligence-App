import React from 'react';
import { AlertCircle, RefreshCw, MapPinOff, Globe2 } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
  onSelectCity?: (city: string) => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  message,
  onRetry,
  onSelectCity,
}) => {
  const isNotFound = message.toLowerCase().includes('locate') || message.toLowerCase().includes('not found') || message.toLowerCase().includes('spelling');

  return (
    <div
      id="weather-error-banner"
      className="w-full rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/90 dark:bg-rose-950/40 p-6 md:p-8 shadow-xs"
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="p-3 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300 shrink-0">
          {isNotFound ? <MapPinOff className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-rose-900 dark:text-rose-200">
              {isNotFound ? 'Location Query Unresolved' : 'Weather Meteorological Error'}
            </h3>
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-rose-200/60 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 rounded">
              Open-Meteo
            </span>
          </div>

          <p className="mt-1 text-sm text-rose-800/90 dark:text-rose-300/90 leading-relaxed">
            {message}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              id="error-retry-btn"
              type="button"
              onClick={onRetry}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Query</span>
            </button>

            {onSelectCity && (
              <div className="flex items-center gap-1.5 flex-wrap text-xs text-rose-700 dark:text-rose-300">
                <span className="text-[11px] opacity-80 flex items-center gap-1">
                  <Globe2 className="w-3 h-3" />
                  Try instead:
                </span>
                {['London', 'New York', 'Tokyo', 'Paris'].map((c) => (
                  <button
                    key={c}
                    id={`error-fallback-${c.toLowerCase()}`}
                    type="button"
                    onClick={() => onSelectCity(c)}
                    className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-800 font-medium hover:bg-rose-100/60 dark:hover:bg-slate-700 transition-colors"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

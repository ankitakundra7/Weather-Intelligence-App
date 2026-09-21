import React from 'react';

export const WeatherSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-6 animate-pulse" id="weather-skeleton-loader">
      {/* Current Weather Card Skeleton */}
      <div className="rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 p-6 md:p-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            <div className="h-4 w-32 bg-slate-100 dark:bg-slate-700/60 rounded" />
          </div>
          <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded-full" />
        </div>

        <div className="my-8 flex items-baseline gap-4">
          <div className="h-16 w-36 bg-slate-200 dark:bg-slate-700 rounded-xl" />
          <div className="h-8 w-28 bg-slate-100 dark:bg-slate-700/60 rounded-lg" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/50">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-slate-100 dark:bg-slate-700/40 rounded-xl" />
          ))}
        </div>
      </div>

      {/* 7-Day Forecast Skeleton */}
      <div className="rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 p-6">
        <div className="h-6 w-44 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="h-36 bg-slate-100 dark:bg-slate-700/40 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Planning Advice Skeleton */}
      <div className="rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 p-6">
        <div className="h-6 w-60 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-44 bg-slate-100 dark:bg-slate-700/40 rounded-xl" />
          <div className="h-44 bg-slate-100 dark:bg-slate-700/40 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

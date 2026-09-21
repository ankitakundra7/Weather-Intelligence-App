import React, { useState } from 'react';
import {
  CalendarDays,
  LineChart,
  LayoutGrid,
  ArrowUp,
  ArrowDown,
  Info,
} from 'lucide-react';
import { DailyForecast, TempUnit } from '../types';
import {
  getWeatherCondition,
  formatTemp,
  formatDateLabel,
  celsiusToFahrenheit,
} from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';

interface ForecastSectionProps {
  daily: DailyForecast;
  unit: TempUnit;
}

export const ForecastSection: React.FC<ForecastSectionProps> = ({ daily, unit }) => {
  const [viewMode, setViewMode] = useState<'cards' | 'chart'>('cards');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  const daysCount = Math.min(daily.time.length, 7);
  const items = Array.from({ length: daysCount }).map((_, idx) => {
    const time = daily.time[idx];
    const max = daily.temperature_2m_max[idx];
    const min = daily.temperature_2m_min[idx];
    const code = daily.weathercode[idx];
    const condition = getWeatherCondition(code, 1);
    const dateMeta = formatDateLabel(time, idx);

    return {
      index: idx,
      time,
      max,
      min,
      code,
      condition,
      dayName: dateMeta.dayName,
      formattedDate: dateMeta.formattedDate,
    };
  });

  // Calculate overall min and max for scaling the visual bars & charts
  const allMax = items.map((i) => (unit === 'fahrenheit' ? celsiusToFahrenheit(i.max) : i.max));
  const allMin = items.map((i) => (unit === 'fahrenheit' ? celsiusToFahrenheit(i.min) : i.min));
  const globalMax = Math.max(...allMax);
  const globalMin = Math.min(...allMin);
  const tempRange = Math.max(1, globalMax - globalMin);

  const activeItem = items[selectedDayIndex] || items[0];

  return (
    <div
      id="forecast-section"
      className="rounded-2xl bg-white dark:bg-slate-800/95 border border-slate-200/90 dark:border-slate-700/80 p-6 md:p-8 shadow-xs"
    >
      {/* Header with Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              7-Day Meteorological Outlook
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              High and low temperature trends with atmospheric conditions
            </p>
          </div>
        </div>

        {/* View switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs">
          <button
            id="view-cards-btn"
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'cards'
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Daily Cards</span>
          </button>
          <button
            id="view-chart-btn"
            onClick={() => setViewMode('chart')}
            className={`px-3 py-1.5 font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'chart'
                ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LineChart className="w-3.5 h-3.5" />
            <span>Trend Chart</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Daily Card Grid */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {items.map((item) => {
            const isSelected = item.index === selectedDayIndex;
            const itemMax = unit === 'fahrenheit' ? celsiusToFahrenheit(item.max) : item.max;
            const itemMin = unit === 'fahrenheit' ? celsiusToFahrenheit(item.min) : item.min;

            // Bar math
            const leftPercent = Math.max(0, Math.min(80, ((itemMin - globalMin) / tempRange) * 100));
            const barWidth = Math.max(15, Math.min(100 - leftPercent, ((itemMax - itemMin) / tempRange) * 100));

            return (
              <button
                key={item.time}
                id={`forecast-day-card-${item.index}`}
                type="button"
                onClick={() => setSelectedDayIndex(item.index)}
                className={`relative p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-sky-50/80 dark:bg-sky-950/40 border-sky-400 dark:border-sky-600 ring-2 ring-sky-400/20'
                    : 'bg-slate-50/70 hover:bg-slate-100/70 dark:bg-slate-900/40 dark:hover:bg-slate-900/80 border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-slate-900 dark:text-white">
                      {item.dayName}
                    </span>
                    {item.index === 0 && (
                      <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {item.formattedDate}
                  </span>
                </div>

                <div className="my-3 flex flex-col items-center justify-center">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-xs border border-slate-100 dark:border-slate-700/60 text-sky-600 dark:text-sky-400 mb-1.5">
                    <WeatherIcon name={item.condition.icon} className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 text-center line-clamp-1">
                    {item.condition.label}
                  </span>
                </div>

                {/* Temperatures */}
                <div className="w-full">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-rose-600 dark:text-rose-400">
                      {formatTemp(item.max, unit)}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {formatTemp(item.min, unit)}
                    </span>
                  </div>

                  {/* Relative temperature horizontal gauge */}
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
                    <div
                      className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400 to-rose-400"
                      style={{
                        left: `${leftPercent}%`,
                        width: `${barWidth}%`,
                      }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* Mode 2: Interactive SVG Temperature Trend Chart */
        <div className="w-full bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 rounded-xl border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium text-rose-500">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                Maximum Temp (°{unit === 'fahrenheit' ? 'F' : 'C'})
              </span>
              <span className="flex items-center gap-1.5 font-medium text-sky-500">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
                Minimum Temp (°{unit === 'fahrenheit' ? 'F' : 'C'})
              </span>
            </div>
            <span className="hidden sm:inline text-[11px]">Hover or click a day to inspect</span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 700 240"
              className="w-full h-60 min-w-[550px] overflow-visible"
            >
              {/* Horizontal grid guide lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                const y = 30 + ratio * 150;
                const tempVal = Math.round(globalMax - ratio * tempRange);
                return (
                  <g key={idx}>
                    <line
                      x1="40"
                      y1={y}
                      x2="680"
                      y2={y}
                      stroke="currentColor"
                      strokeDasharray="4 4"
                      className="text-slate-200 dark:text-slate-800"
                    />
                    <text
                      x="10"
                      y={y + 4}
                      className="text-[10px] fill-slate-400 dark:fill-slate-500"
                    >
                      {tempVal}°
                    </text>
                  </g>
                );
              })}

              {/* Coordinates computation */}
              {(() => {
                const stepX = (660 - 60) / (items.length - 1);
                const getY = (val: number) => {
                  const r = (val - globalMin) / tempRange;
                  return 180 - r * 150; // inverted Y
                };

                const maxPoints = items.map((it, idx) => ({
                  x: 60 + idx * stepX,
                  y: getY(unit === 'fahrenheit' ? celsiusToFahrenheit(it.max) : it.max),
                  temp: it.max,
                  item: it,
                }));

                const minPoints = items.map((it, idx) => ({
                  x: 60 + idx * stepX,
                  y: getY(unit === 'fahrenheit' ? celsiusToFahrenheit(it.min) : it.min),
                  temp: it.min,
                  item: it,
                }));

                const maxPathD = maxPoints.reduce(
                  (acc, pt, i) =>
                    i === 0
                      ? `M ${pt.x},${pt.y}`
                      : `${acc} L ${pt.x},${pt.y}`,
                  ''
                );

                const minPathD = minPoints.reduce(
                  (acc, pt, i) =>
                    i === 0
                      ? `M ${pt.x},${pt.y}`
                      : `${acc} L ${pt.x},${pt.y}`,
                  ''
                );

                return (
                  <>
                    {/* Max temperature line */}
                    <path
                      d={maxPathD}
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Min temperature line */}
                    <path
                      d={minPathD}
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Max points */}
                    {maxPoints.map((pt, i) => (
                      <g
                        key={`max-${i}`}
                        className="cursor-pointer"
                        onClick={() => setSelectedDayIndex(i)}
                      >
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={selectedDayIndex === i ? 6 : 4}
                          className="fill-white stroke-rose-500 stroke-2 hover:r-6 transition-all"
                        />
                        <text
                          x={pt.x}
                          y={pt.y - 10}
                          textAnchor="middle"
                          className="text-[11px] font-bold fill-rose-600 dark:fill-rose-400"
                        >
                          {formatTemp(pt.temp, unit)}
                        </text>
                      </g>
                    ))}

                    {/* Min points */}
                    {minPoints.map((pt, i) => (
                      <g
                        key={`min-${i}`}
                        className="cursor-pointer"
                        onClick={() => setSelectedDayIndex(i)}
                      >
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={selectedDayIndex === i ? 6 : 4}
                          className="fill-white stroke-sky-600 stroke-2 hover:r-6 transition-all"
                        />
                        <text
                          x={pt.x}
                          y={pt.y + 18}
                          textAnchor="middle"
                          className="text-[11px] font-semibold fill-sky-700 dark:fill-sky-400"
                        >
                          {formatTemp(pt.temp, unit)}
                        </text>
                      </g>
                    ))}

                    {/* Bottom Day Labels */}
                    {items.map((it, i) => {
                      const x = 60 + i * stepX;
                      const isSel = selectedDayIndex === i;
                      return (
                        <g
                          key={`label-${i}`}
                          className="cursor-pointer"
                          onClick={() => setSelectedDayIndex(i)}
                        >
                          <text
                            x={x}
                            y={215}
                            textAnchor="middle"
                            className={`text-[12px] ${
                              isSel
                                ? 'font-bold fill-sky-600 dark:fill-sky-400'
                                : 'fill-slate-600 dark:fill-slate-300'
                            }`}
                          >
                            {it.dayName}
                          </text>
                          <text
                            x={x}
                            y={230}
                            textAnchor="middle"
                            className="text-[10px] fill-slate-400 dark:fill-slate-500"
                          >
                            {it.formattedDate}
                          </text>
                        </g>
                      );
                    })}
                  </>
                );
              })()}
            </svg>
          </div>
        </div>
      )}

      {/* Selected Day Detailed Strip */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-50/50 dark:bg-slate-900/30 p-3 rounded-xl">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-sky-500" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Selected Day: {activeItem.dayName} ({activeItem.formattedDate})
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600 dark:text-slate-400">{activeItem.condition.description}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-rose-600 dark:text-rose-400 font-medium flex items-center gap-0.5">
            <ArrowUp className="w-3 h-3" /> Max {formatTemp(activeItem.max, unit)}
          </span>
          <span className="text-sky-600 dark:text-sky-400 font-medium flex items-center gap-0.5">
            <ArrowDown className="w-3 h-3" /> Min {formatTemp(activeItem.min, unit)}
          </span>
        </div>
      </div>
    </div>
  );
};

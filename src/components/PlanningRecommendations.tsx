import React from 'react';
import {
  Compass,
  Shirt,
  Umbrella,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Sparkles,
  Car,
  ShieldCheck,
} from 'lucide-react';
import { CurrentWeather, DailyForecast } from '../types';
import { generatePlanningAdvice } from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';

interface PlanningRecommendationsProps {
  current: CurrentWeather;
  daily: DailyForecast;
}

export const PlanningRecommendations: React.FC<PlanningRecommendationsProps> = ({
  current,
  daily,
}) => {
  const advice = generatePlanningAdvice(current, daily);

  // Score color calculation
  let scoreColor = 'from-emerald-500 to-teal-600';
  let badgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';

  if (advice.outdoorScore < 40) {
    scoreColor = 'from-rose-500 to-red-600';
    badgeStyle = 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800';
  } else if (advice.outdoorScore < 65) {
    scoreColor = 'from-amber-500 to-orange-600';
    badgeStyle = 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
  }

  return (
    <div
      id="planning-recommendations-section"
      className="rounded-2xl bg-white dark:bg-slate-800/95 border border-slate-200/90 dark:border-slate-700/80 p-6 md:p-8 shadow-xs"
    >
      {/* Title & Comfort Score */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Planning Intelligence & Activity Recommendations
              </h3>
              <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${badgeStyle}`}>
                {advice.ratingLabel} Suitability
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Heuristic meteorological activity guidance derived from real-time metrics
            </p>
          </div>
        </div>

        {/* Outdoor Comfort Index Meter */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/60 px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
          <div className="text-right">
            <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              Outdoor Comfort Index
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {advice.outdoorScore}<span className="text-xs font-normal text-slate-400">/100</span>
            </div>
          </div>
          <div className="w-14 h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${scoreColor} transition-all duration-500 rounded-full`}
              style={{ width: `${advice.outdoorScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Atmospheric Overview Banner */}
      <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
            {advice.headline}
          </h4>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {advice.overview}
          </p>
        </div>
      </div>

      {/* Main Grid: Outdoor vs Indoor Activities */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Column 1: Outdoor Pursuits */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-sky-500" />
              <span>Outdoor Pursuits</span>
            </h4>
            <span className="text-[11px] text-slate-400">Field conditions evaluated</span>
          </div>

          <div className="space-y-2.5">
            {advice.outdoorActivities.map((act, idx) => {
              const isAvoid = act.status === 'not-recommended';
              const isCaution = act.status === 'caution';

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    isAvoid
                      ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-900/40'
                      : isCaution
                      ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/40'
                      : 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/40'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      isAvoid
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                        : isCaution
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                    }`}
                  >
                    <WeatherIcon name={act.iconName} className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {act.name}
                      </span>
                      {isAvoid ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-700 dark:text-rose-300">
                          <XCircle className="w-3 h-3" /> Avoid
                        </span>
                      ) : isCaution ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 dark:text-amber-300">
                          <AlertTriangle className="w-3 h-3" /> Caution
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                          <CheckCircle2 className="w-3 h-3" /> Ideal
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {act.reason}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Indoor Alternatives */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Umbrella className="w-4 h-4 text-indigo-500" />
              <span>Indoor Alternatives</span>
            </h4>
            <span className="text-[11px] text-slate-400">Weather-resilient spaces</span>
          </div>

          <div className="space-y-2.5">
            {advice.indoorActivities.map((act, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 shrink-0">
                  <WeatherIcon name={act.iconName} className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      {act.name}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                      <CheckCircle2 className="w-3 h-3" /> Recommended
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {act.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attire & Gear Recommendations */}
      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Attire Guidelines */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2.5">
            <Shirt className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Attire & Layering Guide
            </h5>
          </div>
          <ul className="space-y-1.5">
            {advice.clothingTips.map((tip, idx) => (
              <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Essential Gear */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2.5">
            <Umbrella className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Essential Pack & Gear
            </h5>
          </div>
          <div className="flex flex-wrap gap-2">
            {advice.gearRecommendations.map((gear, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                {gear}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Advisory & Best Time Window */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/30 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
          <Car className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block mb-0.5">Commute & Travel Advisory</span>
            <span className="leading-relaxed opacity-90">{advice.travelAdvisory}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200/80 dark:border-sky-900/30 flex items-start gap-2.5 text-xs text-sky-900 dark:text-sky-200">
          <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block mb-0.5">Optimal Time Window</span>
            <span className="leading-relaxed opacity-90">{advice.bestTimeOfDay}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

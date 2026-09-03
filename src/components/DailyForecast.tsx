import React, { useState } from 'react';
import {
  Calendar,
  Droplet,
  ChevronDown,
  ChevronUp,
  Wind,
  ArrowUp,
  ArrowDown,
  Layers
} from 'lucide-react';
import { DailyForecastItem } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { getUVLevel } from '../services/weatherApi';

interface DailyForecastProps {
  days: DailyForecastItem[];
  maxDaysToShow: 7 | 15;
  title: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export const DailyForecast: React.FC<DailyForecastProps> = ({
  days,
  maxDaysToShow,
  title,
  collapsible = false,
  defaultExpanded = true
}) => {
  const [isSectionOpen, setIsSectionOpen] = useState(defaultExpanded);
  const [expandedDate, setExpandedDate] = useState<string | null>(null);

  // Keep internal open state in sync when parent triggers expansion (e.g. from "Ver Previsão Completa" button)
  React.useEffect(() => {
    setIsSectionOpen(defaultExpanded);
  }, [defaultExpanded]);

  const forecastDays = days.slice(0, maxDaysToShow);

  const globalMin = Math.min(...forecastDays.map((d) => d.tempMin));
  const globalMax = Math.max(...forecastDays.map((d) => d.tempMax));
  const tempRange = Math.max(1, globalMax - globalMin);

  const toggleExpand = (date: string) => {
    setExpandedDate((prev) => (prev === date ? null : date));
  };

  return (
    <div className="space-y-3" id={`daily-forecast-container-${maxDaysToShow}`}>
      {/* Section Trigger Header (with Arrow button to open/close full forecast) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <button
          type="button"
          onClick={() => {
            if (collapsible) {
              setIsSectionOpen((prev) => !prev);
            }
          }}
          className={`w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left transition-colors ${
            collapsible ? 'hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 shadow-2xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
                  {title} ({maxDaysToShow} Dias)
                </h3>
                {collapsible && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {isSectionOpen ? 'Expandido' : 'Clique para ver'}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {collapsible && !isSectionOpen
                  ? 'Toque na seta para abrir a previsão completa dia a dia'
                  : 'Mínimas, máximas, probabilidade de chuva e vento'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold">
              <span className="flex items-center gap-0.5 text-rose-600 dark:text-rose-400">
                <ArrowUp className="w-3.5 h-3.5" /> Máx: {globalMax}°C
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-0.5 text-blue-600 dark:text-blue-400">
                <ArrowDown className="w-3.5 h-3.5" /> Mín: {globalMin}°C
              </span>
            </div>

            {collapsible && (
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-2xs">
                {isSectionOpen ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                )}
              </div>
            )}
          </div>
        </button>

        {/* Days List Body (Open or Closed) */}
        {isSectionOpen && (
          <div className="border-t border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 animate-in fade-in duration-200">
            {forecastDays.map((day, idx) => {
              const isExpanded = expandedDate === day.date;
              const uvInfo = getUVLevel(day.uvIndexMax);

              const leftPercent = Math.max(
                0,
                Math.min(100, ((day.tempMin - globalMin) / tempRange) * 100)
              );
              const widthPercent = Math.max(
                12,
                Math.min(100 - leftPercent, ((day.tempMax - day.tempMin) / tempRange) * 100)
              );

              return (
                <div
                  key={day.date}
                  className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/50"
                >
                  <button
                    onClick={() => toggleExpand(day.date)}
                    className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-2 sm:gap-4 transition-all"
                  >
                    {/* Day label and date */}
                    <div className="w-24 sm:w-28 shrink-0">
                      <div className="font-black text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{day.dayOfWeek}</span>
                        {idx === 0 && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                            Hoje
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                        {day.formattedDate}
                      </span>
                    </div>

                    {/* Weather Condition Icon & Text */}
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 sm:flex-initial sm:w-52">
                      <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-2xs shrink-0">
                        <WeatherIcon
                          name={day.condition.icon}
                          className={`w-6 h-6 sm:w-7 sm:h-7 ${day.condition.color}`}
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 block truncate">
                          {day.condition.label}
                        </span>
                        {day.precipitationProbabilityMax > 0 ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.2 rounded-md mt-0.5">
                            <Droplet className="w-3 h-3" />
                            {day.precipitationProbabilityMax}%
                            {day.precipitationSum > 0 && ` (${day.precipitationSum}mm)`}
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                            Sem chuva
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Visual Temperature Range Bar & Badges (Desktop) */}
                    <div className="hidden md:flex items-center gap-3 flex-1 px-4">
                      <span className="inline-flex items-center gap-0.5 text-xs font-black text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded-lg shrink-0">
                        <ArrowDown className="w-3 h-3 text-blue-500" />
                        {day.tempMin}°C
                      </span>

                      <div className="relative flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200/50 dark:border-slate-700/50">
                        <div
                          className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-blue-500 via-amber-400 to-rose-500 shadow-2xs"
                          style={{
                            left: `${leftPercent}%`,
                            width: `${widthPercent}%`
                          }}
                        />
                      </div>

                      <span className="inline-flex items-center gap-0.5 text-xs font-black text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 px-2 py-0.5 rounded-lg shrink-0">
                        <ArrowUp className="w-3.5 h-3.5 text-rose-500" />
                        {day.tempMax}°C
                      </span>
                    </div>

                    {/* Min/Max summary for Mobile */}
                    <div className="md:hidden flex items-center gap-1.5 shrink-0">
                      <span className="inline-flex items-center gap-0.5 text-xs font-extrabold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-1.5 py-0.5 rounded-lg">
                        {day.tempMin}°
                      </span>
                      <span className="text-slate-300 dark:text-slate-600 font-bold">/</span>
                      <span className="inline-flex items-center gap-0.5 text-xs font-extrabold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 px-1.5 py-0.5 rounded-lg">
                        {day.tempMax}°
                      </span>
                    </div>

                    {/* Row Chevron */}
                    <div className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* Expanded single-day details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <span className="text-slate-400 dark:text-slate-400 block text-[10px] font-bold uppercase">
                            Sensação Térmica
                          </span>
                          <div className="font-bold text-slate-800 dark:text-white mt-0.5">
                            Mín {day.apparentTempMin}°C • Máx {day.apparentTempMax}°C
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <span className="text-slate-400 dark:text-slate-400 block text-[10px] font-bold uppercase">
                            Volume de Chuva
                          </span>
                          <div className="font-bold text-blue-700 dark:text-blue-300 mt-0.5 flex items-center gap-1">
                            <Droplet className="w-3.5 h-3.5" />
                            {day.precipitationSum} mm ({day.precipitationProbabilityMax}% prob.)
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <span className="text-slate-400 dark:text-slate-400 block text-[10px] font-bold uppercase">
                            Vento Máximo
                          </span>
                          <div className="font-bold text-slate-800 dark:text-white mt-0.5 flex items-center gap-1">
                            <Wind className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                            Até {day.windSpeedMax} km/h
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <span className="text-slate-400 dark:text-slate-400 block text-[10px] font-bold uppercase">
                            Índice UV / Sol
                          </span>
                          <div className="font-bold text-slate-800 dark:text-white mt-0.5 flex items-center justify-between">
                            <span className={uvInfo.color}>
                              UV {day.uvIndexMax} ({uvInfo.level})
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                              {day.sunrise} - {day.sunset}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

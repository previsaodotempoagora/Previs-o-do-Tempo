import React, { useState } from 'react';
import {
  Calendar,
  Droplet,
  ChevronDown,
  ChevronUp,
  Wind,
  Sun,
  Sunrise,
  Sunset,
  ArrowUp,
  ArrowDown,
  Info
} from 'lucide-react';
import { DailyForecastItem } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { getUVLevel } from '../services/weatherApi';

interface DailyForecastProps {
  days: DailyForecastItem[];
  maxDaysToShow: 7 | 15;
  title: string;
}

export const DailyForecast: React.FC<DailyForecastProps> = ({
  days,
  maxDaysToShow,
  title
}) => {
  const [expandedDate, setExpandedDate] = useState<string | null>(null);

  const forecastDays = days.slice(0, maxDaysToShow);

  // Calculate the absolute min and max of the period for the visual temperature range bars
  const globalMin = Math.min(...forecastDays.map((d) => d.tempMin));
  const globalMax = Math.max(...forecastDays.map((d) => d.tempMax));
  const tempRange = Math.max(1, globalMax - globalMin);

  const toggleExpand = (date: string) => {
    setExpandedDate((prev) => (prev === date ? null : date));
  };

  return (
    <div className="space-y-4" id="daily-forecast-container">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Calendar className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
            {title} ({maxDaysToShow} Dias)
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1 text-rose-600">
            <ArrowUp className="w-3.5 h-3.5" /> Máx: {globalMax}°C
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-blue-600">
            <ArrowDown className="w-3.5 h-3.5" /> Mín: {globalMin}°C
          </span>
        </div>
      </div>

      {/* Days List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
        {forecastDays.map((day, idx) => {
          const isExpanded = expandedDate === day.date;
          const uvInfo = getUVLevel(day.uvIndexMax);

          // Bar calculation for relative position
          const leftPercent = Math.max(0, Math.min(100, ((day.tempMin - globalMin) / tempRange) * 100));
          const widthPercent = Math.max(12, Math.min(100 - leftPercent, ((day.tempMax - day.tempMin) / tempRange) * 100));

          return (
            <div key={day.date} className="transition-colors hover:bg-slate-50">
              <button
                onClick={() => toggleExpand(day.date)}
                className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-2 sm:gap-4 transition-all"
              >
                {/* Day label and date */}
                <div className="w-24 sm:w-28 shrink-0">
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <span>{day.dayOfWeek}</span>
                    {idx === 0 && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700">
                        Hoje
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {day.formattedDate}
                  </span>
                </div>

                {/* Weather Condition Icon & Text */}
                <div className="flex items-center gap-2.5 min-w-0 flex-1 sm:flex-initial sm:w-52">
                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs shrink-0">
                    <WeatherIcon
                      name={day.condition.icon}
                      className={`w-6 h-6 sm:w-7 sm:h-7 ${day.condition.color}`}
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-slate-800 block truncate">
                      {day.condition.label}
                    </span>
                    {day.precipitationProbabilityMax > 0 ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded-md mt-0.5">
                        <Droplet className="w-3 h-3" />
                        {day.precipitationProbabilityMax}%
                        {day.precipitationSum > 0 && ` (${day.precipitationSum}mm)`}
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-400">
                        Sem chuva prevista
                      </span>
                    )}
                  </div>
                </div>

                {/* Visual Temperature Range Bar & Badges (Desktop) */}
                <div className="hidden md:flex items-center gap-3 flex-1 px-4">
                  {/* Min temp badge */}
                  <span className="inline-flex items-center gap-0.5 text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-lg shrink-0">
                    <ArrowDown className="w-3 h-3 text-blue-500" />
                    {day.tempMin}°C
                  </span>

                  {/* Visual spectrum track */}
                  <div className="relative flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200/50">
                    <div
                      className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-blue-500 via-amber-400 to-rose-500 shadow-2xs"
                      style={{
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`
                      }}
                    />
                  </div>

                  {/* Max temp badge */}
                  <span className="inline-flex items-center gap-0.5 text-xs font-black text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-lg shrink-0">
                    <ArrowUp className="w-3 h-3 text-rose-500" />
                    {day.tempMax}°C
                  </span>
                </div>

                {/* Min/Max summary for Mobile */}
                <div className="md:hidden flex items-center gap-1.5 shrink-0">
                  <span className="inline-flex items-center gap-0.5 text-xs font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-lg">
                    {day.tempMin}°
                  </span>
                  <span className="text-slate-300 font-bold">/</span>
                  <span className="inline-flex items-center gap-0.5 text-xs font-extrabold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded-lg">
                    {day.tempMax}°
                  </span>
                </div>

                {/* Chevron */}
                <div className="p-1 text-slate-400 hover:text-slate-600 shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* Expanded details section */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 bg-slate-50 border-t border-slate-100 animate-in fade-in duration-200">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
                    {/* Thermal sensation */}
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">
                        Sensação Térmica
                      </span>
                      <div className="font-bold text-slate-800 mt-0.5">
                        Mín {day.apparentTempMin}°C • Máx {day.apparentTempMax}°C
                      </div>
                    </div>

                    {/* Rain sum */}
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">
                        Volume de Chuva
                      </span>
                      <div className="font-bold text-blue-700 mt-0.5 flex items-center gap-1">
                        <Droplet className="w-3.5 h-3.5" />
                        {day.precipitationSum} mm ({day.precipitationProbabilityMax}% prob.)
                      </div>
                    </div>

                    {/* Wind max */}
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">
                        Vento Máximo
                      </span>
                      <div className="font-bold text-slate-800 mt-0.5 flex items-center gap-1">
                        <Wind className="w-3.5 h-3.5 text-teal-600" />
                        Até {day.windSpeedMax} km/h
                      </div>
                    </div>

                    {/* UV max & Sun */}
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">
                        Índice UV / Sol
                      </span>
                      <div className="font-bold text-slate-800 mt-0.5 flex items-center justify-between">
                        <span className={uvInfo.color}>UV {day.uvIndexMax} ({uvInfo.level})</span>
                        <span className="text-[11px] text-slate-500">{day.sunrise} - {day.sunset}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

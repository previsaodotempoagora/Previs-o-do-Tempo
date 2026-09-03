import React from 'react';
import {
  TrendingUp,
  Droplets,
  ArrowUp,
  ArrowDown,
  SunMedium,
  Thermometer,
  ChevronDown
} from 'lucide-react';
import { DailyForecastItem } from '../types';
import { WeatherIcon } from './WeatherIcon';

interface ThermalOverviewChartProps {
  days: DailyForecastItem[];
  maxDays: 7 | 15;
  onOpenFullForecast?: () => void;
}

export const ThermalOverviewChart: React.FC<ThermalOverviewChartProps> = ({
  days,
  maxDays,
  onOpenFullForecast
}) => {
  const slice = days.slice(0, maxDays);
  if (!slice.length) return null;

  const maxTemp = Math.max(...slice.map((d) => d.tempMax));
  const minTemp = Math.min(...slice.map((d) => d.tempMin));
  const tempRange = Math.max(1, maxTemp - minTemp);

  const peakDay = slice.find((d) => d.tempMax === maxTemp);
  const coolestDay = slice.find((d) => d.tempMin === minTemp);
  const rainDaysCount = slice.filter((d) => d.precipitationProbabilityMax >= 30).length;

  return (
    <div
      className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 space-y-4 transition-colors"
      id="thermal-trend-overview"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 shadow-2xs">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                Tendência Térmica & Clima
              </h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                {maxDays} Dias
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Temperaturas máximas, mínimas e condições meteorológicas diárias
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300">
            <ArrowUp className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> Máximas
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-blue-700 dark:text-blue-300">
            <ArrowDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Mínimas
          </span>
        </div>
      </div>

      {/* Quick Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
        <div className="p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-rose-700 dark:text-rose-300 block tracking-wider">
              Pico de Calor
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-black text-rose-700 dark:text-rose-200">
                {maxTemp}°C
              </span>
              {peakDay && (
                <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 truncate">
                  ({peakDay.dayOfWeek})
                </span>
              )}
            </div>
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 shadow-2xs">
            <Thermometer className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-blue-700 dark:text-blue-300 block tracking-wider">
              Mínima Absoluta
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-black text-blue-700 dark:text-blue-200">
                {minTemp}°C
              </span>
              {coolestDay && (
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 truncate">
                  ({coolestDay.dayOfWeek})
                </span>
              )}
            </div>
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 shadow-2xs">
            <Thermometer className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-300 block tracking-wider">
              Variação Térmica
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-black text-amber-800 dark:text-amber-200">
                {tempRange}°C
              </span>
              <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                amplitude
              </span>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 shadow-2xs">
            <SunMedium className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-sky-800 dark:text-sky-300 block tracking-wider">
              Dias com Chuva
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-black text-sky-800 dark:text-sky-200">
                {rainDaysCount}
              </span>
              <span className="text-[11px] font-semibold text-sky-700 dark:text-sky-400">
                de {maxDays} dias
              </span>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-400 shadow-2xs">
            <Droplets className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Mobile View: Vertical list of horizontal day rows */}
      <div className="md:hidden space-y-2 pt-1">
        {slice.map((day, idx) => {
          const isToday = idx === 0;
          const leftPercent = Math.max(
            0,
            Math.min(85, ((day.tempMin - minTemp) / tempRange) * 100)
          );
          const widthPercent = Math.max(
            15,
            Math.min(100 - leftPercent, ((day.tempMax - day.tempMin) / tempRange) * 100)
          );

          return (
            <div
              key={day.date}
              className={`p-3 rounded-2xl border transition-all ${
                isToday
                  ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 ring-1 ring-blue-400/30'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                {/* Day & Date */}
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {day.dayOfWeek}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 font-mono">
                    {day.formattedDate.slice(0, 5)}
                  </span>
                  {isToday && (
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-blue-600 text-white">
                      Hoje
                    </span>
                  )}
                </div>

                {/* Condition Icon & Label */}
                <div className="flex items-center gap-1.5 text-right">
                  <div className="p-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200/80 dark:border-slate-600 shadow-2xs">
                    <WeatherIcon
                      name={day.condition.icon}
                      className={`w-4 h-4 ${day.condition.color} shrink-0`}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {day.condition.label}
                  </span>
                  {day.precipitationProbabilityMax > 0 && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950 px-1.5 py-0.5 rounded-md">
                      <Droplets className="w-2.5 h-2.5" />
                      {day.precipitationProbabilityMax}%
                    </span>
                  )}
                </div>
              </div>

              {/* Horizontal Temperature Bar & Badges */}
              <div className="flex items-center gap-2.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
                <span className="inline-flex items-center gap-0.5 text-xs font-black text-blue-700 dark:text-blue-300 bg-blue-100/80 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded-lg shrink-0">
                  <ArrowDown className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  {day.tempMin}°C
                </span>

                <div className="relative flex-1 h-3 rounded-full bg-slate-200/80 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-600">
                  <div
                    className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-blue-500 via-amber-400 to-rose-500 shadow-2xs"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`
                    }}
                  />
                </div>

                <span className="inline-flex items-center gap-0.5 text-xs font-black text-rose-700 dark:text-rose-300 bg-rose-100/80 dark:bg-rose-950 border border-rose-200 dark:border-rose-800 px-2 py-0.5 rounded-lg shrink-0">
                  <ArrowUp className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                  {day.tempMax}°C
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop View: Multi-column Vertical Chart */}
      <div className="hidden md:block overflow-x-auto no-scrollbar pt-2 pb-2">
        <div
          className="grid gap-2.5 sm:gap-3 min-w-full"
          style={{
            gridTemplateColumns: `repeat(${slice.length}, minmax(${maxDays === 15 ? '72px' : '90px'}, 1fr))`
          }}
        >
          {slice.map((day, idx) => {
            const isToday = idx === 0;
            const bottomPercent = Math.max(
              4,
              Math.min(80, ((day.tempMin - minTemp) / (tempRange + 2)) * 100)
            );
            const topPercent = Math.max(
              bottomPercent + 15,
              Math.min(100, ((day.tempMax - minTemp + 2) / (tempRange + 2)) * 100)
            );
            const heightPercent = Math.max(18, topPercent - bottomPercent);

            return (
              <div
                key={day.date}
                className={`p-2.5 sm:p-3 rounded-2xl border flex flex-col items-center justify-between text-center transition-all hover:shadow-md hover:-translate-y-0.5 ${
                  isToday
                    ? 'bg-blue-50/50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 ring-2 ring-blue-500/20'
                    : 'bg-slate-50/70 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700/80'
                }`}
              >
                {/* Day label */}
                <div className="w-full pb-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-black text-xs sm:text-sm text-slate-800 dark:text-slate-100">
                      {day.dayOfWeek}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 block font-mono">
                    {day.formattedDate.slice(0, 5)}
                  </span>
                  {isToday && (
                    <span className="mt-0.5 inline-block text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-blue-600 text-white">
                      Hoje
                    </span>
                  )}
                </div>

                {/* Weather Condition Icon with Tooltip/Label */}
                <div className="my-2.5 flex flex-col items-center gap-1">
                  <div
                    className="p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-2xs flex items-center justify-center"
                    title={day.condition.label}
                  >
                    <WeatherIcon
                      name={day.condition.icon}
                      className={`w-6 h-6 sm:w-7 sm:h-7 ${day.condition.color}`}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 max-w-[70px] sm:max-w-[84px] leading-tight line-clamp-1">
                    {day.condition.label}
                  </span>
                </div>

                {/* Max Temp Badge */}
                <div className="w-full my-1">
                  <div className="bg-rose-50 dark:bg-rose-950/60 border border-rose-200/90 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 py-1 px-1.5 rounded-xl flex items-center justify-center gap-0.5 shadow-2xs">
                    <ArrowUp className="w-3 h-3 text-rose-500 shrink-0" />
                    <span className="text-sm sm:text-base font-black tracking-tight">
                      {day.tempMax}°
                    </span>
                  </div>
                </div>

                {/* Visual Thermal Column */}
                <div className="w-full h-24 sm:h-28 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/70 dark:border-slate-700 my-1 relative p-1 overflow-hidden flex items-end justify-center">
                  <div
                    className="w-4 sm:w-5 rounded-full bg-gradient-to-t from-blue-500 via-amber-400 to-rose-500 shadow-xs absolute transition-all"
                    style={{
                      bottom: `${bottomPercent}%`,
                      height: `${heightPercent}%`
                    }}
                  />
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 absolute bottom-1 z-10">
                    Δ{day.tempMax - day.tempMin}°
                  </span>
                </div>

                {/* Min Temp Badge */}
                <div className="w-full my-1">
                  <div className="bg-blue-50 dark:bg-blue-950/60 border border-blue-200/90 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 py-1 px-1.5 rounded-xl flex items-center justify-center gap-0.5 shadow-2xs">
                    <ArrowDown className="w-3 h-3 text-blue-500 shrink-0" />
                    <span className="text-sm sm:text-base font-black tracking-tight">
                      {day.tempMin}°
                    </span>
                  </div>
                </div>

                {/* Rain probability */}
                <div className="w-full mt-1.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
                  {day.precipitationProbabilityMax > 0 ? (
                    <span className="inline-flex items-center justify-center gap-0.5 text-[10px] font-extrabold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 border border-blue-200/80 dark:border-blue-900 px-1.5 py-0.5 rounded-lg w-full">
                      <Droplets className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
                      {day.precipitationProbabilityMax}%
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 block">
                      Sem chuva
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Objective Action Arrow Prompt */}
      {onOpenFullForecast && (
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
          <button
            type="button"
            id={`btn-open-full-forecast-${maxDays}`}
            onClick={(e) => {
              e.preventDefault();
              onOpenFullForecast();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 group cursor-pointer active:scale-98"
          >
            <span>Ver Previsão Completa Dia a Dia ({maxDays} Dias)</span>
            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      )}
    </div>
  );
};

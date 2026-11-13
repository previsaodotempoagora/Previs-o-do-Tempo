import React, { useRef, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, Wind, Droplets, TrendingUp, TrendingDown } from 'lucide-react';
import { HourlyForecastItem } from '../types';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastProps {
  hourly: HourlyForecastItem[];
}

// Thermal palette helper for temperature nodes
function getThermalDetails(temp: number) {
  if (temp >= 32) {
    return {
      dotColor: '#be123c',
      badgeBg: 'bg-rose-600 text-white',
      textColor: 'text-rose-600 dark:text-rose-400',
      label: 'Muito Quente'
    };
  }
  if (temp >= 27) {
    return {
      dotColor: '#e07a5f',
      badgeBg: 'bg-orange-500 text-white',
      textColor: 'text-orange-600 dark:text-orange-400',
      label: 'Quente'
    };
  }
  if (temp >= 22) {
    return {
      dotColor: '#ad345a',
      badgeBg: 'bg-brand-600 text-white',
      textColor: 'text-brand-600 dark:text-brand-400',
      label: 'Agradável'
    };
  }
  return {
    dotColor: '#7c6bc4',
    badgeBg: 'bg-indigo-500 text-white',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    label: 'Fresco'
  };
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Early return if no hourly items are provided
  if (!hourly || !Array.isArray(hourly) || hourly.length === 0) {
    return null;
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Dimensions for the temperature timeline SVG
  const COL_WIDTH = 84;
  const SVG_HEIGHT = 150;
  const TOP_PADDING = 38; // Headroom for temperature label above crest
  const BOTTOM_PADDING = 24; // Baseline clearance above bottom of chart
  const USABLE_HEIGHT = SVG_HEIGHT - TOP_PADDING - BOTTOM_PADDING;

  // Temperature calculations for the dynamic vertical curve
  const { points, minTemp, maxTemp, pathD, areaD, yForMax, yForMin, currentTrend } = useMemo(() => {
    if (!hourly || hourly.length === 0) {
      return {
        points: [],
        minTemp: 0,
        maxTemp: 0,
        pathD: '',
        areaD: '',
        yForMax: TOP_PADDING,
        yForMin: SVG_HEIGHT - BOTTOM_PADDING,
        currentTrend: 'estável'
      };
    }

    const validTemps = hourly.map((h) =>
      typeof h.temp === 'number' && !isNaN(h.temp) ? h.temp : 20
    );
    const min = Math.min(...validTemps);
    const max = Math.max(...validTemps);
    const rawRange = max - min;
    // Guarantee an expressive, perceptible vertical rise and fall (at least 3.5 degrees visual scale)
    const range = Math.max(rawRange, 3.5);

    const pts = hourly.map((item, i) => {
      const tempVal = typeof item.temp === 'number' && !isNaN(item.temp) ? item.temp : 20;
      const x = i * COL_WIDTH + COL_WIDTH / 2;
      // High temperature -> smaller y (closer to top), low temperature -> larger y (lower)
      const ratio = Math.max(0, Math.min(1, (tempVal - min) / range));
      const calcY = TOP_PADDING + (1 - ratio) * USABLE_HEIGHT;
      const y = isFinite(calcY) ? calcY : TOP_PADDING + USABLE_HEIGHT / 2;
      const thermal = getThermalDetails(tempVal);
      return { x, y, temp: tempVal, item, index: i, thermal };
    });

    // Generate organic smooth curve through all (x, y) coordinates
    let d = '';
    if (pts.length === 1) {
      d = `M ${(pts[0].x - 20).toFixed(1)} ${pts[0].y.toFixed(1)} L ${(pts[0].x + 20).toFixed(1)} ${pts[0].y.toFixed(1)}`;
    } else if (pts.length > 1) {
      d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
      const tension = 3.6;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i === 0 ? 0 : i - 1];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] || p2;

        const cp1x = p1.x + (p2.x - p0.x) / tension;
        const cp1y = Math.max(TOP_PADDING - 6, Math.min(SVG_HEIGHT - BOTTOM_PADDING + 10, p1.y + (p2.y - p0.y) / tension));
        const cp2x = p2.x - (p3.x - p1.x) / tension;
        const cp2y = Math.max(TOP_PADDING - 6, Math.min(SVG_HEIGHT - BOTTOM_PADDING + 10, p2.y - (p3.y - p1.y) / tension));

        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
      }
    }

    // Area path closed to the bottom of the chart
    let area = '';
    if (pts.length > 0 && d) {
      const firstX = pts[0].x;
      const lastX = pts[pts.length - 1].x;
      area = `${d} L ${lastX.toFixed(1)} ${SVG_HEIGHT} L ${firstX.toFixed(1)} ${SVG_HEIGHT} Z`;
    }

    // Y position for max and min reference lines
    const maxRatio = (max - min) / range;
    const yMax = TOP_PADDING + (1 - maxRatio) * USABLE_HEIGHT;
    const yMin = TOP_PADDING + USABLE_HEIGHT;

    // Detect near-term trend from next 4 hours
    let trend = 'estável';
    if (pts.length >= 3) {
      const delta = pts[2].temp - pts[0].temp;
      if (delta >= 1) trend = 'subindo';
      else if (delta <= -1) trend = 'descendo';
    }

    return {
      points: pts,
      minTemp: min,
      maxTemp: max,
      pathD: d,
      areaD: area,
      yForMax: yMax,
      yForMin: yMin,
      currentTrend: trend
    };
  }, [hourly]);

  const totalWidth = Math.max(COL_WIDTH, (hourly?.length || 0) * COL_WIDTH);

  return (
    <div
      className="bg-white dark:bg-plum-900 rounded-3xl border border-stone-200/90 dark:border-plum-800 shadow-sm p-4 sm:p-5 transition-colors"
      id="hourly-forecast-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-900/50 shadow-2xs">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-black text-sm sm:text-base text-stone-900 dark:text-white tracking-tight">
                Previsão Hora a Hora
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200/80 dark:border-brand-800/80">
                {currentTrend === 'subindo' ? (
                  <>
                    <TrendingUp className="w-3 h-3 text-amber-500" />
                    <span>Em Elevação</span>
                  </>
                ) : currentTrend === 'descendo' ? (
                  <>
                    <TrendingDown className="w-3 h-3 text-brand-500" />
                    <span>Em Queda</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-3 h-3 text-brand-600 dark:text-brand-400" />
                    <span>Linha do Tempo</span>
                  </>
                )}
              </span>
            </div>
            <span className="text-[11px] text-stone-400 dark:text-stone-500 font-medium">
              Curva térmica das próximas 24 horas (oscilando entre {minTemp}°C e {maxTemp}°C)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="p-1.5 rounded-xl border border-stone-200 dark:border-plum-800 bg-white dark:bg-plum-850 hover:bg-brand-50 dark:hover:bg-plum-800 text-stone-600 dark:text-stone-200 transition-colors shadow-2xs active:scale-95 cursor-pointer"
            title="Rolar linha do tempo para trás"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="p-1.5 rounded-xl border border-stone-200 dark:border-plum-800 bg-white dark:bg-plum-850 hover:bg-brand-50 dark:hover:bg-plum-800 text-stone-600 dark:text-stone-200 transition-colors shadow-2xs active:scale-95 cursor-pointer"
            title="Rolar linha do tempo para frente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Temperature Timeline Container */}
      <div
        ref={scrollRef}
        className="relative overflow-x-auto no-scrollbar pt-2 pb-3 scroll-smooth rounded-2xl bg-gradient-to-b from-brand-50/40 to-stone-100/60 dark:from-plum-950/60 dark:to-plum-900/40 border border-stone-200/70 dark:border-plum-800/70"
      >
        <div style={{ width: `${totalWidth}px` }} className="relative select-none">
          {/* 1. TOP PART: SVG with smooth curve that rises and falls with temperature */}
          <div className="relative w-full h-[150px]">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox={`0 0 ${totalWidth} ${SVG_HEIGHT}`}
              preserveAspectRatio="none"
            >
              <defs>
                {/* Gradient for area under the thermal curve */}
                <linearGradient id="hourlyTempFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C94B72" stopOpacity="0.28" />
                  <stop offset="60%" stopColor="#E5988B" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="#FCE7EC" stopOpacity="0.0" />
                </linearGradient>

                {/* Stroke line gradient for the curve */}
                <linearGradient id="hourlyCurveStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#AD345A" />
                  <stop offset="35%" stopColor="#E07A5F" />
                  <stop offset="65%" stopColor="#C94B72" />
                  <stop offset="100%" stopColor="#7C6BC4" />
                </linearGradient>
              </defs>

              {/* Horizontal Reference Guides for Peak Max and Valley Min */}
              {maxTemp !== minTemp && (
                <>
                  <line
                    x1="0"
                    y1={yForMax}
                    x2={totalWidth}
                    y2={yForMax}
                    stroke="currentColor"
                    strokeDasharray="3 4"
                    className="text-amber-400/50 dark:text-amber-500/30"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1={yForMin}
                    x2={totalWidth}
                    y2={yForMin}
                    stroke="currentColor"
                    strokeDasharray="3 4"
                    className="text-brand-300/60 dark:text-brand-500/30"
                    strokeWidth="1"
                  />
                </>
              )}

              {/* Area gradient under the curve */}
              {areaD && (
                <path d={areaD} fill="url(#hourlyTempFill)" />
              )}

              {/* Smooth dynamic curve that physically rises and falls with temperature */}
              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#hourlyCurveStroke)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Vertical dotted guides connecting each node down towards the time label */}
              {points.map((pt) => {
                const isHovered = hoveredIdx === pt.index;
                const isNow = pt.index === 0;
                return (
                  <line
                    key={`guide-${pt.index}`}
                    x1={pt.x}
                    y1={pt.y + 7}
                    x2={pt.x}
                    y2={SVG_HEIGHT}
                    stroke={isNow || isHovered ? '#AD345A' : 'currentColor'}
                    strokeDasharray="2 3"
                    className="text-stone-300 dark:text-plum-800"
                    strokeWidth={isNow || isHovered ? '1.5' : '1'}
                    opacity={isNow || isHovered ? '0.75' : '0.35'}
                  />
                );
              })}

              {/* Nodes and Temperature Labels */}
              {points.map((pt) => {
                const isNow = pt.index === 0;
                const isHovered = hoveredIdx === pt.index;
                const isMax = pt.temp === maxTemp;
                const isMin = pt.temp === minTemp;

                return (
                  <g key={`node-${pt.index}`}>
                    {/* Temperature value text floating right above the node */}
                    <text
                      x={pt.x}
                      y={pt.y - 12}
                      textAnchor="middle"
                      className={`font-black tracking-tight select-none tabular-nums ${
                        isNow
                          ? 'fill-brand-600 dark:fill-brand-400 font-extrabold text-[15px]'
                          : isMax
                          ? 'fill-rose-600 dark:fill-rose-400 font-extrabold text-[15px]'
                          : isMin
                          ? 'fill-indigo-600 dark:fill-indigo-300 font-bold text-[14px]'
                          : isHovered
                          ? 'fill-brand-600 dark:fill-brand-400 text-[15px]'
                          : 'fill-stone-800 dark:fill-stone-100 text-[14px]'
                      }`}
                    >
                      {pt.temp}°
                    </text>

                    {/* Timeline Node point on the curve */}
                    {isNow ? (
                      <g>
                        {/* Outer pulse wave */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="10"
                          className="fill-brand-400/40 animate-pulse"
                        />
                        {/* Central current node */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="5.5"
                          className="fill-brand-600 stroke-2 stroke-white dark:stroke-plum-900 shadow-sm"
                        />
                      </g>
                    ) : (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? '5.5' : '4'}
                        fill={isHovered ? '#AD345A' : pt.thermal.dotColor}
                        className="stroke-2 stroke-white dark:stroke-plum-900 transition-all shadow-xs"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* 2. BOTTOM PART: Aligned columns for weather condition, wind, and hour */}
          <div className="flex w-full">
            {hourly.map((item, index) => {
              const isNow = index === 0;
              const isHovered = hoveredIdx === index;

              return (
                <div
                  key={item.time || index}
                  style={{ width: `${COL_WIDTH}px` }}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`flex-none flex flex-col items-center justify-between text-center py-2 px-1 transition-all rounded-xl cursor-pointer ${
                    isHovered
                      ? 'bg-brand-50/70 dark:bg-brand-950/40'
                      : ''
                  }`}
                >
                  {/* Weather condition icon */}
                  <div className="flex flex-col items-center justify-center my-1">
                    <div
                      className={`p-1.5 rounded-xl transition-transform ${
                        isNow
                          ? 'bg-brand-100/90 dark:bg-brand-950/80 shadow-2xs scale-105'
                          : isHovered
                          ? 'scale-110'
                          : ''
                      }`}
                    >
                      <WeatherIcon
                        name={item.condition.icon}
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${item.condition.color}`}
                      />
                    </div>

                    {/* Rain probability if > 0 */}
                    {item.rainProb > 0 ? (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-brand-600 dark:text-brand-400 mt-1 tabular-nums">
                        <Droplets className="w-2.5 h-2.5" />
                        {item.rainProb}%
                      </span>
                    ) : (
                      <span className="h-3.5 block mt-1" />
                    )}
                  </div>

                  {/* Wind speed */}
                  <div className="flex items-center justify-center gap-0.5 text-[10px] font-semibold text-stone-500 dark:text-stone-400 mb-2 tabular-nums">
                    <Wind className="w-2.5 h-2.5 shrink-0 opacity-70 text-stone-400" />
                    <span className="truncate">{item.windSpeed} km/h</span>
                  </div>

                  {/* Hour badge / label at the bottom */}
                  <div className="w-full pt-1.5 border-t border-stone-200/70 dark:border-plum-800/80">
                    <span
                      className={`text-[11px] font-extrabold tracking-tight px-1.5 py-0.5 rounded-md inline-block tabular-nums ${
                        isNow
                          ? 'bg-brand-600 text-white shadow-2xs'
                          : isHovered
                          ? 'text-brand-600 dark:text-brand-400 font-black'
                          : 'text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      {isNow ? 'Agora' : item.hour}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

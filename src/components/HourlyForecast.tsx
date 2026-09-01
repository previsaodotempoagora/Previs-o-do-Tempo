import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock, Droplet } from 'lucide-react';
import { HourlyForecastItem } from '../types';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastProps {
  hourly: HourlyForecastItem[];
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6" id="hourly-forecast-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Clock className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
            Previsão Hora a Hora (Próximas 24h)
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors shadow-xs active:scale-95"
            title="Rolar para esquerda"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors shadow-xs active:scale-95"
            title="Rolar para direita"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex items-stretch gap-2.5 overflow-x-auto no-scrollbar pb-2 pt-1 scroll-smooth"
      >
        {hourly.map((item, index) => {
          const isNow = index === 0;
          return (
            <div
              key={item.time || index}
              className={`flex-none w-[88px] sm:w-[96px] p-3 rounded-2xl flex flex-col items-center justify-between text-center transition-all ${
                isNow
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 border-none ring-2 ring-blue-400/40'
                  : 'bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-slate-800'
              }`}
            >
              <span
                className={`text-xs font-bold ${
                  isNow ? 'text-white' : 'text-slate-600'
                }`}
              >
                {item.hour}
              </span>

              <div className="my-2.5">
                <WeatherIcon
                  name={item.condition.icon}
                  className={`w-7 h-7 sm:w-8 sm:h-8 ${
                    isNow ? 'text-white' : item.condition.color
                  }`}
                />
              </div>

              <div className="flex items-baseline font-black text-base sm:text-lg tracking-tight">
                {item.temp}°
              </div>

              {/* Rain chance pill */}
              <div
                className={`mt-2 w-full py-1 px-1.5 rounded-lg flex items-center justify-center gap-1 text-[11px] font-bold ${
                  isNow
                    ? item.rainProb > 0
                      ? 'bg-white/20 text-white'
                      : 'text-white/70'
                    : item.rainProb > 0
                    ? 'bg-blue-100 text-blue-800'
                    : 'text-slate-400'
                }`}
              >
                <Droplet className="w-3 h-3 shrink-0" />
                <span>{item.rainProb}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

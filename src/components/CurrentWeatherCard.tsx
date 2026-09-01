import React from 'react';
import {
  MapPin,
  ArrowUp,
  ArrowDown,
  Droplets,
  Wind,
  Sun,
  Umbrella,
  Gauge,
  Eye,
  AlertTriangle,
  Compass
} from 'lucide-react';
import { CurrentWeather, DailyForecastItem, LocationData } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { getUVLevel, getWindDirectionLabel } from '../services/weatherApi';

interface CurrentWeatherCardProps {
  location: LocationData;
  current: CurrentWeather;
  todayDaily?: DailyForecastItem;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  location,
  current,
  todayDaily
}) => {
  const uvInfo = getUVLevel(current.uvIndex);
  const windDir = getWindDirectionLabel(current.windDirection);

  // Weather advisory alerts for Brazil conditions
  const alerts: { type: 'warning' | 'info'; title: string; desc: string }[] = [];

  if (current.humidity < 30) {
    alerts.push({
      type: 'warning',
      title: 'Alerta de Baixa Umidade',
      desc: `Umidade do ar em ${current.humidity}%. Beba bastante água e evite exercícios intensos ao ar livre.`
    });
  }

  if (current.uvIndex >= 8) {
    alerts.push({
      type: 'warning',
      title: `Índice UV ${uvInfo.level} (${current.uvIndex})`,
      desc: 'Risco alto de queimaduras solares. Use protetor solar FPS 30+, óculos de sol e busque sombra.'
    });
  }

  if (todayDaily && todayDaily.precipitationProbabilityMax >= 70) {
    alerts.push({
      type: 'info',
      title: 'Alta Probabilidade de Chuva Hoje',
      desc: `Probabilidade de ${todayDaily.precipitationProbabilityMax}% com previsão de até ${todayDaily.precipitationSum}mm de precipitação.`
    });
  }

  if (current.temp >= 33) {
    alerts.push({
      type: 'warning',
      title: 'Calor Intenso',
      desc: `Temperatura de ${current.temp}°C com sensação de ${current.feelsLike}°C. Mantenha-se hidratado.`
    });
  }

  const currentDateFormatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(new Date());

  const capitalizedDate = currentDateFormatted.charAt(0).toUpperCase() + currentDateFormatted.slice(1);

  return (
    <div className="w-full space-y-4" id="current-weather-section">
      {/* Primary Hero Card */}
      <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-7 transition-all">
        {/* Subtle dynamic background gradient based on condition */}
        <div className={`absolute inset-0 bg-gradient-to-br ${current.condition.bgGradient} pointer-events-none opacity-60`} />

        <div className="relative z-10">
          {/* Header Location & Date */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                  {location.name}
                  {location.stateCode && (
                    <span className="text-slate-400 font-semibold text-lg ml-1.5">
                      • {location.stateCode}
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {location.state || location.country}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold text-slate-600 block">
                {capitalizedDate}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Tempo Real
              </span>
            </div>
          </div>

          {/* Temperature & Main Icon Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 py-6 items-center">
            {/* Big Temperature block */}
            <div className="sm:col-span-7 flex items-center gap-4 sm:gap-6">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
                <WeatherIcon
                  name={current.condition.icon}
                  className={`w-14 h-14 sm:w-16 sm:h-16 ${current.condition.color}`}
                />
              </div>

              <div>
                <div className="flex items-baseline">
                  <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-slate-950">
                    {current.temp}
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 ml-0.5">°C</span>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-sm sm:text-base font-bold ${current.condition.color}`}>
                    {current.condition.label}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                  <span>Sensação: <strong className="text-slate-800">{current.feelsLike}°C</strong></span>
                  {todayDaily && (
                    <>
                      <span className="text-slate-300">•</span>
                      <div className="flex items-center gap-1 text-slate-700">
                        <span className="flex items-center text-rose-600 font-bold">
                          <ArrowUp className="w-3.5 h-3.5" /> {todayDaily.tempMax}°
                        </span>
                        <span className="flex items-center text-blue-600 font-bold ml-1">
                          <ArrowDown className="w-3.5 h-3.5" /> {todayDaily.tempMin}°
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Quick overview right block */}
            <div className="sm:col-span-5 bg-slate-50 rounded-2xl p-4 border border-slate-200 grid grid-cols-2 gap-3 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                  <Umbrella className="w-3.5 h-3.5 text-blue-600" />
                  <span>Chuva Hoje</span>
                </div>
                <div className="text-sm font-bold text-slate-800 mt-1">
                  {todayDaily?.precipitationProbabilityMax ?? 0}%
                  {todayDaily && todayDaily.precipitationSum > 0 && (
                    <span className="text-xs font-normal text-slate-500 ml-1">
                      ({todayDaily.precipitationSum} mm)
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                  <Droplets className="w-3.5 h-3.5 text-sky-600" />
                  <span>Umidade</span>
                </div>
                <div className="text-sm font-bold text-slate-800 mt-1">
                  {current.humidity}%
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                  <Wind className="w-3.5 h-3.5 text-teal-600" />
                  <span>Vento</span>
                </div>
                <div className="text-sm font-bold text-slate-800 mt-1">
                  {current.windSpeed} km/h <span className="text-xs text-slate-500 font-normal">({windDir})</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Índice UV</span>
                </div>
                <div className="text-sm font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                  <span>{current.uvIndex}</span>
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${uvInfo.color} bg-white border border-slate-200`}>
                    {uvInfo.level}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts banner if any */}
          {alerts.length > 0 && (
            <div className="mt-2 space-y-2">
              {alerts.map((alert, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl flex items-start gap-3 text-xs leading-relaxed ${
                    alert.type === 'warning'
                      ? 'bg-amber-50 border border-amber-200 text-amber-900'
                      : 'bg-blue-50 border border-blue-200 text-blue-950'
                  }`}
                >
                  <AlertTriangle
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      alert.type === 'warning' ? 'text-amber-600' : 'text-blue-600'
                    }`}
                  />
                  <div>
                    <strong className="font-bold">{alert.title}: </strong>
                    <span>{alert.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

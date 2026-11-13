import React from 'react';
import {
  MapPin,
  ArrowUp,
  ArrowDown,
  Droplets,
  Wind,
  Sun,
  Umbrella,
  AlertTriangle,
  Moon,
  Sparkles,
  Star
} from 'lucide-react';
import { CurrentWeather, DailyForecastItem, LocationData } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { getUVLevel, getWindDirectionLabel } from '../services/weatherApi';

interface CurrentWeatherCardProps {
  location: LocationData;
  current: CurrentWeather;
  todayDaily?: DailyForecastItem;
  isFavorite?: boolean;
  onToggleFavorite?: (location: LocationData) => void;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  location,
  current,
  todayDaily,
  isFavorite = false,
  onToggleFavorite
}) => {
  const uvInfo = getUVLevel(current.uvIndex);
  const windDir = getWindDirectionLabel(current.windDirection);
  const isNight = !current.isDay;

  // Advisory alerts for Brazilian climate conditions
  const alerts: { type: 'warning' | 'info'; title: string; desc: string }[] = [];

  if (current.humidity < 30) {
    alerts.push({
      type: 'warning',
      title: 'Alerta de Baixa Umidade',
      desc: `Umidade relativa em ${current.humidity}%. Hidrate-se e evite exposição solar intensa.`
    });
  }

  if (current.uvIndex >= 8 && !isNight) {
    alerts.push({
      type: 'warning',
      title: `Índice UV ${uvInfo.level} (${current.uvIndex})`,
      desc: 'Risco muito alto. Recomendado protetor solar FPS 30+, óculos escuros e sombra.'
    });
  }

  if (todayDaily && todayDaily.precipitationProbabilityMax >= 70) {
    alerts.push({
      type: 'info',
      title: 'Alta Probabilidade de Chuva Hoje',
      desc: `Probabilidade de ${todayDaily.precipitationProbabilityMax}% com previsão de até ${todayDaily.precipitationSum}mm de precipitação acumulada.`
    });
  }

  if (current.temp >= 33) {
    alerts.push({
      type: 'warning',
      title: 'Alerta de Calor Intenso',
      desc: `Temperatura de ${current.temp}°C com sensação térmica de ${current.feelsLike}°C.`
    });
  }

  const currentDateFormatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(new Date());

  const capitalizedDate =
    currentDateFormatted.charAt(0).toUpperCase() + currentDateFormatted.slice(1);

  // Dynamic background styling according to day/night and weather condition
  // If Night: Xiaomi style deep night blue gradient with starlight atmosphere
  // If Day: Atmospheric sky gradient matching weather conditions (sunny, overcast, rain)
  const getThemeBackground = () => {
    if (isNight) {
      return {
        wrapperBg: 'bg-gradient-to-b from-[#1D1228] via-[#2C1A3D] to-[#140C1C] text-white border-purple-900/50 shadow-xl shadow-purple-950/35',
        textColor: 'text-white',
        mutedText: 'text-rose-200/80',
        badgeBg: 'bg-white/10 backdrop-blur-md border border-white/15 text-rose-100',
        tempColor: 'text-white',
        degreeColor: 'text-rose-200',
        subBoxBg: 'bg-white/10 backdrop-blur-md border border-white/15 text-white',
        subBoxMuted: 'text-rose-200/75',
        iconBg: 'bg-purple-950/60 border border-purple-700/40 text-amber-200 shadow-inner'
      };
    }

    const code = current.condition.code;

    // Rainy conditions (61-65, 80-82)
    if (code >= 51 && code <= 82) {
      return {
        wrapperBg: 'bg-gradient-to-br from-[#3B2E44] via-[#53425E] to-[#836283] text-white border-purple-900/35 shadow-lg',
        textColor: 'text-white',
        mutedText: 'text-rose-100/85',
        badgeBg: 'bg-white/15 backdrop-blur-md border border-white/20 text-rose-50',
        tempColor: 'text-white',
        degreeColor: 'text-rose-200',
        subBoxBg: 'bg-white/10 backdrop-blur-md border border-white/15 text-white',
        subBoxMuted: 'text-rose-100/75',
        iconBg: 'bg-purple-950/35 border border-white/20 text-rose-200'
      };
    }

    // Overcast / Fog (3, 45, 48)
    if (code === 3 || code === 45 || code === 48) {
      return {
        wrapperBg: 'bg-gradient-to-br from-[#554750] via-[#6D5B66] to-[#8E7A86] text-white border-stone-600/40 shadow-lg',
        textColor: 'text-white',
        mutedText: 'text-rose-100/80',
        badgeBg: 'bg-white/15 backdrop-blur-md border border-white/20 text-stone-100',
        tempColor: 'text-white',
        degreeColor: 'text-rose-200',
        subBoxBg: 'bg-white/10 backdrop-blur-md border border-white/15 text-white',
        subBoxMuted: 'text-rose-100/75',
        iconBg: 'bg-stone-800/40 border border-white/20 text-rose-100'
      };
    }

    // Thunderstorm (95, 96, 99)
    if (code >= 95) {
      return {
        wrapperBg: 'bg-gradient-to-br from-[#1C1226] via-[#341C44] to-[#522861] text-white border-purple-900/50 shadow-xl',
        textColor: 'text-white',
        mutedText: 'text-purple-200/80',
        badgeBg: 'bg-white/15 backdrop-blur-md border border-white/20 text-amber-200',
        tempColor: 'text-white',
        degreeColor: 'text-amber-300',
        subBoxBg: 'bg-white/10 backdrop-blur-md border border-white/15 text-white',
        subBoxMuted: 'text-purple-200/75',
        iconBg: 'bg-purple-950/60 border border-purple-800/40 text-amber-300'
      };
    }

    // Sunny / Clear sky (0, 1, 2) - Sunlit Rose Gold & Velvet Berry
    return {
      wrapperBg: 'bg-gradient-to-br from-[#A2345A] via-[#C65277] to-[#E5988B] text-white border-brand-400/40 shadow-lg shadow-brand-500/20',
      textColor: 'text-white',
      mutedText: 'text-rose-50/90',
      badgeBg: 'bg-white/20 backdrop-blur-md border border-white/25 text-white',
      tempColor: 'text-white',
      degreeColor: 'text-amber-200',
      subBoxBg: 'bg-white/15 backdrop-blur-md border border-white/20 text-white',
      subBoxMuted: 'text-rose-50/85',
      iconBg: 'bg-white/20 backdrop-blur-md border border-white/30 text-amber-200 shadow-md'
    };
  };

  const theme = getThemeBackground();

  return (
    <div className="w-full space-y-4" id="current-weather-section">
      {/* Primary Atmospheric Hero Card */}
      <div
        className={`relative overflow-hidden rounded-3xl border p-5 sm:p-7 transition-all duration-300 ${theme.wrapperBg}`}
      >
        {/* Decorative Celestial Backdrops */}
        {isNight ? (
          // Night Sky Stars & subtle plum ambient glow
          <div className="absolute inset-0 pointer-events-none opacity-45 overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-brand-400/20 blur-3xl" />
            <div className="absolute top-8 left-1/4 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <div className="absolute top-16 right-1/3 w-1 h-1 rounded-full bg-rose-200 animate-pulse" />
            <div className="absolute bottom-12 left-1/2 w-1.5 h-1.5 rounded-full bg-amber-100 animate-pulse" />
            <div className="absolute top-24 right-1/4 w-1 h-1 rounded-full bg-white opacity-80" />
            <div className="absolute bottom-6 left-1/6 w-1 h-1 rounded-full bg-white opacity-60" />
          </div>
        ) : (
          // Sunny / Daylight Champagne-Rose Glow
          <div className="absolute inset-0 pointer-events-none opacity-35 overflow-hidden">
            <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/25 blur-2xl" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-amber-200/25 blur-2xl" />
          </div>
        )}

        <div className="relative z-10">
          {/* Header Location & Date */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-4">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl ${theme.badgeBg}`}>
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white drop-shadow-xs">
                    {location.name}
                    {location.stateCode && (
                      <span className="opacity-80 font-semibold text-lg ml-1.5">
                        • {location.stateCode}
                      </span>
                    )}
                  </h2>
                  {onToggleFavorite && (
                    <button
                      type="button"
                      onClick={() => onToggleFavorite(location)}
                      title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                      id="card-toggle-favorite-btn"
                      className={`p-1.5 rounded-full transition-all cursor-pointer ${
                        isFavorite
                          ? 'bg-amber-400/20 text-amber-300 hover:bg-amber-400/30'
                          : 'bg-white/10 text-white/70 hover:text-amber-300 hover:bg-white/20'
                      }`}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          isFavorite ? 'fill-amber-400 text-amber-400' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>
                <p className={`text-xs font-medium mt-1 ${theme.mutedText}`}>
                  {location.state || location.country}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className={`text-xs font-semibold block ${theme.mutedText}`}>
                {capitalizedDate}
              </span>
              <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full mt-1 ${theme.badgeBg}`}>
                {isNight ? (
                  <>
                    <Moon className="w-3 h-3 text-sky-200 fill-sky-200/40" />
                    <span>Tempo Noturno</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Tempo Real</span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Temperature & Main Icon Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 py-6 items-center">
            {/* Big Temperature block */}
            <div className="sm:col-span-7 flex items-center gap-4 sm:gap-6">
              <div
                className={`p-4 rounded-3xl shrink-0 flex items-center justify-center ${theme.iconBg}`}
              >
                <WeatherIcon
                  name={current.condition.icon}
                  className="w-14 h-14 sm:w-16 sm:h-16 text-white drop-shadow-md"
                />
              </div>

              <div>
                <div className="flex items-baseline">
                  <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white drop-shadow-md">
                    {current.temp}
                  </span>
                  <span className={`text-2xl sm:text-3xl font-extrabold ml-1 ${theme.degreeColor}`}>
                    °C
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm sm:text-base font-bold text-white drop-shadow-xs">
                    {current.condition.label}
                  </span>
                </div>

                <div className={`flex items-center gap-2.5 text-xs sm:text-sm font-semibold mt-1.5 flex-wrap ${theme.mutedText}`}>
                  <span>
                    Sensação Térmica:{' '}
                    <strong className="text-white font-black">{current.feelsLike}°C</strong>
                  </span>
                  {todayDaily && (
                    <>
                      <span className="opacity-40">•</span>
                      <div className="flex items-center gap-1 text-white">
                        <span className="flex items-center text-rose-300 font-bold">
                          <ArrowUp className="w-3.5 h-3.5" /> {todayDaily.tempMax}°
                        </span>
                        <span className="flex items-center text-sky-200 font-bold ml-1">
                          <ArrowDown className="w-3.5 h-3.5" /> {todayDaily.tempMin}°
                        </span>
                      </div>
                    </>
                  )}
                  <span className="opacity-40 hidden sm:inline">•</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15 text-white/90 border border-white/20">
                    Dados Open-Meteo Oficial
                  </span>
                </div>
              </div>
            </div>

            {/* Quick overview right block */}
            <div
              className={`sm:col-span-5 rounded-2xl p-4 grid grid-cols-2 gap-3 text-left ${theme.subBoxBg}`}
            >
              <div>
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${theme.subBoxMuted}`}>
                  <Umbrella className="w-3.5 h-3.5 text-sky-300" />
                  <span>Chuva Hoje</span>
                </div>
                <div className="text-sm font-black text-white mt-1">
                  {todayDaily?.precipitationProbabilityMax ?? 0}%
                  {todayDaily && todayDaily.precipitationSum > 0 && (
                    <span className="text-xs font-normal opacity-80 ml-1">
                      ({todayDaily.precipitationSum} mm)
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${theme.subBoxMuted}`}>
                  <Droplets className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Umidade</span>
                </div>
                <div className="text-sm font-black text-white mt-1">
                  {current.humidity}%
                </div>
              </div>

              <div>
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${theme.subBoxMuted}`}>
                  <Wind className="w-3.5 h-3.5 text-teal-300" />
                  <span>Vento</span>
                </div>
                <div className="text-sm font-black text-white mt-1 truncate">
                  {current.windSpeed} km/h{' '}
                  <span className="text-xs font-normal opacity-80">({windDir})</span>
                </div>
              </div>

              <div>
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${theme.subBoxMuted}`}>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span>Índice UV</span>
                </div>
                <div className="text-sm font-black text-white mt-1 flex items-center gap-1.5">
                  <span>{current.uvIndex}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-white/20 text-white border border-white/20">
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
                  className={`p-3 rounded-2xl flex items-start gap-3 text-xs leading-relaxed backdrop-blur-md ${
                    alert.type === 'warning'
                      ? 'bg-amber-500/20 border border-amber-300/40 text-amber-100'
                      : 'bg-rose-950/35 border border-rose-200/35 text-rose-50'
                  }`}
                >
                  <AlertTriangle
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      alert.type === 'warning' ? 'text-amber-300' : 'text-rose-200'
                    }`}
                  />
                  <div>
                    <strong className="font-bold text-white">{alert.title}: </strong>
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

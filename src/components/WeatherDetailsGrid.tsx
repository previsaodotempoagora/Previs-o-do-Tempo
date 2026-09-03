import React from 'react';
import {
  Sun,
  Droplets,
  Wind,
  Sunrise,
  Sunset,
  Gauge,
  Cloud,
  Compass,
  Sparkles
} from 'lucide-react';
import { CurrentWeather, DailyForecastItem } from '../types';
import { getUVLevel, getWindDirectionLabel } from '../services/weatherApi';

interface WeatherDetailsGridProps {
  current: CurrentWeather;
  todayDaily?: DailyForecastItem;
}

export const WeatherDetailsGrid: React.FC<WeatherDetailsGridProps> = ({
  current,
  todayDaily
}) => {
  const uvInfo = getUVLevel(current.uvIndex);
  const windDir = getWindDirectionLabel(current.windDirection);

  // Calculate humidity status
  let humidityStatus = 'Normal';
  let humidityColor = 'text-sky-600 bg-sky-50 dark:bg-sky-950/60 dark:text-sky-300';
  if (current.humidity < 30) {
    humidityStatus = 'Muito Seco (Alerta)';
    humidityColor = 'text-amber-700 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300';
  } else if (current.humidity < 45) {
    humidityStatus = 'Seco';
    humidityColor = 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300';
  } else if (current.humidity > 80) {
    humidityStatus = 'Muito Úmido';
    humidityColor = 'text-blue-700 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300';
  } else {
    humidityStatus = 'Confortável';
    humidityColor = 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300';
  }

  // Calculate pressure status
  let pressureStatus = 'Normal';
  if (current.pressure > 1018) pressureStatus = 'Alta Pressão (Tempo Firme)';
  else if (current.pressure < 1008) pressureStatus = 'Baixa Pressão (Instabilidade)';

  return (
    <div className="space-y-3" id="weather-details-section">
      <div className="flex items-center gap-2 px-1">
        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
          Informações Detalhadas de Hoje
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {/* UV Index Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-5 flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Índice Ultravioleta</span>
            </div>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${uvInfo.color} bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700`}
            >
              {uvInfo.level}
            </span>
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                {current.uvIndex}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                máx {todayDaily?.uvIndexMax ?? current.uvIndex} hoje
              </span>
            </div>

            {/* Visual UV scale bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 mt-2 overflow-hidden flex">
              <div className="h-full bg-emerald-500 w-[27%]" />
              <div className="h-full bg-amber-500 w-[27%]" />
              <div className="h-full bg-orange-500 w-[18%]" />
              <div className="h-full bg-rose-500 w-[18%]" />
              <div className="h-full bg-purple-600 w-[10%]" />
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-750">
            {uvInfo.advice}
          </p>
        </div>

        {/* Humidity Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-5 flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>Umidade do Ar</span>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${humidityColor}`}>
              {humidityStatus}
            </span>
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                {current.humidity}
              </span>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">%</span>
            </div>

            {/* Visual Humidity bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all"
                style={{ width: `${Math.min(100, current.humidity)}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-750">
            {current.humidity < 40
              ? 'Ambiente seco. Mantenha garrafa de água por perto e umidifique o quarto.'
              : current.humidity > 70
              ? 'Ar úmido. Maior sensação de abafamento em dias quentes.'
              : 'Nível ideal para saúde respiratória e bem-estar.'}
          </p>
        </div>

        {/* Wind & Gusts Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-5 flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              <Wind className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Vento e Rajadas</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Direção {windDir} ({current.windDirection}°)
            </span>
          </div>

          <div className="my-3 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  {current.windSpeed}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">km/h</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Rajadas de até{' '}
                <strong className="text-slate-700 dark:text-slate-200">
                  {current.windGusts} km/h
                </strong>
              </span>
            </div>

            <div className="p-2.5 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-100 dark:border-teal-900">
              <Compass className="w-7 h-7 animate-pulse" />
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-750">
            {current.windSpeed < 15
              ? 'Brisa leve. Condições favoráveis para atividades ao ar livre.'
              : current.windSpeed < 30
              ? 'Vento moderado. Sensação térmica mais amena em locais abertos.'
              : 'Vento forte. Atenção com objetos soltos e galhos.'}
          </p>
        </div>

        {/* Sunrise & Sunset */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-5 flex flex-col justify-between transition-colors">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <Sunrise className="w-4 h-4 text-amber-500" />
            <span>Ciclo Solar</span>
          </div>

          <div className="my-3 grid grid-cols-2 gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/60">
              <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 font-bold">
                <Sunrise className="w-3.5 h-3.5" />
                <span>Nascer do Sol</span>
              </div>
              <span className="text-lg font-black text-slate-800 dark:text-slate-100 block mt-1">
                {todayDaily?.sunrise || '06:00'}
              </span>
            </div>

            <div className="p-2.5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/60">
              <div className="flex items-center gap-1.5 text-xs text-rose-700 dark:text-rose-400 font-bold">
                <Sunset className="w-3.5 h-3.5" />
                <span>Pôr do Sol</span>
              </div>
              <span className="text-lg font-black text-slate-800 dark:text-slate-100 block mt-1">
                {todayDaily?.sunset || '18:15'}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-750">
            Aproveite a luz natural do dia para recarregar sua vitamina D.
          </p>
        </div>

        {/* Atmospheric Pressure */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-5 flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              <Gauge className="w-4 h-4 text-indigo-500" />
              <span>Pressão Barométrica</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {pressureStatus}
            </span>
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                {current.pressure}
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">hPa</span>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">
              Padrão ao nível do mar: ~1013 hPa
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-750">
            {current.pressure < 1010
              ? 'Pressão em queda. Favorece formação de nuvens e precipitação.'
              : 'Pressão alta estável. Mantém o céu mais limpo e tempo firme.'}
          </p>
        </div>

        {/* Cloud Cover */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-5 flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              <Cloud className="w-4 h-4 text-blue-500" />
              <span>Cobertura de Nuvens</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              {current.cloudCover <= 20
                ? 'Céu Claro'
                : current.cloudCover <= 60
                ? 'Parcial'
                : 'Encoberto'}
            </span>
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                {current.cloudCover}
              </span>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">%</span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-300 to-slate-500 rounded-full transition-all"
                style={{ width: `${current.cloudCover}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-750">
            {current.cloudCover < 30
              ? 'Céu aberto com ampla incidência de sol durante o período.'
              : current.cloudCover < 70
              ? 'Nuvens esparsas alternando com aberturas ensolaradas.'
              : 'Céu predominantemente nublado com baixa radiação direta.'}
          </p>
        </div>
      </div>
    </div>
  );
};

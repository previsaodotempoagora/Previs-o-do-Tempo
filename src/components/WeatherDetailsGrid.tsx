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
        <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
        <h3 className="font-black text-sm sm:text-base text-stone-900 dark:text-white tracking-tight">
          Informações Detalhadas de Hoje
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {/* UV Index Card */}
        <div className="bg-white dark:bg-plum-900 rounded-3xl border border-stone-200/90 dark:border-plum-800 shadow-sm p-4 sm:p-5 flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs font-bold uppercase tracking-wider">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Índice Ultravioleta</span>
            </div>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${uvInfo.color} bg-stone-50 dark:bg-plum-850 border border-stone-200 dark:border-plum-800`}
            >
              {uvInfo.level}
            </span>
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tabular-nums">
                {current.uvIndex}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium tabular-nums">
                máx {todayDaily?.uvIndexMax ?? current.uvIndex} hoje
              </span>
            </div>

            {/* Visual UV scale bar */}
            <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-plum-850 mt-2 overflow-hidden flex">
              <div className="h-full bg-emerald-500 w-[27%]" />
              <div className="h-full bg-amber-500 w-[27%]" />
              <div className="h-full bg-orange-500 w-[18%]" />
              <div className="h-full bg-rose-500 w-[18%]" />
              <div className="h-full bg-purple-600 w-[10%]" />
            </div>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-medium bg-stone-50 dark:bg-plum-850 p-2.5 rounded-xl border border-stone-100 dark:border-plum-800">
            {uvInfo.advice}
          </p>
        </div>

        {/* Humidity Card */}
        <div className="bg-white dark:bg-plum-900 rounded-3xl border border-stone-200/90 dark:border-plum-800 shadow-sm p-4 sm:p-5 flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs font-bold uppercase tracking-wider">
              <Droplets className="w-4 h-4 text-brand-500" />
              <span>Umidade do Ar</span>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${humidityColor}`}>
              {humidityStatus}
            </span>
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tabular-nums">
                {current.humidity}
              </span>
              <span className="text-xl font-bold text-brand-600 dark:text-brand-400">%</span>
            </div>

            {/* Visual Humidity bar */}
            <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-plum-850 mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-300 to-brand-600 rounded-full transition-all"
                style={{ width: `${Math.min(100, current.humidity)}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-medium bg-stone-50 dark:bg-plum-850 p-2.5 rounded-xl border border-stone-100 dark:border-plum-800">
            {current.humidity < 40
              ? 'Ambiente seco. Mantenha garrafa de água por perto e umidifique o quarto.'
              : current.humidity > 70
              ? 'Ar úmido. Maior sensação de abafamento em dias quentes.'
              : 'Nível ideal para saúde respiratória e bem-estar.'}
          </p>
        </div>

        {/* Wind & Gusts Card */}
        <div className="bg-white dark:bg-plum-900 rounded-3xl border border-stone-200/90 dark:border-plum-800 shadow-sm p-4 sm:p-5 flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs font-bold uppercase tracking-wider">
              <Wind className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Vento e Rajadas</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-plum-850 text-stone-700 dark:text-stone-300">
              Direção {windDir} ({current.windDirection}°)
            </span>
          </div>

          <div className="my-3 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tabular-nums">
                  {current.windSpeed}
                </span>
                <span className="text-xs font-bold text-stone-500 dark:text-stone-400">km/h</span>
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium tabular-nums">
                Rajadas de até{' '}
                <strong className="text-stone-700 dark:text-stone-200">
                  {current.windGusts} km/h
                </strong>
              </span>
            </div>

            <div className="p-2.5 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-brand-900/50">
              <Compass className="w-7 h-7" />
            </div>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-medium bg-stone-50 dark:bg-plum-850 p-2.5 rounded-xl border border-stone-100 dark:border-plum-800">
            {current.windSpeed < 15
              ? 'Brisa leve. Condições favoráveis para atividades ao ar livre.'
              : current.windSpeed < 30
              ? 'Vento moderado. Sensação térmica mais amena em locais abertos.'
              : 'Vento forte. Atenção com objetos soltos e galhos.'}
          </p>
        </div>

        {/* Sunrise & Sunset */}
        <div className="bg-white dark:bg-plum-900 rounded-3xl border border-stone-200/90 dark:border-plum-800 shadow-sm p-4 sm:p-5 flex flex-col justify-between transition-colors">
          <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs font-bold uppercase tracking-wider">
            <Sunrise className="w-4 h-4 text-amber-500" />
            <span>Ciclo Solar</span>
          </div>

          <div className="my-3 grid grid-cols-2 gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/60">
              <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 font-bold">
                <Sunrise className="w-3.5 h-3.5" />
                <span>Nascer do Sol</span>
              </div>
              <span className="text-lg font-black text-stone-800 dark:text-stone-100 block mt-1 tabular-nums">
                {todayDaily?.sunrise || '06:00'}
              </span>
            </div>

            <div className="p-2.5 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-100 dark:border-brand-900/60">
              <div className="flex items-center gap-1.5 text-xs text-brand-700 dark:text-brand-300 font-bold">
                <Sunset className="w-3.5 h-3.5" />
                <span>Pôr do Sol</span>
              </div>
              <span className="text-lg font-black text-stone-800 dark:text-stone-100 block mt-1 tabular-nums">
                {todayDaily?.sunset || '18:15'}
              </span>
            </div>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-medium bg-stone-50 dark:bg-plum-850 p-2.5 rounded-xl border border-stone-100 dark:border-plum-800">
            Aproveite a luz natural do dia para recarregar sua vitamina D.
          </p>
        </div>

        {/* Atmospheric Pressure */}
        <div className="bg-white dark:bg-plum-900 rounded-3xl border border-stone-200/90 dark:border-plum-800 shadow-sm p-4 sm:p-5 flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs font-bold uppercase tracking-wider">
              <Gauge className="w-4 h-4 text-purple-500" />
              <span>Pressão Barométrica</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-plum-850 text-stone-700 dark:text-stone-300">
              {pressureStatus}
            </span>
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tabular-nums">
                {current.pressure}
              </span>
              <span className="text-xs font-bold text-stone-500 dark:text-stone-400">hPa</span>
            </div>
            <span className="text-xs text-stone-400 dark:text-stone-500 mt-1 block">
              Padrão ao nível do mar: ~1013 hPa
            </span>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-medium bg-stone-50 dark:bg-plum-850 p-2.5 rounded-xl border border-stone-100 dark:border-plum-800">
            {current.pressure < 1010
              ? 'Pressão em queda. Favorece formação de nuvens e precipitação.'
              : 'Pressão alta estável. Mantém o céu mais limpo e tempo firme.'}
          </p>
        </div>

        {/* Cloud Cover */}
        <div className="bg-white dark:bg-plum-900 rounded-3xl border border-stone-200/90 dark:border-plum-800 shadow-sm p-4 sm:p-5 flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs font-bold uppercase tracking-wider">
              <Cloud className="w-4 h-4 text-brand-500" />
              <span>Cobertura de Nuvens</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
              {current.cloudCover <= 20
                ? 'Céu Claro'
                : current.cloudCover <= 60
                ? 'Parcial'
                : 'Encoberto'}
            </span>
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tabular-nums">
                {current.cloudCover}
              </span>
              <span className="text-xl font-bold text-brand-600 dark:text-brand-400">%</span>
            </div>

            <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-plum-850 mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-300 to-stone-500 rounded-full transition-all"
                style={{ width: `${current.cloudCover}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-medium bg-stone-50 dark:bg-plum-850 p-2.5 rounded-xl border border-stone-100 dark:border-plum-800">
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

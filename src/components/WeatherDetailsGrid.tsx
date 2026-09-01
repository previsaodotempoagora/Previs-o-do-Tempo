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
  ShieldAlert,
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
  let humidityColor = 'text-sky-600 bg-sky-50';
  if (current.humidity < 30) {
    humidityStatus = 'Muito Seco (Alerta)';
    humidityColor = 'text-amber-700 bg-amber-50';
  } else if (current.humidity < 45) {
    humidityStatus = 'Seco';
    humidityColor = 'text-amber-600 bg-amber-50';
  } else if (current.humidity > 80) {
    humidityStatus = 'Muito Úmido';
    humidityColor = 'text-blue-700 bg-blue-50';
  } else {
    humidityStatus = 'Confortável';
    humidityColor = 'text-emerald-700 bg-emerald-50';
  }

  // Calculate pressure status
  let pressureStatus = 'Normal';
  if (current.pressure > 1018) pressureStatus = 'Alta Pressão (Tempo Firme)';
  else if (current.pressure < 1008) pressureStatus = 'Baixa Pressão (Instabilidade)';

  return (
    <div className="space-y-3" id="weather-details-section">
      <div className="flex items-center gap-2 px-1">
        <Sparkles className="w-4 h-4 text-blue-600" />
        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
          Informações Detalhadas de Hoje
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {/* UV Index Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Índice Ultravioleta</span>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${uvInfo.color} bg-slate-50 border border-slate-200`}>
              {uvInfo.level}
            </span>
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                {current.uvIndex}
              </span>
              <span className="text-xs text-slate-500 font-medium">máx {todayDaily?.uvIndexMax ?? current.uvIndex} hoje</span>
            </div>

            {/* Visual UV scale bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 mt-2 overflow-hidden flex">
              <div className="h-full bg-emerald-500 w-[27%]" />
              <div className="h-full bg-amber-500 w-[27%]" />
              <div className="h-full bg-orange-500 w-[18%]" />
              <div className="h-full bg-rose-500 w-[18%]" />
              <div className="h-full bg-purple-600 w-[10%]" />
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            {uvInfo.advice}
          </p>
        </div>

        {/* Humidity Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>Umidade do Ar</span>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${humidityColor}`}>
              {humidityStatus}
            </span>
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                {current.humidity}
              </span>
              <span className="text-xl font-bold text-blue-600">%</span>
            </div>

            {/* Visual Humidity bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all"
                style={{ width: `${Math.min(100, current.humidity)}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            {current.humidity < 40
              ? 'Ambiente seco. Mantenha garrafa de água por perto e umidifique o quarto.'
              : current.humidity > 70
              ? 'Ar úmido. Maior sensação de abafamento em dias quentes.'
              : 'Nível ideal para saúde respiratória e bem-estar.'}
          </p>
        </div>

        {/* Wind & Gusts Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <Wind className="w-4 h-4 text-teal-600" />
              <span>Vento e Rajadas</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              Direção {windDir} ({current.windDirection}°)
            </span>
          </div>

          <div className="my-3 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">
                  {current.windSpeed}
                </span>
                <span className="text-xs font-bold text-slate-500">km/h</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Rajadas de até <strong className="text-slate-700">{current.windGusts} km/h</strong>
              </span>
            </div>

            <div className="p-2.5 rounded-2xl bg-teal-50 text-teal-700 border border-teal-100">
              <Compass className="w-7 h-7 animate-pulse" />
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            {current.windSpeed < 10
              ? 'Vento calmo ou brisa muito leve.'
              : current.windSpeed < 25
              ? 'Vento moderado agradável.'
              : 'Vento forte. Atenção para objetos soltos em áreas abertas.'}
          </p>
        </div>

        {/* Sunrise & Sunset Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Sol e Claridade</span>
          </div>

          <div className="grid grid-cols-2 gap-3 my-3">
            <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-amber-50 border border-amber-100">
              <Sunrise className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-700 block">Nascer</span>
                <span className="text-sm sm:text-base font-black text-slate-900">
                  {todayDaily?.sunrise ?? '--:--'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-orange-50 border border-orange-100">
              <Sunset className="w-5 h-5 text-orange-600 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-orange-700 block">Pôr do Sol</span>
                <span className="text-sm sm:text-base font-black text-slate-900">
                  {todayDaily?.sunset ?? '--:--'}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            Horário local estimado para o fuso horário da cidade.
          </p>
        </div>

        {/* Pressure Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <Gauge className="w-4 h-4 text-indigo-500" />
              <span>Pressão Atmosférica</span>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              hPa
            </span>
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                {current.pressure}
              </span>
              <span className="text-xs font-bold text-slate-500">hPa</span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {pressureStatus}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            A pressão indica estabilidade. Quedas bruscas costumam anteceder frentes frias ou chuvas.
          </p>
        </div>

        {/* Cloud Cover Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <Cloud className="w-4 h-4 text-slate-500" />
              <span>Cobertura de Nuvens</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {current.cloudCover}%
            </span>
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                {current.cloudCover}
              </span>
              <span className="text-xl font-bold text-slate-500">%</span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-100 mt-2 overflow-hidden">
              <div
                className="h-full bg-slate-400 rounded-full transition-all"
                style={{ width: `${Math.min(100, current.cloudCover)}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            {current.cloudCover < 20
              ? 'Céu quase sem nuvens com sol direto.'
              : current.cloudCover < 70
              ? 'Parcialmente encoberto com períodos de sol.'
              : 'Céu predominantemente encoberto.'}
          </p>
        </div>
      </div>
    </div>
  );
};

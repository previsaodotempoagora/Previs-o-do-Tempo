import {
  CurrentWeather,
  DailyForecastItem,
  FullWeatherData,
  HourlyForecastItem,
  LocationData,
  UVLevelInfo,
  WeatherConditionInfo
} from '../types';
import { ALL_PRESET_CITIES, BRAZIL_CAPITALS, normalizeCityName } from '../data/brazilCities';

// WMO Weather Interpretation Codes (WW) mapping
export function getWeatherCondition(code: number, isDay: boolean = true): WeatherConditionInfo {
  switch (code) {
    case 0:
      return {
        code,
        label: isDay ? 'Céu Limpo' : 'Noite Limpa',
        icon: isDay ? 'Sun' : 'Moon',
        color: isDay ? 'text-amber-500' : 'text-indigo-400',
        bgGradient: isDay
          ? 'from-sky-500/10 via-amber-500/5 to-transparent'
          : 'from-indigo-950/20 via-slate-900/10 to-transparent',
        badgeBg: isDay ? 'bg-amber-500/10' : 'bg-indigo-500/10',
        badgeText: isDay ? 'text-amber-700' : 'text-indigo-700'
      };
    case 1:
      return {
        code,
        label: 'Predominantemente Ensolarado',
        icon: isDay ? 'Sun' : 'Moon',
        color: isDay ? 'text-amber-500' : 'text-indigo-400',
        bgGradient: 'from-amber-500/10 via-sky-500/5 to-transparent',
        badgeBg: 'bg-amber-500/10',
        badgeText: 'text-amber-700'
      };
    case 2:
      return {
        code,
        label: 'Parcialmente Nublado',
        icon: isDay ? 'CloudSun' : 'CloudMoon',
        color: 'text-sky-600',
        bgGradient: 'from-sky-500/10 via-slate-500/5 to-transparent',
        badgeBg: 'bg-sky-500/10',
        badgeText: 'text-sky-700'
      };
    case 3:
      return {
        code,
        label: 'Nublado / Encoberto',
        icon: 'Cloud',
        color: 'text-slate-500',
        bgGradient: 'from-slate-500/10 via-zinc-500/5 to-transparent',
        badgeBg: 'bg-slate-500/10',
        badgeText: 'text-slate-700'
      };
    case 45:
    case 48:
      return {
        code,
        label: 'Nevoeiro / Neblina',
        icon: 'CloudFog',
        color: 'text-slate-400',
        bgGradient: 'from-slate-400/10 via-zinc-400/5 to-transparent',
        badgeBg: 'bg-slate-500/10',
        badgeText: 'text-slate-700'
      };
    case 51:
    case 53:
    case 55:
      return {
        code,
        label: 'Garoa / Chuvisco',
        icon: 'CloudDrizzle',
        color: 'text-cyan-500',
        bgGradient: 'from-cyan-500/10 via-sky-500/5 to-transparent',
        badgeBg: 'bg-cyan-500/10',
        badgeText: 'text-cyan-700'
      };
    case 56:
    case 57:
      return {
        code,
        label: 'Garoa Congelante',
        icon: 'CloudSnow',
        color: 'text-cyan-600',
        bgGradient: 'from-cyan-600/10 to-transparent',
        badgeBg: 'bg-cyan-500/10',
        badgeText: 'text-cyan-700'
      };
    case 61:
      return {
        code,
        label: 'Chuva Fraca',
        icon: 'CloudRain',
        color: 'text-blue-500',
        bgGradient: 'from-blue-500/10 via-sky-500/5 to-transparent',
        badgeBg: 'bg-blue-500/10',
        badgeText: 'text-blue-700'
      };
    case 63:
      return {
        code,
        label: 'Chuva Moderada',
        icon: 'CloudRain',
        color: 'text-blue-600',
        bgGradient: 'from-blue-600/15 via-sky-600/5 to-transparent',
        badgeBg: 'bg-blue-600/10',
        badgeText: 'text-blue-700'
      };
    case 65:
      return {
        code,
        label: 'Chuva Forte',
        icon: 'CloudRain',
        color: 'text-blue-700',
        bgGradient: 'from-blue-700/15 via-indigo-600/10 to-transparent',
        badgeBg: 'bg-blue-700/10',
        badgeText: 'text-blue-800'
      };
    case 66:
    case 67:
      return {
        code,
        label: 'Chuva Gelada',
        icon: 'CloudHail',
        color: 'text-sky-700',
        bgGradient: 'from-sky-700/15 to-transparent',
        badgeBg: 'bg-sky-600/10',
        badgeText: 'text-sky-800'
      };
    case 71:
    case 73:
    case 75:
    case 77:
      return {
        code,
        label: 'Possibilidade de Neve / Geada',
        icon: 'Snowflake',
        color: 'text-indigo-400',
        bgGradient: 'from-indigo-400/15 to-transparent',
        badgeBg: 'bg-indigo-500/10',
        badgeText: 'text-indigo-700'
      };
    case 80:
      return {
        code,
        label: 'Pancadas de Chuva Leves',
        icon: 'CloudDrizzle',
        color: 'text-sky-600',
        bgGradient: 'from-sky-500/10 via-blue-500/5 to-transparent',
        badgeBg: 'bg-sky-500/10',
        badgeText: 'text-sky-700'
      };
    case 81:
      return {
        code,
        label: 'Pancadas de Chuva',
        icon: 'CloudRain',
        color: 'text-blue-600',
        bgGradient: 'from-blue-600/15 via-cyan-600/5 to-transparent',
        badgeBg: 'bg-blue-600/10',
        badgeText: 'text-blue-700'
      };
    case 82:
      return {
        code,
        label: 'Tempestade de Chuva Violenta',
        icon: 'CloudLightning',
        color: 'text-indigo-700',
        bgGradient: 'from-indigo-700/20 via-purple-700/10 to-transparent',
        badgeBg: 'bg-indigo-600/10',
        badgeText: 'text-indigo-800'
      };
    case 95:
      return {
        code,
        label: 'Tempestade com Raios',
        icon: 'CloudLightning',
        color: 'text-amber-600',
        bgGradient: 'from-amber-600/15 via-purple-900/10 to-transparent',
        badgeBg: 'bg-amber-500/10',
        badgeText: 'text-amber-800'
      };
    case 96:
    case 99:
      return {
        code,
        label: 'Tempestade com Granizo',
        icon: 'CloudHail',
        color: 'text-purple-600',
        bgGradient: 'from-purple-600/20 via-slate-800/10 to-transparent',
        badgeBg: 'bg-purple-500/10',
        badgeText: 'text-purple-800'
      };
    default:
      return {
        code,
        label: 'Tempo Estável',
        icon: isDay ? 'Sun' : 'Moon',
        color: isDay ? 'text-amber-500' : 'text-indigo-400',
        bgGradient: 'from-sky-500/10 to-transparent',
        badgeBg: 'bg-sky-500/10',
        badgeText: 'text-sky-700'
      };
  }
}

export function getUVLevel(uv: number): UVLevelInfo {
  if (uv < 3) {
    return {
      level: 'Baixo',
      color: 'text-emerald-600',
      description: 'Pouco risco para a maioria das pessoas.',
      advice: 'Pode desfrutar com segurança ao ar livre.'
    };
  } else if (uv < 6) {
    return {
      level: 'Moderado',
      color: 'text-amber-600',
      description: 'Risco moderado de exposição desprotegida.',
      advice: 'Recomendado usar protetor solar e óculos.'
    };
  } else if (uv < 8) {
    return {
      level: 'Alto',
      color: 'text-orange-600',
      description: 'Risco alto de queimaduras solares.',
      advice: 'Use protetor FPS 30+, chapéu e procure sombra.'
    };
  } else if (uv < 11) {
    return {
      level: 'Muito Alto',
      color: 'text-rose-600',
      description: 'Risco muito alto de danos à pele.',
      advice: 'Evite o sol entre 10h e 16h. Proteção máxima.'
    };
  } else {
    return {
      level: 'Extremo',
      color: 'text-purple-600',
      description: 'Risco extremo. Queimaduras em minutos.',
      advice: 'Permaneça em ambientes fechados ao meio-dia.'
    };
  }
}

export function getWindDirectionLabel(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'L', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
  const index = Math.round((degrees % 360) / 22.5) % 16;
  return directions[index];
}

const cache = new Map<string, { data: FullWeatherData; timestamp: number }>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export async function fetchWeatherData(location: LocationData): Promise<FullWeatherData> {
  const cacheKey = `${location.lat.toFixed(4)},${location.lon.toFixed(4)}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&forecast_days=16&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Falha ao obter dados meteorológicos em tempo real.');
  }

  const raw = await response.json();

  const current: CurrentWeather = {
    temp: Math.round(raw.current?.temperature_2m ?? 0),
    feelsLike: Math.round(raw.current?.apparent_temperature ?? raw.current?.temperature_2m ?? 0),
    humidity: Math.round(raw.current?.relative_humidity_2m ?? 0),
    precipitation: raw.current?.precipitation ?? 0,
    rain: raw.current?.rain ?? 0,
    weatherCode: raw.current?.weather_code ?? 0,
    cloudCover: raw.current?.cloud_cover ?? 0,
    pressure: Math.round(raw.current?.pressure_msl ?? 1013),
    windSpeed: Math.round(raw.current?.wind_speed_10m ?? 0),
    windDirection: Math.round(raw.current?.wind_direction_10m ?? 0),
    windGusts: Math.round(raw.current?.wind_gusts_10m ?? 0),
    uvIndex: Math.round((raw.current?.uv_index ?? 0) * 10) / 10,
    isDay: raw.current?.is_day === 1,
    condition: getWeatherCondition(raw.current?.weather_code ?? 0, raw.current?.is_day === 1),
    time: raw.current?.time ?? new Date().toISOString()
  };

  // Process hourly (next 24-36 hours starting from current hour)
  const currentIsoHour = raw.current?.time ? raw.current.time.slice(0, 13) : new Date().toISOString().slice(0, 13);
  let startIndex = 0;
  if (raw.hourly?.time) {
    const found = raw.hourly.time.findIndex((t: string) => t.startsWith(currentIsoHour));
    if (found >= 0) {
      startIndex = found;
    }
  }

  const hourly: HourlyForecastItem[] = [];
  const hourlyCount = Math.min(24, (raw.hourly?.time?.length ?? 0) - startIndex);

  for (let i = 0; i < hourlyCount; i++) {
    const idx = startIndex + i;
    const timeStr = raw.hourly.time[idx];
    const isDay = raw.hourly.is_day ? raw.hourly.is_day[idx] === 1 : true;
    const weatherCode = raw.hourly.weather_code[idx] ?? 0;

    const dateObj = new Date(timeStr);
    const hourFormatted = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    hourly.push({
      time: timeStr,
      hour: i === 0 ? 'Agora' : hourFormatted,
      temp: Math.round(raw.hourly.temperature_2m[idx] ?? 0),
      feelsLike: Math.round(raw.hourly.apparent_temperature[idx] ?? 0),
      rainProb: Math.round(raw.hourly.precipitation_probability[idx] ?? 0),
      precipitation: Math.round((raw.hourly.precipitation[idx] ?? 0) * 10) / 10,
      weatherCode,
      windSpeed: Math.round(raw.hourly.wind_speed_10m[idx] ?? 0),
      uvIndex: Math.round((raw.hourly.uv_index[idx] ?? 0) * 10) / 10,
      isDay,
      condition: getWeatherCondition(weatherCode, isDay)
    });
  }

  // Process daily (up to 16 days)
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const daily: DailyForecastItem[] = [];
  const dailyLen = raw.daily?.time?.length ?? 0;

  for (let i = 0; i < dailyLen; i++) {
    const dateStr = raw.daily.time[i]; // "YYYY-MM-DD"
    const parts = dateStr.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const dateObj = new Date(year, month, day);

    let dayLabel = daysOfWeek[dateObj.getDay()];
    if (i === 0) dayLabel = 'Hoje';
    else if (i === 1) dayLabel = 'Amanhã';

    const formattedDate = `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}`;
    const weatherCode = raw.daily.weather_code[i] ?? 0;

    const sunriseStr = raw.daily.sunrise[i] ? new Date(raw.daily.sunrise[i]).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '--:--';
    const sunsetStr = raw.daily.sunset[i] ? new Date(raw.daily.sunset[i]).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '--:--';

    daily.push({
      date: dateStr,
      dayOfWeek: dayLabel,
      formattedDate,
      weatherCode,
      condition: getWeatherCondition(weatherCode, true),
      tempMax: Math.round(raw.daily.temperature_2m_max[i] ?? 0),
      tempMin: Math.round(raw.daily.temperature_2m_min[i] ?? 0),
      apparentTempMax: Math.round(raw.daily.apparent_temperature_max[i] ?? 0),
      apparentTempMin: Math.round(raw.daily.apparent_temperature_min[i] ?? 0),
      precipitationSum: Math.round((raw.daily.precipitation_sum[i] ?? 0) * 10) / 10,
      precipitationProbabilityMax: Math.round(raw.daily.precipitation_probability_max[i] ?? 0),
      windSpeedMax: Math.round(raw.daily.wind_speed_10m_max[i] ?? 0),
      uvIndexMax: Math.round((raw.daily.uv_index_max[i] ?? 0) * 10) / 10,
      sunrise: sunriseStr,
      sunset: sunsetStr
    });
  }

  const result: FullWeatherData = {
    location,
    current,
    hourly,
    daily,
    updatedAt: new Date()
  };

  cache.set(cacheKey, { data: result, timestamp: Date.now() });
  return result;
}

// Search Brazilian cities via Open-Meteo Geocoding + Preset fallback
export async function searchCities(query: string): Promise<LocationData[]> {
  const clean = normalizeCityName(query);
  if (!clean || clean.length < 2) {
    return BRAZIL_CAPITALS.slice(0, 6);
  }

  // First check local database for immediate matching
  const localMatches = ALL_PRESET_CITIES.filter(
    (c) =>
      normalizeCityName(c.name).includes(clean) ||
      normalizeCityName(c.state || '').includes(clean) ||
      c.stateCode?.toLowerCase() === clean
  );

  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query
    )}&count=10&language=pt&format=json&country=BR`;
    const res = await fetch(geoUrl);
    if (res.ok) {
      const data = await res.json();
      if (data.results && Array.isArray(data.results)) {
        const apiResults: LocationData[] = data.results
          .filter((item: any) => item.country === 'Brazil' || item.country_code === 'BR')
          .map((item: any) => {
            const state = item.admin1 || '';
            const stateCode = item.admin1_code || '';
            return {
              id: `${item.id || item.name}-${item.latitude}`,
              name: item.name,
              state: state,
              stateCode: stateCode,
              country: 'Brasil',
              lat: item.latitude,
              lon: item.longitude,
              timezone: item.timezone
            };
          });

        // Merge without duplicates
        const combined = [...localMatches];
        for (const apiItem of apiResults) {
          const alreadyExists = combined.some(
            (c) => Math.abs(c.lat - apiItem.lat) < 0.05 && Math.abs(c.lon - apiItem.lon) < 0.05
          );
          if (!alreadyExists) {
            combined.push(apiItem);
          }
        }
        return combined.slice(0, 10);
      }
    }
  } catch (err) {
    console.warn('Geocoding search network error, using local fallback:', err);
  }

  return localMatches.slice(0, 8);
}

// Reverse Geocoding or fallback for current device GPS location
export async function getCityFromCoordinates(lat: number, lon: number): Promise<LocationData> {
  try {
    const reverseUrl = `https://geocoding-api.open-meteo.com/v1/search?name=&latitude=${lat}&longitude=${lon}&count=1&language=pt&format=json`;
    // Fallback: match closest capital
    let closest = BRAZIL_CAPITALS[0];
    let minDistance = Number.MAX_VALUE;

    for (const city of ALL_PRESET_CITIES) {
      const dist = Math.hypot(city.lat - lat, city.lon - lon);
      if (dist < minDistance) {
        minDistance = dist;
        closest = city;
      }
    }

    if (minDistance < 0.3) {
      return closest;
    }

    return {
      id: `gps-${lat.toFixed(4)}-${lon.toFixed(4)}`,
      name: 'Minha Localização',
      state: closest.state,
      stateCode: closest.stateCode,
      country: 'Brasil',
      lat,
      lon
    };
  } catch {
    return {
      id: `gps-${lat.toFixed(4)}-${lon.toFixed(4)}`,
      name: 'Minha Localização',
      country: 'Brasil',
      lat,
      lon
    };
  }
}

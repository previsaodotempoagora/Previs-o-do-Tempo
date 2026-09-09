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

// Brazilian state name to UF mapping
const BRAZIL_STATE_MAP: Record<string, string> = {
  'acre': 'AC', 'alagoas': 'AL', 'amapá': 'AP', 'amapa': 'AP', 'amazonas': 'AM',
  'bahia': 'BA', 'ceará': 'CE', 'ceara': 'CE', 'distrito federal': 'DF', 'espírito santo': 'ES',
  'espirito santo': 'ES', 'goiás': 'GO', 'goias': 'GO', 'maranhão': 'MA', 'maranhao': 'MA',
  'mato grosso': 'MT', 'mato grosso do sul': 'MS', 'minas gerais': 'MG', 'pará': 'PA',
  'para': 'PA', 'paraíba': 'PB', 'paraiba': 'PB', 'paraná': 'PR', 'parana': 'PR',
  'pernambuco': 'PE', 'piauí': 'PI', 'piaui': 'PI', 'rio de janeiro': 'RJ',
  'rio grande do norte': 'RN', 'rio grande do sul': 'RS', 'rondônia': 'RO', 'rondonia': 'RO',
  'roraima': 'RR', 'santa catarina': 'SC', 'são paulo': 'SP', 'sao paulo': 'SP',
  'sergipe': 'SE', 'tocantins': 'TO'
};

// Generates an emergency seasonal fallback forecast if offline or API is completely unreachable
function generateFallbackWeather(location: LocationData): FullWeatherData {
  const now = new Date();
  const currentHour = now.getHours();
  const baseTemp = Math.round(location.lat < -20 ? 23 : 28);

  const current: CurrentWeather = {
    temp: baseTemp,
    feelsLike: baseTemp + 1,
    humidity: 65,
    precipitation: 0,
    rain: 0,
    weatherCode: 1, // Mainly clear
    cloudCover: 25,
    pressure: 1013,
    windSpeed: 11,
    windDirection: 120,
    windGusts: 18,
    uvIndex: currentHour >= 10 && currentHour <= 15 ? 7.5 : 2.0,
    isDay: currentHour >= 6 && currentHour < 18,
    condition: getWeatherCondition(1, currentHour >= 6 && currentHour < 18),
    time: now.toISOString()
  };

  const hourly: HourlyForecastItem[] = [];
  for (let i = 0; i < 24; i++) {
    const d = new Date(now.getTime() + i * 3600000);
    const hour = d.getHours();
    const isDayTime = hour >= 6 && hour < 18;
    const hourFactor = Math.sin(((hour - 6) / 12) * Math.PI);
    const hTemp = Math.round(baseTemp - 3 + Math.max(0, hourFactor * 6));

    hourly.push({
      time: d.toISOString(),
      hour: `${String(hour).padStart(2, '0')}:00`,
      temp: hTemp,
      feelsLike: hTemp + 1,
      rainProb: 10,
      precipitation: 0,
      weatherCode: 1,
      windSpeed: 10 + (i % 5),
      uvIndex: isDayTime && hour >= 10 && hour <= 15 ? 7 : 1,
      isDay: isDayTime,
      condition: getWeatherCondition(1, isDayTime)
    });
  }

  const daily: DailyForecastItem[] = [];
  for (let i = 0; i < 15; i++) {
    const d = new Date(now.getTime() + i * 86400000);
    const maxTemp = baseTemp + 4 + (i % 3);
    const minTemp = baseTemp - 4 - (i % 2);
    const dateStr = d.toISOString().split('T')[0];

    daily.push({
      date: dateStr,
      dayOfWeek: i === 0 ? 'Hoje' : i === 1 ? 'Amanhã' : d.toLocaleDateString('pt-BR', { weekday: 'short' }),
      formattedDate: d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      weatherCode: 1,
      condition: getWeatherCondition(1, true),
      tempMax: maxTemp,
      tempMin: minTemp,
      apparentTempMax: maxTemp + 1,
      apparentTempMin: minTemp,
      precipitationSum: 0,
      precipitationProbabilityMax: 15,
      windSpeedMax: 18,
      uvIndexMax: 8,
      sunrise: `${dateStr}T06:15:00`,
      sunset: `${dateStr}T18:25:00`
    });
  }

  return {
    location,
    current,
    hourly,
    daily,
    updatedAt: now
  };
}

// Open-Meteo official calculation and state cache
const cache = new Map<string, { data: FullWeatherData; timestamp: number }>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export async function fetchWeatherData(location: LocationData): Promise<FullWeatherData> {
  // Validate and sanitize coordinates
  const safeLat =
    location && typeof location.lat === 'number' && !isNaN(location.lat)
      ? Number(location.lat.toFixed(4))
      : -23.5505; // São Paulo fallback
  const safeLon =
    location && typeof location.lon === 'number' && !isNaN(location.lon)
      ? Number(location.lon.toFixed(4))
      : -46.6333; // São Paulo fallback

  const safeLocation: LocationData = {
    ...location,
    lat: safeLat,
    lon: safeLon,
    name: location?.name || 'São Paulo',
    stateCode: location?.stateCode || 'SP',
    country: location?.country || 'Brasil'
  };

  const cacheKey = `${safeLat.toFixed(4)},${safeLon.toFixed(4)}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  // Check persistent localStorage cache for instant fast loading or offline resilience
  let storedFallback: FullWeatherData | null = null;
  try {
    const rawStored = localStorage.getItem(`previsao_data_${cacheKey}`);
    if (rawStored) {
      storedFallback = JSON.parse(rawStored);
    }
  } catch {
    // ignore
  }

  // Primary Open-Meteo URL
  const primaryUrl = `https://api.open-meteo.com/v1/forecast?latitude=${safeLat}&longitude=${safeLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&forecast_days=16&timezone=auto`;

  let raw: any = null;

  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 9000) : null;

    const response = await fetch(primaryUrl, { signal: controller?.signal });
    if (timeoutId) clearTimeout(timeoutId);

    if (response.ok) {
      raw = await response.json();
    } else {
      console.warn(`Open-Meteo primary returned ${response.status}, attempting fallback timezone...`);
    }
  } catch (fetchErr) {
    console.warn('Primary weather fetch error:', fetchErr);
  }

  // Secondary retry without timezone=auto in case timezone resolution failed
  if (!raw) {
    try {
      const fallbackUrl = `https://api.open-meteo.com/v1/forecast?latitude=${safeLat}&longitude=${safeLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&forecast_days=16`;
      const resFallback = await fetch(fallbackUrl);
      if (resFallback.ok) {
        raw = await resFallback.json();
      }
    } catch {
      // ignore
    }
  }

  // If network or API failed, recover from local persistent cache if available
  if (!raw && storedFallback) {
    console.info('Using locally cached weather data for location:', safeLocation.name);
    cache.set(cacheKey, { data: storedFallback, timestamp: Date.now() });
    return storedFallback;
  }

  // If network failed and no cache is present, provide resilient fallback data instead of throwing fatal UI error
  if (!raw || !raw.current || !raw.hourly || !raw.daily) {
    if (storedFallback) return storedFallback;
    console.warn('Weather network unavailable, generating resilient seasonal forecast for:', safeLocation.name);
    const fallbackDataset = generateFallbackWeather(safeLocation);
    cache.set(cacheKey, { data: fallbackDataset, timestamp: Date.now() });
    return fallbackDataset;
  }

  const temp = Math.round(raw.current?.temperature_2m ?? 23);
  const humidity = Math.round(raw.current?.relative_humidity_2m ?? 65);
  const windSpeed = Math.round(raw.current?.wind_speed_10m ?? 12);
  const uvIndex = Math.round((raw.current?.uv_index ?? 5) * 10) / 10;
  const isDay = raw.current?.is_day === 1;

  // Open-Meteo official apparent temperature (Sensação Térmica)
  const feelsLike = Math.round(
    raw.current?.apparent_temperature ?? raw.current?.temperature_2m ?? temp
  );

  const current: CurrentWeather = {
    temp,
    feelsLike,
    humidity,
    precipitation: raw.current?.precipitation ?? 0,
    rain: raw.current?.rain ?? 0,
    weatherCode: raw.current?.weather_code ?? 0,
    cloudCover: raw.current?.cloud_cover ?? 0,
    pressure: Math.round(raw.current?.pressure_msl ?? 1013),
    windSpeed,
    windDirection: Math.round(raw.current?.wind_direction_10m ?? 0),
    windGusts: Math.round(raw.current?.wind_gusts_10m ?? 0),
    uvIndex,
    isDay,
    condition: getWeatherCondition(raw.current?.weather_code ?? 0, isDay),
    time: raw.current?.time ?? new Date().toISOString()
  };

  // Process hourly (next 24 hours starting from current hour)
  const currentIsoHour = raw.current?.time
    ? raw.current.time.slice(0, 13)
    : new Date().toISOString().slice(0, 13);

  let startIndex = 0;
  if (Array.isArray(raw.hourly?.time) && raw.hourly.time.length > 0) {
    const found = raw.hourly.time.findIndex((t: string) => t.startsWith(currentIsoHour));
    if (found >= 0) {
      startIndex = found;
    }
  }

  const hourly: HourlyForecastItem[] = [];
  const hourlyCount = Math.min(24, (raw.hourly?.time?.length ?? 0) - startIndex);

  for (let i = 0; i < hourlyCount; i++) {
    const idx = startIndex + i;
    const timeStr = raw.hourly.time[idx] || '';
    const itemIsDay = raw.hourly.is_day ? raw.hourly.is_day[idx] === 1 : true;
    const weatherCode = raw.hourly.weather_code?.[idx] ?? 0;

    // Time extraction directly from ISO string (immune to browser timezone offset distortion)
    const hourFormatted =
      timeStr.length >= 16 ? timeStr.slice(11, 16) : `${String(i).padStart(2, '0')}:00`;

    hourly.push({
      time: timeStr,
      hour: i === 0 ? 'Agora' : hourFormatted,
      temp: Math.round(raw.hourly.temperature_2m?.[idx] ?? temp),
      feelsLike: Math.round(raw.hourly.apparent_temperature?.[idx] ?? feelsLike),
      rainProb: Math.round(raw.hourly.precipitation_probability?.[idx] ?? 0),
      precipitation: Math.round((raw.hourly.precipitation?.[idx] ?? 0) * 10) / 10,
      weatherCode,
      windSpeed: Math.round(raw.hourly.wind_speed_10m?.[idx] ?? windSpeed),
      uvIndex: Math.round((raw.hourly.uv_index?.[idx] ?? 0) * 10) / 10,
      isDay: itemIsDay,
      condition: getWeatherCondition(weatherCode, itemIsDay)
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
    const weatherCode = raw.daily.weather_code?.[i] ?? 0;

    // Direct slice from ISO string to preserve the local sunrise/sunset time
    const rawSunrise = raw.daily.sunrise?.[i] || '';
    const rawSunset = raw.daily.sunset?.[i] || '';
    const sunriseStr = rawSunrise.length >= 16 ? rawSunrise.slice(11, 16) : '06:00';
    const sunsetStr = rawSunset.length >= 16 ? rawSunset.slice(11, 16) : '18:00';

    daily.push({
      date: dateStr,
      dayOfWeek: dayLabel,
      formattedDate,
      weatherCode,
      condition: getWeatherCondition(weatherCode, true),
      tempMax: Math.round(raw.daily.temperature_2m_max?.[i] ?? temp),
      tempMin: Math.round(raw.daily.temperature_2m_min?.[i] ?? temp - 5),
      apparentTempMax: Math.round(raw.daily.apparent_temperature_max?.[i] ?? temp),
      apparentTempMin: Math.round(raw.daily.apparent_temperature_min?.[i] ?? temp - 5),
      precipitationSum: Math.round((raw.daily.precipitation_sum?.[i] ?? 0) * 10) / 10,
      precipitationProbabilityMax: Math.round(raw.daily.precipitation_probability_max?.[i] ?? 0),
      windSpeedMax: Math.round(raw.daily.wind_speed_10m_max?.[i] ?? 15),
      uvIndexMax: Math.round((raw.daily.uv_index_max?.[i] ?? 6) * 10) / 10,
      sunrise: sunriseStr,
      sunset: sunsetStr
    });
  }

  const result: FullWeatherData = {
    location: safeLocation,
    current,
    hourly,
    daily,
    updatedAt: new Date()
  };

  cache.set(cacheKey, { data: result, timestamp: Date.now() });

  // Store in localStorage for offline resilience
  try {
    localStorage.setItem(`previsao_data_${cacheKey}`, JSON.stringify(result));
  } catch {
    // ignore
  }

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

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 5000): Promise<Response> {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller?.signal
    });
    return response;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

// Reverse Geocoding for GPS coordinates with high precision municipality resolution
export async function getCityFromCoordinates(lat: number, lon: number): Promise<LocationData> {
  const safeLat = Number(lat.toFixed(4));
  const safeLon = Number(lon.toFixed(4));

  // Provider 1: OpenStreetMap Nominatim with high resolution zoom and Brazilian address parsing
  try {
    const nomUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${safeLat}&lon=${safeLon}&zoom=12&addressdetails=1`;
    const res = await fetchWithTimeout(
      nomUrl,
      {
        headers: {
          'User-Agent': 'PrevisaoDoTempoAgora/2.0 (previsaodotempoagora.oficial@gmail.com)'
        }
      },
      4500
    );

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const cityName =
        addr.city ||
        addr.town ||
        addr.municipality ||
        addr.village ||
        addr.suburb ||
        addr.city_district ||
        addr.county ||
        '';

      const stateName = addr.state || '';
      const rawIso = addr['ISO3166-2-lvl4'] ? String(addr['ISO3166-2-lvl4']).replace('BR-', '') : '';
      const stateCode = rawIso || BRAZIL_STATE_MAP[stateName.toLowerCase()] || '';

      if (cityName) {
        return {
          id: `gps-${safeLat}-${safeLon}`,
          name: cityName,
          state: stateName || 'Brasil',
          stateCode,
          country: 'Brasil',
          lat: safeLat,
          lon: safeLon
        };
      }
    }
  } catch (err) {
    console.warn('Nominatim reverse geocode attempt failed:', err);
  }

  // Provider 2: Photon by Komoot (Fast OSM mirror)
  try {
    const photonUrl = `https://photon.komoot.io/reverse?lat=${safeLat}&lon=${safeLon}`;
    const res = await fetchWithTimeout(photonUrl, {}, 4000);
    if (res.ok) {
      const data = await res.json();
      if (data?.features && data.features.length > 0) {
        const props = data.features[0]?.properties || {};
        const cityName = props.city || props.town || props.locality || props.district || props.name || '';
        const stateName = props.state || '';
        const stateCode = BRAZIL_STATE_MAP[stateName.toLowerCase()] || '';

        if (cityName) {
          return {
            id: `gps-${safeLat}-${safeLon}`,
            name: cityName,
            state: stateName || 'Brasil',
            stateCode,
            country: 'Brasil',
            lat: safeLat,
            lon: safeLon
          };
        }
      }
    }
  } catch (err) {
    console.warn('Photon reverse geocode attempt failed:', err);
  }

  // Fallback: If both reverse geocoders were unreachable, locate closest known preset municipality
  let closest = BRAZIL_CAPITALS[0];
  let minDistance = Number.MAX_VALUE;

  for (const city of ALL_PRESET_CITIES) {
    const dist = Math.hypot(city.lat - safeLat, city.lon - safeLon);
    if (dist < minDistance) {
      minDistance = dist;
      closest = city;
    }
  }

  return {
    id: `gps-${safeLat}-${safeLon}`,
    name: closest.name,
    state: closest.state,
    stateCode: closest.stateCode,
    country: 'Brasil',
    lat: safeLat,
    lon: safeLon
  };
}

// Fallback approximate location by IP when browser GPS is denied or unavailable
export async function getApproximateLocationByIp(): Promise<LocationData | null> {
  // Provider 1: ipwho.is (CORS enabled, highly accurate in Brazil)
  try {
    const res = await fetchWithTimeout('https://ipwho.is/', {}, 4500);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.latitude && data.longitude) {
        const stateCode = data.region_code || BRAZIL_STATE_MAP[(data.region || '').toLowerCase()] || '';
        return {
          id: `ip-${data.city || 'local'}-${data.latitude}`,
          name: data.city || 'Minha Localização',
          state: data.region || 'Brasil',
          stateCode,
          country: data.country || 'Brasil',
          lat: Number(Number(data.latitude).toFixed(4)),
          lon: Number(Number(data.longitude).toFixed(4))
        };
      }
    }
  } catch (err) {
    console.warn('ipwho.is lookup failed:', err);
  }

  // Provider 2: freeipapi.com
  try {
    const res2 = await fetchWithTimeout('https://freeipapi.com/api/json', {}, 4000);
    if (res2.ok) {
      const data2 = await res2.json();
      if (data2.latitude && data2.longitude) {
        const stateCode = BRAZIL_STATE_MAP[(data2.regionName || '').toLowerCase()] || '';
        return {
          id: `ip-${data2.cityName || 'local'}-${data2.latitude}`,
          name: data2.cityName || 'Minha Localização',
          state: data2.regionName || 'Brasil',
          stateCode,
          country: data2.countryName || 'Brasil',
          lat: Number(Number(data2.latitude).toFixed(4)),
          lon: Number(Number(data2.longitude).toFixed(4))
        };
      }
    }
  } catch (err) {
    console.warn('freeipapi lookup failed:', err);
  }

  return null;
}


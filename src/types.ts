export interface LocationData {
  id: string;
  name: string;
  state?: string;
  stateCode?: string;
  country: string;
  lat: number;
  lon: number;
  timezone?: string;
  isCapital?: boolean;
}

export interface WeatherConditionInfo {
  code: number;
  label: string;
  icon: string;
  color: string;
  bgGradient: string;
  badgeBg: string;
  badgeText: string;
}

export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  precipitation: number;
  rain: number;
  weatherCode: number;
  cloudCover: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  windGusts: number;
  uvIndex: number;
  isDay: boolean;
  condition: WeatherConditionInfo;
  time: string;
}

export interface HourlyForecastItem {
  time: string;
  hour: string;
  temp: number;
  feelsLike: number;
  rainProb: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  uvIndex: number;
  isDay: boolean;
  condition: WeatherConditionInfo;
}

export interface DailyForecastItem {
  date: string;
  dayOfWeek: string;
  formattedDate: string;
  weatherCode: number;
  condition: WeatherConditionInfo;
  tempMax: number;
  tempMin: number;
  apparentTempMax: number;
  apparentTempMin: number;
  precipitationSum: number;
  precipitationProbabilityMax: number;
  windSpeedMax: number;
  uvIndexMax: number;
  sunrise: string;
  sunset: string;
}

export interface FullWeatherData {
  location: LocationData;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  updatedAt: Date;
}

export type ForecastTab = 'today' | '7days' | '15days';

export type ThemeMode = 'auto' | 'light' | 'dark';

export interface UVLevelInfo {
  level: string;
  color: string;
  description: string;
  advice: string;
}

import React, { useState, useEffect, useCallback } from 'react';
import {
  FullWeatherData,
  LocationData,
  ForecastTab,
  ThemeMode
} from './types';
import {
  fetchWeatherData,
  getCityFromCoordinates,
  getApproximateLocationByIp
} from './services/weatherApi';
import { BRAZIL_CAPITALS } from './data/brazilCities';
import { Header } from './components/Header';
import { FavoritesBar } from './components/FavoritesBar';
import { TabNavigation } from './components/TabNavigation';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { HourlyForecast } from './components/HourlyForecast';
import { WeatherDetailsGrid } from './components/WeatherDetailsGrid';
import { DailyForecast } from './components/DailyForecast';
import { ThermalOverviewChart } from './components/ThermalOverviewChart';
import { BrazilRegionsOverview } from './components/BrazilRegionsOverview';
import { WeatherEducationSection } from './components/WeatherEducationSection';
import { WeatherFaqSection } from './components/WeatherFaqSection';
import { AdSenseSlot } from './components/AdSenseSlot';
import { InstitutionalModal, InstitutionalTab } from './components/InstitutionalModal';
import { CookieBanner } from './components/CookieBanner';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import {
  Loader2,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
  FileText,
  Info,
  Mail,
  Heart,
  Globe,
  Database
} from 'lucide-react';

const DEFAULT_CITY = BRAZIL_CAPITALS[0]; // São Paulo, SP

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData>(() => {
    try {
      const saved = localStorage.getItem('previsao_tempo_last_city');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          typeof parsed.lat === 'number' &&
          !isNaN(parsed.lat) &&
          typeof parsed.lon === 'number' &&
          !isNaN(parsed.lon)
        ) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_CITY;
  });

  const [weatherData, setWeatherData] = useState<FullWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isGpsLoading, setIsGpsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ForecastTab>('today');

  // Objective accordion states for 7 and 15 days
  const [is7DaysFullOpen, setIs7DaysFullOpen] = useState<boolean>(false);
  const [is15DaysFullOpen, setIs15DaysFullOpen] = useState<boolean>(false);

  // Theme mode: 'auto' (device preference), 'light', or 'dark'
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('previsao_theme_mode') as ThemeMode | null;
      if (saved === 'auto' || saved === 'light' || saved === 'dark') {
        return saved;
      }
      const legacy = localStorage.getItem('previsao_theme');
      if (legacy === 'dark') return 'dark';
      if (legacy === 'light') return 'light';
    } catch {
      // fallback
    }
    return 'auto'; // Default: follows user device preference
  });

  // Device system theme detection
  const [devicePrefersDark, setDevicePrefersDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setDevicePrefersDark(e.matches);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const isDarkMode = themeMode === 'auto' ? devicePrefersDark : themeMode === 'dark';

  // Sync dark class to <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('previsao_theme_mode', themeMode);
    } catch {
      // ignore
    }
  }, [isDarkMode, themeMode]);

  const handleOpen7DaysFull = () => {
    setIs7DaysFullOpen(true);
    setTimeout(() => {
      const el = document.getElementById('daily-forecast-container-7');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleOpen15DaysFull = () => {
    setIs15DaysFullOpen(true);
    setTimeout(() => {
      const el = document.getElementById('daily-forecast-container-15');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Institutional Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInitialTab, setModalInitialTab] = useState<InstitutionalTab>('privacy');
  const [gpsNotification, setGpsNotification] = useState<string | null>(null);

  const [favorites, setFavorites] = useState<LocationData[]>(() => {
    try {
      const saved = localStorage.getItem('previsao_tempo_favs');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [BRAZIL_CAPITALS[0], BRAZIL_CAPITALS[1], BRAZIL_CAPITALS[2]]; // SP, RJ, DF
  });

  const openInstitutional = (tab: InstitutionalTab) => {
    setModalInitialTab(tab);
    setIsModalOpen(true);
  };

  const loadWeather = useCallback(async (location: LocationData, isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
      try {
        localStorage.setItem('previsao_tempo_last_city', JSON.stringify(location));
      } catch {
        // ignore
      }
    } catch (err: any) {
      console.error('Error fetching weather:', err);
      setError(err?.message || 'Erro ao carregar dados meteorológicos. Verifique sua conexão.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadWeather(selectedLocation);
  }, [selectedLocation, loadWeather]);

  const handleSelectCity = (location: LocationData) => {
    setSelectedLocation(location);
  };

  // Resilient GPS handler with multi-stage accuracy and non-blocking notifications
  const handleUseGps = () => {
    setIsGpsLoading(true);
    setGpsNotification(null);

    const tryIpFallback = async () => {
      try {
        const ipLocation = await getApproximateLocationByIp();
        if (ipLocation) {
          setSelectedLocation(ipLocation);
          setGpsNotification(`Localização aproximada detectada: ${ipLocation.name}`);
          setTimeout(() => setGpsNotification(null), 4000);
          return;
        }
      } catch (err) {
        console.warn('IP fallback failed:', err);
      }
      setGpsNotification(
        'Não foi possível obter a localização GPS. Você pode digitar e escolher sua cidade no campo de busca acima.'
      );
      setTimeout(() => setGpsNotification(null), 5000);
    };

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      tryIpFallback().finally(() => setIsGpsLoading(false));
      return;
    }

    const onGpsSuccess = async (position: GeolocationPosition) => {
      try {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const matchedLocation = await getCityFromCoordinates(lat, lon);
        setSelectedLocation(matchedLocation);
      } catch (err) {
        console.error('Error resolving GPS coordinates:', err);
        await tryIpFallback();
      } finally {
        setIsGpsLoading(false);
      }
    };

    const tryLowAccuracy = () => {
      navigator.geolocation.getCurrentPosition(
        onGpsSuccess,
        async (geoError) => {
          console.warn('Geolocation low-accuracy fallback error:', geoError.message);
          await tryIpFallback();
          setIsGpsLoading(false);
        },
        { timeout: 7000, enableHighAccuracy: false, maximumAge: 300000 }
      );
    };

    // First attempt high accuracy (satellites), fall back to cell/wifi if taking too long
    navigator.geolocation.getCurrentPosition(
      onGpsSuccess,
      () => {
        tryLowAccuracy();
      },
      { timeout: 4500, enableHighAccuracy: true, maximumAge: 60000 }
    );
  };

  const handleToggleFavorite = (location: LocationData) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (f) =>
          f.id === location.id ||
          f.name.toLowerCase() === location.name.toLowerCase() ||
          (Math.abs(f.lat - location.lat) < 0.05 && Math.abs(f.lon - location.lon) < 0.05)
      );
      let updated: LocationData[];
      if (exists) {
        updated = prev.filter(
          (f) =>
            !(
              f.id === location.id ||
              f.name.toLowerCase() === location.name.toLowerCase() ||
              (Math.abs(f.lat - location.lat) < 0.05 && Math.abs(f.lon - location.lon) < 0.05)
            )
        );
      } else {
        updated = [...prev, location];
      }
      try {
        localStorage.setItem('previsao_tempo_favs', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleRemoveFavorite = (location: LocationData) => {
    setFavorites((prev) => {
      const updated = prev.filter(
        (f) =>
          !(
            f.id === location.id ||
            f.name.toLowerCase() === location.name.toLowerCase() ||
            (Math.abs(f.lat - location.lat) < 0.05 && Math.abs(f.lon - location.lon) < 0.05)
          )
      );
      try {
        localStorage.setItem('previsao_tempo_favs', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const isCurrentFavorite = favorites.some(
    (f) =>
      f.id === selectedLocation.id ||
      f.name.toLowerCase() === selectedLocation.name.toLowerCase() ||
      (Math.abs(f.lat - selectedLocation.lat) < 0.05 && Math.abs(f.lon - selectedLocation.lon) < 0.05)
  );

  const todayDaily = weatherData?.daily?.[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white font-sans transition-colors">
      {/* Top Header with City Search, Dark Mode Switch & Exact Favicon Brand */}
      <Header
        currentLocation={selectedLocation}
        onSelectCity={handleSelectCity}
        onUseGps={handleUseGps}
        isGpsLoading={isGpsLoading}
        onRefresh={() => loadWeather(selectedLocation, true)}
        isRefreshing={isRefreshing}
        lastUpdated={weatherData?.updatedAt || null}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onOpenInstitutional={openInstitutional}
        themeMode={themeMode}
        onSelectThemeMode={setThemeMode}
        isDarkMode={isDarkMode}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 space-y-3.5 sm:space-y-4">
        {/* GPS Notification Toast if triggered */}
        {gpsNotification && (
          <div className="p-3 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-2xl text-xs font-semibold text-blue-800 dark:text-blue-200 flex items-center justify-between shadow-xs animate-in fade-in">
            <span>{gpsNotification}</span>
            <button
              onClick={() => setGpsNotification(null)}
              className="text-blue-500 hover:text-blue-700 ml-2 font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* PWA Mobile Shortcut / Install Banner */}
        <PWAInstallBanner />

        {/* Cidades Favoritas */}
        <div className="w-full overflow-x-auto no-scrollbar py-0.5" id="favorites-bar-container">
          <FavoritesBar
            currentLocation={selectedLocation}
            favorites={favorites}
            onSelectCity={handleSelectCity}
            onRemoveFavorite={handleRemoveFavorite}
            onAddFavorite={handleToggleFavorite}
          />
        </div>

        {/* Tab Navigation: Hoje / 7 Dias / 15 Dias */}
        <TabNavigation
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />

        {/* Loading State */}
        {isLoading && !weatherData ? (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs">
            <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
              Obtendo dados meteorológicos em tempo real para {selectedLocation.name}...
            </p>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Conectando com modelos de alta resolução para o Brasil
            </span>
          </div>
        ) : error ? (
          <div className="p-8 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-3xl text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-base font-bold text-rose-900 dark:text-rose-200">
              Não foi possível carregar a previsão
            </h3>
            <p className="text-xs text-rose-700 dark:text-rose-300 max-w-md mx-auto">{error}</p>
            <button
              onClick={() => loadWeather(selectedLocation)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 inline-flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Tentar Novamente
            </button>
          </div>
        ) : weatherData ? (
          <div className="space-y-4">
            {/* VIEW 1: HOJE */}
            {activeTab === 'today' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* 1. Previsão do Dia (Card com fundo dinâmico de clima e Xiaomi noite) */}
                <CurrentWeatherCard
                  location={selectedLocation}
                  current={weatherData.current}
                  todayDaily={todayDaily}
                  isFavorite={isCurrentFavorite}
                  onToggleFavorite={handleToggleFavorite}
                />

                {/* 2. Previsão Hora a Hora (Linha única: temperatura em cima, e abaixo: ícone, vento e hora) */}
                <HourlyForecast hourly={weatherData.hourly} />

                {/* 3. Anúncio Mobile / Desktop: imediatamente após previsão do dia e do hora a hora */}
                <AdSenseSlot slotId="today-after-hourly" format="auto" className="my-2" />

                {/* 4. Detalhes de Hoje (UV, Umidade, Vento, Pressão, Nascer/Pôr do sol) */}
                <WeatherDetailsGrid
                  current={weatherData.current}
                  todayDaily={todayDaily}
                />

                {/* 5. Resumo dos Próximos 7 Dias */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-5 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
                      Resumo da Semana
                    </h3>
                    <button
                      onClick={() => setActiveTab('7days')}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      Ver visão 7 dias →
                    </button>
                  </div>
                  <DailyForecast
                    days={weatherData.daily}
                    maxDaysToShow={7}
                    title="Próximos Dias"
                    collapsible={false}
                    defaultExpanded={true}
                  />
                </div>
              </div>
            )}

            {/* VIEW 2: 7 DIAS (Objetiva: Tendência & Clima -> Anúncio -> Previsão Completa com Seta) */}
            {activeTab === '7days' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* 1. Tendência Térmica e Clima */}
                <ThermalOverviewChart
                  days={weatherData.daily}
                  maxDays={7}
                  onOpenFullForecast={handleOpen7DaysFull}
                />

                {/* 2. Anúncio Mobile / Desktop: imediatamente após tendência e clima */}
                <AdSenseSlot slotId="7days-after-trend" format="auto" className="my-2" />

                {/* 3. Previsão Completa Semanal com Seta / Acordeão para expandir */}
                <DailyForecast
                  days={weatherData.daily}
                  maxDaysToShow={7}
                  title="Previsão Completa"
                  collapsible={true}
                  defaultExpanded={is7DaysFullOpen}
                />
              </div>
            )}

            {/* VIEW 3: 15 DIAS (Objetiva: Tendência & Clima -> Anúncio -> Previsão Completa com Seta) */}
            {activeTab === '15days' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* 1. Tendência Térmica e Clima 15 Dias */}
                <ThermalOverviewChart
                  days={weatherData.daily}
                  maxDays={15}
                  onOpenFullForecast={handleOpen15DaysFull}
                />

                {/* 2. Anúncio Mobile / Desktop: imediatamente após tendência e clima */}
                <AdSenseSlot slotId="15days-after-trend" format="auto" className="my-2" />

                {/* 3. Previsão Completa Estendida com Seta / Acordeão para expandir */}
                <DailyForecast
                  days={weatherData.daily}
                  maxDaysToShow={15}
                  title="Previsão Completa Estendida"
                  collapsible={true}
                  defaultExpanded={is15DaysFullOpen}
                />
              </div>
            )}

            {/* In-content Responsive AdSense Slot */}
            <AdSenseSlot slotId="in-content-mid-banner" format="auto" className="my-3" />

            {/* Brazil Regions Quick Navigator */}
            <BrazilRegionsOverview
              currentLocation={selectedLocation}
              onSelectCity={handleSelectCity}
            />

            {/* Educational & Editorial Weather Knowledge Section */}
            <WeatherEducationSection />

            {/* Weather FAQ Section */}
            <WeatherFaqSection />
          </div>
        ) : null}
      </main>

      {/* Institutional Footer */}
      <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-8 pb-7 mt-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Col 1: Brand & Mission */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl overflow-hidden shadow-xs shrink-0 bg-blue-600 flex items-center justify-center p-0.5">
                  <img src="/favicon.svg" alt="App Icon" className="w-full h-full object-contain" />
                </div>
                <span className="font-black text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
                  PREVISÃO DO TEMPO <span className="text-blue-600 dark:text-blue-400">AGORA</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Portal de informações meteorológicas em tempo real para todo o Brasil. Dados de alta acurácia com modelos ECMWF, GFS e WMO.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Servidor e dados 100% operacionais</span>
              </div>
            </div>

            {/* Col 2: Previsões e Navegação */}
            <div className="space-y-2.5 text-xs">
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Navegação Rápida
              </h4>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('today');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left cursor-pointer"
                  >
                    Clima Hoje em Tempo Real
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('7days');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left cursor-pointer"
                  >
                    Previsão dos Próximos 7 Dias
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('15days');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left cursor-pointer"
                  >
                    Tendência Estendida de 15 Dias
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const el = document.getElementById('brazil-regions-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left cursor-pointer"
                  >
                    Capitais e Regiões do Brasil
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Institucional & Conformidade AdSense / LGPD */}
            <div className="space-y-2.5 text-xs">
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Institucional & LGPD
              </h4>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
                <li>
                  <button
                    onClick={() => openInstitutional('privacy')}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Política de Privacidade (LGPD)</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openInstitutional('terms')}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Termos e Condições de Uso</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openInstitutional('about')}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Sobre Nós & Metodologia</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openInstitutional('contact')}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Fale Conosco / Suporte</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Fontes & Responsabilidade */}
            <div className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Fontes de Dados
              </h4>
              <p className="leading-relaxed">
                Dados atmosféricos fornecidos via integração com Open-Meteo, Copernicus Climate Service, NOAA e Instituto Nacional de Meteorologia (INMET).
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px]">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>Cobertura nacional em todos os 5.570 municípios</span>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-500">
            <p>© {new Date().getFullYear()} Previsão do Tempo Agora. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => openInstitutional('privacy')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                Privacidade
              </button>
              <span>•</span>
              <button
                onClick={() => openInstitutional('terms')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                Termos
              </button>
              <span>•</span>
              <button
                onClick={() => openInstitutional('contact')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                Contato
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Institutional Legal Modal */}
      <InstitutionalModal
        isOpen={isModalOpen}
        initialTab={modalInitialTab}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Cookie Consent Banner */}
      <CookieBanner onOpenPrivacy={() => openInstitutional('privacy')} />
    </div>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import {
  FullWeatherData,
  LocationData,
  ForecastTab
} from './types';
import {
  fetchWeatherData,
  getCityFromCoordinates
} from './services/weatherApi';
import { BRAZIL_CAPITALS } from './data/brazilCities';
import { Header } from './components/Header';
import { CapitalChips } from './components/CapitalChips';
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
import {
  CloudSun,
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
        return JSON.parse(saved);
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
  
  // Institutional Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInitialTab, setModalInitialTab] = useState<InstitutionalTab>('privacy');

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

  const handleUseGps = () => {
    if (!navigator.geolocation) {
      alert('Geolocalização não é suportada neste navegador.');
      return;
    }

    setIsGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const matchedLocation = await getCityFromCoordinates(lat, lon);
          setSelectedLocation(matchedLocation);
        } catch (err) {
          console.error(err);
        } finally {
          setIsGpsLoading(false);
        }
      },
      (geoError) => {
        console.warn('Geolocation error:', geoError);
        setIsGpsLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleToggleFavorite = (location: LocationData) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (f) => f.id === location.id || (Math.abs(f.lat - location.lat) < 0.05 && Math.abs(f.lon - location.lon) < 0.05)
      );
      let updated: LocationData[];
      if (exists) {
        updated = prev.filter(
          (f) => !(f.id === location.id || (Math.abs(f.lat - location.lat) < 0.05 && Math.abs(f.lon - location.lon) < 0.05))
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

  const todayDaily = weatherData?.daily?.[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col selection:bg-blue-600 selection:text-white font-sans">
      {/* Top Header with City Search */}
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
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Quick Capitais Bar */}
        <CapitalChips
          currentLocation={selectedLocation}
          onSelectCity={handleSelectCity}
        />

        {/* Top Responsive AdSense Banner */}
        <AdSenseSlot slotId="header-top-banner" format="auto" className="my-1" />

        {/* Tab Navigation: Hoje / 7 Dias / 15 Dias */}
        <TabNavigation
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />

        {/* Loading State */}
        {isLoading && !weatherData ? (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-3 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-sm font-semibold text-slate-700">
              Obtendo dados meteorológicos em tempo real para {selectedLocation.name}...
            </p>
            <span className="text-xs text-slate-400">
              Conectando com estações meteorológicas de alta precisão
            </span>
          </div>
        ) : error ? (
          <div className="p-8 bg-rose-50 border border-rose-200 rounded-3xl text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-base font-bold text-rose-900">
              Não foi possível carregar a previsão
            </h3>
            <p className="text-xs text-rose-700 max-w-md mx-auto">{error}</p>
            <button
              onClick={() => loadWeather(selectedLocation)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Tentar Novamente
            </button>
          </div>
        ) : weatherData ? (
          <div className="space-y-5">
            {/* VIEW 1: HOJE */}
            {activeTab === 'today' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                {/* Hero Current Weather */}
                <CurrentWeatherCard
                  location={selectedLocation}
                  current={weatherData.current}
                  todayDaily={todayDaily}
                />

                {/* Next 24 Hours */}
                <HourlyForecast hourly={weatherData.hourly} />

                {/* Details Grid (UV, Umidade, Vento, Sol, Pressão) */}
                <WeatherDetailsGrid
                  current={weatherData.current}
                  todayDaily={todayDaily}
                />

                {/* Mini Preview of Next 7 Days */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                      Resumo dos Próximos 7 Dias
                    </h3>
                    <button
                      onClick={() => setActiveTab('7days')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Ver detalhes completos →
                    </button>
                  </div>
                  <DailyForecast
                    days={weatherData.daily}
                    maxDaysToShow={7}
                    title="Próximos Dias"
                  />
                </div>
              </div>
            )}

            {/* VIEW 2: 7 DIAS */}
            {activeTab === '7days' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                {/* Thermal Evolution Trend */}
                <ThermalOverviewChart
                  days={weatherData.daily}
                  maxDays={7}
                />

                {/* 7-Day Complete Forecast */}
                <DailyForecast
                  days={weatherData.daily}
                  maxDaysToShow={7}
                  title="Previsão Semanal"
                />

                {/* Hourly breakdown for reference */}
                <HourlyForecast hourly={weatherData.hourly} />
              </div>
            )}

            {/* VIEW 3: 15 DIAS */}
            {activeTab === '15days' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                {/* Thermal Evolution Trend for 15 Days */}
                <ThermalOverviewChart
                  days={weatherData.daily}
                  maxDays={15}
                />

                {/* 15-Day Complete Forecast */}
                <DailyForecast
                  days={weatherData.daily}
                  maxDaysToShow={15}
                  title="Previsão Estendida"
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

            {/* Educational & Editorial Weather Knowledge Section (AdSense Content Value) */}
            <WeatherEducationSection />

            {/* Weather FAQ Section (AdSense Value & User Guidance) */}
            <WeatherFaqSection />
          </div>
        ) : null}
      </main>

      {/* Comprehensive AdSense-Ready Institutional Footer */}
      <footer className="w-full bg-white border-t border-slate-200 pt-10 pb-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* 4-Column Structured Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Col 1: Brand & Mission */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                  <CloudSun className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-base text-slate-900 tracking-tight">
                  PREVISÃO DO TEMPO <span className="text-blue-600">AGORA</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Portal de informações meteorológicas em tempo real para todos os municípios do Brasil. Dados de alta acurácia com modelos ECMWF, GFS e WMO.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Servidor e dados 100% operacionais</span>
              </div>
            </div>

            {/* Col 2: Previsões e Navegação */}
            <div className="space-y-3 text-xs">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px]">
                Navegação Rápida
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('today');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-blue-600 transition-colors text-left"
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
                    className="hover:text-blue-600 transition-colors text-left"
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
                    className="hover:text-blue-600 transition-colors text-left"
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
                    className="hover:text-blue-600 transition-colors text-left"
                  >
                    Capitais e Regiões do Brasil
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Institucional & Conformidade AdSense / LGPD */}
            <div className="space-y-3 text-xs">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px]">
                Institucional & LGPD
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <button
                    onClick={() => openInstitutional('privacy')}
                    className="hover:text-blue-600 transition-colors text-left flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Política de Privacidade (LGPD)</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openInstitutional('terms')}
                    className="hover:text-blue-600 transition-colors text-left flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Termos e Condições de Uso</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openInstitutional('about')}
                    className="hover:text-blue-600 transition-colors text-left flex items-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5 text-blue-600" />
                    <span>Sobre Nós & Metodologia</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openInstitutional('contact')}
                    className="hover:text-blue-600 transition-colors text-left flex items-center gap-1.5 font-bold text-blue-600"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Fale Conosco / Suporte</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Fontes & Responsabilidade */}
            <div className="space-y-3 text-xs">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px]">
                Fontes & Dados
              </h4>
              <div className="text-slate-500 space-y-1.5 leading-relaxed">
                <p>
                  Dados meteorológicos fornecidos por <strong>Open-Meteo</strong> e <strong>ECMWF</strong> sob licença de dados abertos.
                </p>
                <p>
                  Suporte direto:{' '}
                  <a
                    href="mailto:contatodanielabrito@gmail.com"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    contatodanielabrito@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} Previsão do Tempo Agora. Todos os direitos reservados.</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => openInstitutional('privacy')}
                className="hover:text-slate-700 transition-colors underline"
              >
                Privacidade
              </button>
              <span>•</span>
              <button
                onClick={() => openInstitutional('terms')}
                className="hover:text-slate-700 transition-colors underline"
              >
                Termos
              </button>
              <span>•</span>
              <button
                onClick={() => openInstitutional('contact')}
                className="hover:text-slate-700 transition-colors underline"
              >
                Contato
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Institutional Legal & Contact Modal */}
      <InstitutionalModal
        isOpen={isModalOpen}
        initialTab={modalInitialTab}
        onClose={() => setIsModalOpen(false)}
      />

      {/* LGPD & Cookies Consent Banner */}
      <CookieBanner
        onOpenPrivacy={() => openInstitutional('privacy')}
      />
    </div>
  );
}


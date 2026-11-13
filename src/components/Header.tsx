import React from 'react';
import { RefreshCw, Info, Sun, Moon, Laptop } from 'lucide-react';
import { CitySearch } from './CitySearch';
import { LocationData, ThemeMode } from '../types';

interface HeaderProps {
  currentLocation: LocationData;
  onSelectCity: (location: LocationData) => void;
  onUseGps: () => void;
  isGpsLoading: boolean;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: Date | null;
  favorites: LocationData[];
  onToggleFavorite: (location: LocationData) => void;
  onOpenInstitutional?: (tab: 'privacy' | 'terms' | 'about' | 'contact') => void;
  themeMode: ThemeMode;
  onSelectThemeMode: (mode: ThemeMode) => void;
  isDarkMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  onSelectCity,
  onUseGps,
  isGpsLoading,
  onRefresh,
  isRefreshing,
  lastUpdated,
  favorites,
  onToggleFavorite,
  onOpenInstitutional,
  themeMode,
  onSelectThemeMode,
  isDarkMode
}) => {
  const handleCycleTheme = () => {
    const nextMode: ThemeMode =
      themeMode === 'auto' ? 'light' : themeMode === 'light' ? 'dark' : 'auto';
    onSelectThemeMode(nextMode);
  };
  return (
    <header className="w-full bg-white/95 dark:bg-plum-900/95 backdrop-blur-md border-b border-stone-200/80 dark:border-plum-800 sticky top-0 z-40 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-3.5">
          {/* Brand & Live status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Favicon-matching Brand Icon */}
              <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-md shadow-brand-500/20 shrink-0 border border-brand-300/30 flex items-center justify-center bg-brand-600">
                <img
                  src="/favicon.svg"
                  alt="Previsão do Tempo Agora"
                  className="w-full h-full object-contain p-0.5"
                />
              </div>

              <div>
                <h1 className="text-base sm:text-lg lg:text-xl font-black tracking-tight text-stone-900 dark:text-white leading-none">
                  PREVISÃO DO TEMPO <span className="text-brand-600 dark:text-brand-400">AGORA</span>
                </h1>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                    Tempo Real • Todo o Brasil
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Actions: Dark Mode Toggle, Info & Refresh */}
            <div className="flex md:hidden items-center gap-1">
              <button
                type="button"
                id="theme-toggle-btn-mobile"
                onClick={handleCycleTheme}
                title={`Tema: ${
                  themeMode === 'auto'
                    ? 'Automático (Dispositivo)'
                    : themeMode === 'light'
                    ? 'Modo Claro'
                    : 'Modo Escuro'
                }. Toque para alternar.`}
                className="p-1.5 rounded-xl border border-stone-200 dark:border-plum-800 bg-stone-50 dark:bg-plum-850 text-stone-600 dark:text-stone-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1 text-xs cursor-pointer shadow-2xs"
              >
                {themeMode === 'auto' ? (
                  <>
                    <Laptop className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                    <span className="text-[10px] font-bold">Auto</span>
                  </>
                ) : themeMode === 'light' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[10px] font-bold">Claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-brand-300" />
                    <span className="text-[10px] font-bold">Escuro</span>
                  </>
                )}
              </button>

              {onOpenInstitutional && (
                <button
                  id="info-institutional-btn-mobile"
                  onClick={() => onOpenInstitutional('about')}
                  title="Sobre a plataforma e fontes de dados"
                  className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-plum-800 transition-colors cursor-pointer"
                >
                  <Info className="w-4 h-4" />
                </button>
              )}

              <button
                id="refresh-weather-btn-mobile"
                onClick={onRefresh}
                disabled={isRefreshing}
                title="Atualizar previsão agora"
                className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-plum-800 transition-colors cursor-pointer"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-brand-600' : ''}`}
                />
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-xl">
            <CitySearch
              currentLocation={currentLocation}
              onSelectCity={onSelectCity}
              onUseGps={onUseGps}
              isGpsLoading={isGpsLoading}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
            />
          </div>

          {/* Desktop Refresh, Dark Mode & Timestamp */}
          <div className="hidden md:flex items-center gap-2.5 text-right">
            {lastUpdated && (
              <div className="text-[11px] text-stone-400 dark:text-stone-500 mr-1">
                <span>Atualizado:</span>{' '}
                <span className="font-semibold text-stone-700 dark:text-stone-200 tabular-nums">
                  {lastUpdated.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )}

            {/* Dark/Light/Auto Mode Segmented Switcher */}
            <div
              className="flex items-center p-0.5 rounded-xl bg-stone-100 dark:bg-plum-850 border border-stone-200 dark:border-plum-800 text-xs font-semibold shadow-2xs"
              id="theme-segmented-control-desktop"
            >
              <button
                type="button"
                onClick={() => onSelectThemeMode('auto')}
                title="Modo Automático (Segue o tema do seu dispositivo)"
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
                  themeMode === 'auto'
                    ? 'bg-white dark:bg-plum-800 text-brand-600 dark:text-brand-300 font-black shadow-xs'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-white'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>Auto</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectThemeMode('light')}
                title="Modo Claro"
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
                  themeMode === 'light'
                    ? 'bg-white dark:bg-plum-800 text-amber-600 dark:text-amber-400 font-black shadow-xs'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Claro</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectThemeMode('dark')}
                title="Modo Escuro"
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
                  themeMode === 'dark'
                    ? 'bg-white dark:bg-plum-800 text-brand-400 font-black shadow-xs'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Escuro</span>
              </button>
            </div>

            {onOpenInstitutional && (
              <button
                id="info-institutional-btn-desktop"
                onClick={() => onOpenInstitutional('about')}
                title="Sobre a plataforma e fontes de dados"
                className="p-2.5 rounded-xl border border-stone-200 dark:border-plum-800 bg-white dark:bg-plum-850 hover:bg-brand-50/70 dark:hover:bg-plum-800 active:scale-95 text-stone-600 dark:text-stone-300 hover:text-brand-600 dark:hover:text-brand-300 shadow-2xs transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              >
                <Info className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Sobre</span>
              </button>
            )}

            <button
              id="refresh-weather-btn-desktop"
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Atualizar previsão agora"
              className="p-2.5 rounded-xl border border-stone-200 dark:border-plum-800 bg-white dark:bg-plum-850 hover:bg-brand-50/70 dark:hover:bg-plum-800 active:scale-95 text-stone-600 dark:text-stone-300 hover:text-brand-600 dark:hover:text-brand-300 shadow-2xs transition-all cursor-pointer"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-brand-600 dark:text-brand-400' : ''}`}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

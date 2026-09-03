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
    <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-3.5">
          {/* Brand & Live status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Favicon-matching Brand Icon */}
              <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-md shadow-blue-500/20 shrink-0 border border-blue-400/30 flex items-center justify-center bg-blue-600">
                <img
                  src="/favicon.svg"
                  alt="Previsão do Tempo Agora"
                  className="w-full h-full object-contain p-0.5"
                />
              </div>

              <div>
                <h1 className="text-base sm:text-lg lg:text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                  PREVISÃO DO TEMPO <span className="text-blue-600 dark:text-blue-400">AGORA</span>
                </h1>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
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
                className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 text-xs cursor-pointer shadow-2xs"
              >
                {themeMode === 'auto' ? (
                  <>
                    <Laptop className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span className="text-[10px] font-bold">Auto</span>
                  </>
                ) : themeMode === 'light' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[10px] font-bold">Claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[10px] font-bold">Escuro</span>
                  </>
                )}
              </button>

              {onOpenInstitutional && (
                <button
                  id="info-institutional-btn-mobile"
                  onClick={() => onOpenInstitutional('about')}
                  title="Sobre a plataforma e fontes de dados"
                  className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Info className="w-4 h-4" />
                </button>
              )}

              <button
                id="refresh-weather-btn-mobile"
                onClick={onRefresh}
                disabled={isRefreshing}
                title="Atualizar previsão agora"
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`}
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
              <div className="text-[11px] text-slate-400 dark:text-slate-500 mr-1">
                <span>Atualizado:</span>{' '}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {lastUpdated.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )}

            {/* Dark/Light/Auto Mode Segmented Switcher */}
            <div
              className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold shadow-2xs"
              id="theme-segmented-control-desktop"
            >
              <button
                type="button"
                onClick={() => onSelectThemeMode('auto')}
                title="Modo Automático (Segue o tema do seu dispositivo)"
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
                  themeMode === 'auto'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-black shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
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
                    ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 font-black shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
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
                    ? 'bg-white dark:bg-slate-700 text-indigo-400 font-black shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
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
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 text-slate-600 dark:text-slate-300 hover:text-blue-600 shadow-2xs transition-all flex items-center gap-1.5 text-xs font-semibold"
              >
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Sobre</span>
              </button>
            )}

            <button
              id="refresh-weather-btn-desktop"
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Atualizar previsão agora"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 text-slate-600 dark:text-slate-300 hover:text-blue-600 shadow-2xs transition-all"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

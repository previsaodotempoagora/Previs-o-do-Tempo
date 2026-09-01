import React from 'react';
import { CloudSun, RefreshCw, Info } from 'lucide-react';
import { CitySearch } from './CitySearch';
import { LocationData } from '../types';

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
  onOpenInstitutional
}) => {
  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3.5">
          {/* Brand & Live status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 text-white shrink-0">
                <CloudSun className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg lg:text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                  PREVISÃO DO TEMPO <span className="text-blue-600">AGORA</span>
                </h1>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[11px] font-medium text-slate-500">
                    Tempo Real • Todo o Brasil
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Actions: Info & Refresh */}
            <div className="flex md:hidden items-center gap-1">
              {onOpenInstitutional && (
                <button
                  id="info-institutional-btn-mobile"
                  onClick={() => onOpenInstitutional('about')}
                  title="Sobre a plataforma e privacidade"
                  className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                >
                  <Info className="w-4 h-4" />
                </button>
              )}
              <button
                id="refresh-weather-btn-mobile"
                onClick={onRefresh}
                disabled={isRefreshing}
                title="Atualizar previsão agora"
                className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
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

          {/* Desktop Refresh & Timestamp */}
          <div className="hidden md:flex items-center gap-3 text-right">
            {lastUpdated && (
              <div className="text-[11px] text-slate-400">
                <span>Atualizado:</span>{' '}
                <span className="font-semibold text-slate-700">
                  {lastUpdated.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )}

            {onOpenInstitutional && (
              <button
                id="info-institutional-btn-desktop"
                onClick={() => onOpenInstitutional('about')}
                title="Sobre a plataforma e fontes de dados"
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 text-slate-600 hover:text-blue-600 shadow-2xs transition-all flex items-center gap-1.5 text-xs font-semibold"
              >
                <Info className="w-4 h-4 text-blue-600" />
                <span>Sobre</span>
              </button>
            )}

            <button
              id="refresh-weather-btn-desktop"
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Atualizar previsão agora"
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 text-slate-600 hover:text-blue-600 shadow-sm transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};


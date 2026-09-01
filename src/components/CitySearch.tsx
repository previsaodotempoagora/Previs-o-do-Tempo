import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2, Navigation, Star, History } from 'lucide-react';
import { LocationData } from '../types';
import { searchCities } from '../services/weatherApi';
import { BRAZIL_CAPITALS } from '../data/brazilCities';

interface CitySearchProps {
  currentLocation: LocationData;
  onSelectCity: (location: LocationData) => void;
  onUseGps: () => void;
  isGpsLoading: boolean;
  favorites: LocationData[];
  onToggleFavorite: (location: LocationData) => void;
}

export const CitySearch: React.FC<CitySearchProps> = ({
  currentLocation,
  onSelectCity,
  onUseGps,
  isGpsLoading,
  favorites,
  onToggleFavorite
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<LocationData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('previsao_tempo_recent');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveRecentSearch = (city: LocationData) => {
    try {
      const updated = [city, ...recentSearches.filter((c) => c.id !== city.id)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('previsao_tempo_recent', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await searchCities(query);
        setResults(res);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city: LocationData) => {
    saveRecentSearch(city);
    onSelectCity(city);
    setQuery('');
    setIsOpen(false);
  };

  const isCurrentFavorite = favorites.some((f) => f.id === currentLocation.id || (Math.abs(f.lat - currentLocation.lat) < 0.05 && Math.abs(f.lon - currentLocation.lon) < 0.05));

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto" id="city-search-container">
      <div className="flex items-center gap-2">
        {/* Search input bar */}
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </div>
          <input
            id="city-search-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Buscar qualquer cidade do Brasil (ex: São Paulo, Rio, Curitiba)..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white"
          />
          {query && (
            <button
              id="clear-search-btn"
              onClick={() => {
                setQuery('');
                setResults([]);
              }}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* GPS location button */}
        <button
          id="gps-location-btn"
          onClick={onUseGps}
          disabled={isGpsLoading}
          title="Detectar minha localização atual"
          className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white hover:bg-slate-50 active:scale-95 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-xs hover:text-blue-600 hover:border-slate-300 transition-all whitespace-nowrap"
        >
          {isGpsLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          ) : (
            <Navigation className="w-4 h-4 text-blue-600" />
          )}
          <span className="hidden sm:inline">GPS</span>
        </button>

        {/* Favorite toggle button */}
        <button
          id="toggle-favorite-btn"
          onClick={() => onToggleFavorite(currentLocation)}
          title={isCurrentFavorite ? 'Remover dos favoritos' : 'Salvar cidade nos favoritos'}
          className={`p-2.5 border rounded-xl shadow-xs transition-all active:scale-95 ${
            isCurrentFavorite
              ? 'bg-amber-50 border-amber-300 text-amber-500 hover:bg-amber-100'
              : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500 hover:bg-slate-50'
          }`}
        >
          <Star className={`w-4 h-4 ${isCurrentFavorite ? 'fill-amber-400' : ''}`} />
        </button>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div
          id="search-dropdown-results"
          className="absolute z-50 left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden max-h-[380px] overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {query.trim().length > 0 ? (
            <div>
              <div className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 border-b border-slate-100">
                Resultados da busca ({results.length})
              </div>
              {results.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {results.map((city) => (
                    <button
                      key={city.id || `${city.lat}-${city.lon}`}
                      onClick={() => handleSelect(city)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-blue-50/70 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
                        <div>
                          <span className="font-semibold text-sm text-slate-800 group-hover:text-blue-950">
                            {city.name}
                          </span>
                          {city.state && (
                            <span className="text-xs text-slate-500 ml-1.5">
                              - {city.state}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-800 shrink-0">
                        {city.stateCode || 'BR'}
                      </span>
                    </button>
                  ))}
                </div>
              ) : !isLoading ? (
                <div className="p-6 text-center text-sm text-slate-500">
                  Nenhuma cidade encontrada para &quot;{query}&quot;. Tente o nome sem acento ou verifique a ortografia.
                </div>
              ) : null}
            </div>
          ) : (
            <div className="p-2 space-y-3">
              {/* Favorites if any */}
              {favorites.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-600">
                    <Star className="w-3 h-3 fill-amber-500" />
                    Cidades Favoritas
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1">
                    {favorites.map((fav) => (
                      <button
                        key={fav.id}
                        onClick={() => handleSelect(fav)}
                        className="px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-900 rounded-xl transition-colors flex items-center justify-between"
                      >
                        <span>{fav.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{fav.stateCode}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <History className="w-3 h-3" />
                    Buscadas Recentemente
                  </div>
                  <div className="space-y-0.5 mt-1">
                    {recentSearches.map((rec) => (
                      <button
                        key={rec.id}
                        onClick={() => handleSelect(rec)}
                        className="w-full px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors flex items-center justify-between"
                      >
                        <span className="font-medium">{rec.name}</span>
                        <span className="text-[11px] text-slate-400">{rec.stateCode || rec.state}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Top Capitals */}
              <div>
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Capitais em Destaque
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 mt-1">
                  {BRAZIL_CAPITALS.slice(0, 9).map((cap) => (
                    <button
                      key={cap.id}
                      onClick={() => handleSelect(cap)}
                      className="px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-800 rounded-xl transition-colors flex items-center justify-between"
                    >
                      <span className="truncate">{cap.name}</span>
                      <span className="text-[10px] font-bold text-slate-400 ml-1">{cap.stateCode}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

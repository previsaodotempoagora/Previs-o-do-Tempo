import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2, Navigation, Star, History } from 'lucide-react';
import { LocationData } from '../types';
import { searchCities } from '../services/weatherApi';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const wasOpenOnMouseDown = useRef(false);

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

  // Escape key closes search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleMouseDown = () => {
    // Record if it was already open before this mouse click
    wasOpenOnMouseDown.current = isOpen;
  };

  const handleInputClick = () => {
    // If it was already open before clicking, this second click closes it!
    if (wasOpenOnMouseDown.current) {
      setIsOpen(false);
      inputRef.current?.blur();
    } else {
      setIsOpen(true);
    }
  };

  const handleToggleSearch = () => {
    if (isOpen) {
      setIsOpen(false);
      inputRef.current?.blur();
    } else {
      setIsOpen(true);
      inputRef.current?.focus();
    }
  };

  const handleSelect = (city: LocationData) => {
    saveRecentSearch(city);
    onSelectCity(city);
    setIsOpen(false);
    setQuery('');
  };

  const isCurrentFavorite = favorites.some(
    (f) =>
      f.id === currentLocation.id ||
      (Math.abs(f.lat - currentLocation.lat) < 0.05 && Math.abs(f.lon - currentLocation.lon) < 0.05)
  );

  return (
    <div ref={containerRef} className="relative w-full" id="city-search-box">
      <div className="flex items-center gap-2">
        {/* Search input field with 2nd click toggle */}
        <div className="relative flex-1">
          <button
            type="button"
            id="toggle-search-icon-btn"
            onClick={handleToggleSearch}
            title={isOpen ? 'Fechar pesquisa' : 'Abrir pesquisa'}
            className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors z-10 cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-600 dark:text-blue-400" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </button>

          <input
            ref={inputRef}
            id="city-search-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onMouseDown={handleMouseDown}
            onClick={handleInputClick}
            placeholder="Buscar qualquer cidade do Brasil..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-2xs transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-800"
          />

          {query ? (
            <button
              id="clear-search-btn"
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
                inputRef.current?.focus();
              }}
              title="Limpar busca"
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 z-10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : isOpen ? (
            <button
              id="close-search-btn"
              type="button"
              onClick={() => {
                setIsOpen(false);
                inputRef.current?.blur();
              }}
              title="Fechar pesquisa"
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors z-10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
        </div>

        {/* GPS location button */}
        <button
          id="gps-location-btn"
          onClick={onUseGps}
          disabled={isGpsLoading}
          title="Detectar minha localização atual via GPS ou Provedor"
          className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 active:scale-95 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 shadow-2xs hover:text-blue-600 dark:hover:text-blue-400 transition-all whitespace-nowrap cursor-pointer"
        >
          {isGpsLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-blue-600 dark:text-blue-400" />
          ) : (
            <Navigation className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          )}
          <span className="hidden sm:inline">GPS</span>
        </button>

        {/* Favorite toggle button */}
        <button
          id="toggle-favorite-btn"
          onClick={() => onToggleFavorite(currentLocation)}
          title={isCurrentFavorite ? 'Remover dos favoritos' : 'Salvar cidade nos favoritos'}
          className={`p-2.5 border rounded-xl shadow-2xs transition-all active:scale-95 cursor-pointer ${
            isCurrentFavorite
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-500 hover:bg-amber-100'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          <Star className={`w-4 h-4 ${isCurrentFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
        </button>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div
          id="search-dropdown-results"
          className="absolute z-50 left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden max-h-[380px] overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Quick bar with Close button */}
          <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
            <span className="font-medium">{query ? `Resultados (${results.length})` : 'Pesquisa de Cidades'}</span>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                inputRef.current?.blur();
              }}
              className="text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-semibold cursor-pointer"
            >
              Fechar (Esc)
            </button>
          </div>

          {query.trim().length > 0 ? (
            <div>
              {results.length > 0 ? (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {results.map((city) => (
                    <button
                      key={city.id || `${city.lat}-${city.lon}`}
                      onClick={() => handleSelect(city)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-blue-50/70 dark:hover:bg-slate-800 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors shrink-0" />
                        <div>
                          <span className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {city.name}
                          </span>
                          {city.state && (
                            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1.5">
                              - {city.state}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-950 group-hover:text-blue-800 dark:group-hover:text-blue-300 shrink-0">
                        {city.stateCode || 'BR'}
                      </span>
                    </button>
                  ))}
                </div>
              ) : !isLoading ? (
                <div className="p-6 text-center text-sm text-slate-500 dark:text-slate-400">
                  Nenhuma cidade encontrada para &quot;{query}&quot;. Tente sem acento ou verifique a ortografia.
                </div>
              ) : null}
            </div>
          ) : (
            <div className="p-2 space-y-3">
              {/* Favorites if any */}
              {favorites.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    <Star className="w-3 h-3 fill-amber-500" />
                    Cidades Favoritas
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1">
                    {favorites.map((fav) => (
                      <div
                        key={fav.id}
                        className="group flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-950/30 rounded-xl transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => handleSelect(fav)}
                          className="flex-1 text-left flex items-center justify-between pr-2 cursor-pointer"
                        >
                          <span className="truncate">{fav.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{fav.stateCode}</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(fav);
                          }}
                          title={`Remover ${fav.name} dos favoritos`}
                          className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <History className="w-3 h-3" />
                    Buscadas Recentemente
                  </div>
                  <div className="space-y-0.5 mt-1">
                    {recentSearches.map((rec) => (
                      <button
                        key={rec.id}
                        onClick={() => handleSelect(rec)}
                        className="w-full px-3 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span className="font-medium">{rec.name}</span>
                        <span className="text-[11px] text-slate-400">{rec.stateCode || rec.state}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* If no favorites and no recent searches */}
              {favorites.length === 0 && recentSearches.length === 0 && (
                <div className="py-6 px-4 text-center">
                  <Search className="w-6 h-6 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Digite o nome de qualquer cidade ou estado
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                    Ex: Campinas, Niterói, Uberlândia, Caxias do Sul, Londrina...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

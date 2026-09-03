import React from 'react';
import { Star, X, Plus } from 'lucide-react';
import { LocationData } from '../types';

interface FavoritesBarProps {
  currentLocation: LocationData;
  favorites: LocationData[];
  onSelectCity: (location: LocationData) => void;
  onRemoveFavorite: (location: LocationData) => void;
  onAddFavorite?: (location: LocationData) => void;
}

export const FavoritesBar: React.FC<FavoritesBarProps> = ({
  currentLocation,
  favorites,
  onSelectCity,
  onRemoveFavorite,
  onAddFavorite
}) => {
  const isCurrentFavorited = favorites.some(
    (f) =>
      f.id === currentLocation.id ||
      f.name.toLowerCase() === currentLocation.name.toLowerCase() ||
      (Math.abs(f.lat - currentLocation.lat) < 0.05 && Math.abs(f.lon - currentLocation.lon) < 0.05)
  );

  return (
    <div
      className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5"
      id="favorites-bar-section"
    >
      <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 shrink-0">
        <Star className="w-3 h-3 text-amber-500 fill-amber-400 shrink-0" />
        <span>Favoritas:</span>
      </div>

      {favorites.length === 0 ? (
        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <span className="text-[11px]">Nenhuma salva</span>
          {onAddFavorite && !isCurrentFavorited && (
            <button
              type="button"
              onClick={() => onAddFavorite(currentLocation)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              Salvar {currentLocation.name}
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-1.5 flex-nowrap">
          {favorites.map((city, idx) => {
            const isSelected =
              currentLocation.name.toLowerCase() === city.name.toLowerCase() ||
              (Math.abs(currentLocation.lat - city.lat) < 0.05 &&
                Math.abs(currentLocation.lon - city.lon) < 0.05);

            return (
              <div
                key={`fav-bar-${city.id || city.name}-${idx}`}
                className={`inline-flex items-center rounded-full text-xs font-medium transition-all group shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/70 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectCity(city)}
                  className="inline-flex items-center gap-1.5 pl-2.5 pr-1 py-1 cursor-pointer select-none"
                  title={`Ver previsão de ${city.name}`}
                >
                  <span className="truncate max-w-[100px] sm:max-w-[130px]">{city.name}</span>
                  {city.stateCode && (
                    <span
                      className={`text-[9px] font-mono font-bold px-1 rounded ${
                        isSelected
                          ? 'bg-blue-700 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {city.stateCode}
                    </span>
                  )}
                </button>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFavorite(city);
                  }}
                  title={`Remover ${city.name} dos favoritos`}
                  className={`p-1 mr-1 rounded-full transition-colors cursor-pointer ${
                    isSelected
                      ? 'hover:bg-blue-700/80 text-blue-200 hover:text-white'
                      : 'hover:bg-rose-100 dark:hover:bg-rose-950/60 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400'
                  }`}
                  aria-label={`Remover ${city.name} dos favoritos`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

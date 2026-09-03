import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { LocationData } from '../types';
import { BRAZIL_CAPITALS } from '../data/brazilCities';

interface FavoritesBarProps {
  currentLocation: LocationData;
  favorites: LocationData[];
  onSelectCity: (location: LocationData) => void;
}

export const FavoritesBar: React.FC<FavoritesBarProps> = ({
  currentLocation,
  favorites,
  onSelectCity
}) => {
  // Always guarantee 3 favorite cities (use SP, RJ, DF if user has fewer than 3)
  const defaultFallbacks = [BRAZIL_CAPITALS[0], BRAZIL_CAPITALS[1], BRAZIL_CAPITALS[2]];
  const displayFavorites: LocationData[] = [];

  for (const fav of favorites) {
    if (displayFavorites.length < 4 && !displayFavorites.some((f) => f.id === fav.id)) {
      displayFavorites.push(fav);
    }
  }

  for (const fallback of defaultFallbacks) {
    if (
      displayFavorites.length < 3 &&
      !displayFavorites.some(
        (f) =>
          f.id === fallback.id ||
          (Math.abs(f.lat - fallback.lat) < 0.05 && Math.abs(f.lon - fallback.lon) < 0.05)
      )
    ) {
      displayFavorites.push(fallback);
    }
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5" id="favorites-bar-section">
      <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 shrink-0">
        <Star className="w-3 h-3 text-amber-500 fill-amber-400 shrink-0" />
        <span>Favoritas:</span>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
        {displayFavorites.map((city, idx) => {
          const isSelected =
            currentLocation.name.toLowerCase() === city.name.toLowerCase() ||
            (Math.abs(currentLocation.lat - city.lat) < 0.05 &&
              Math.abs(currentLocation.lon - city.lon) < 0.05);

          return (
            <button
              key={`fav-bar-${city.id || city.name}-${idx}`}
              type="button"
              onClick={() => onSelectCity(city)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white font-bold shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/70 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300'
              }`}
            >
              <span className="truncate max-w-[110px]">{city.name}</span>
              {city.stateCode && (
                <span
                  className={`text-[9px] font-mono font-bold px-1 rounded ${
                    isSelected
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-200/70 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {city.stateCode}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { LocationData } from '../types';
import { BRAZIL_CAPITALS } from '../data/brazilCities';

interface CapitalChipsProps {
  currentLocation: LocationData;
  onSelectCity: (location: LocationData) => void;
}

export const CapitalChips: React.FC<CapitalChipsProps> = ({ currentLocation, onSelectCity }) => {
  return (
    <div className="w-full overflow-hidden py-2" id="capitals-quick-chips">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 px-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap pl-1 pr-1">
          Capitais:
        </span>
        {BRAZIL_CAPITALS.map((capital) => {
          const isSelected =
            currentLocation.name.toLowerCase() === capital.name.toLowerCase() ||
            (Math.abs(currentLocation.lat - capital.lat) < 0.05 && Math.abs(currentLocation.lon - capital.lon) < 0.05);

          return (
            <button
              key={capital.id}
              onClick={() => onSelectCity(capital)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs'
              }`}
            >
              {capital.name} <span className={`text-[10px] font-mono ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>{capital.stateCode}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

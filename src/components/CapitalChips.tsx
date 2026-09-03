import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MapPin, Check, Building2 } from 'lucide-react';
import { LocationData } from '../types';
import { BRAZIL_CAPITALS, OTHER_POPULAR_CITIES, ALL_PRESET_CITIES } from '../data/brazilCities';

interface CapitalChipsProps {
  currentLocation: LocationData;
  onSelectCity: (location: LocationData) => void;
}

export const CapitalChips: React.FC<CapitalChipsProps> = ({ currentLocation, onSelectCity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'capitals' | 'popular' | 'all'>('capitals');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Check if current location matches any preset city
  const activePreset = ALL_PRESET_CITIES.find(
    (c) =>
      c.name.toLowerCase() === currentLocation.name.toLowerCase() ||
      (Math.abs(c.lat - currentLocation.lat) < 0.05 && Math.abs(c.lon - currentLocation.lon) < 0.05)
  );

  const handleSelect = (city: LocationData) => {
    onSelectCity(city);
    setIsOpen(false);
  };

  const currentList =
    activeTab === 'capitals'
      ? BRAZIL_CAPITALS
      : activeTab === 'popular'
      ? OTHER_POPULAR_CITIES
      : ALL_PRESET_CITIES;

  return (
    <div className="relative shrink-0" ref={dropdownRef} id="cities-dropdown-section">
      {/* Discreet Trigger Button beside favorites */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        id="cities-dropdown-trigger"
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all border cursor-pointer select-none shadow-2xs ${
          isOpen || activePreset
            ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold'
            : 'bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
        }`}
        title="Ver lista de todas as cidades e capitais"
      >
        <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
        <span className="truncate max-w-[130px]">
          {activePreset ? activePreset.name : 'Cidades'}
        </span>
        {activePreset?.stateCode && (
          <span className="text-[9px] font-mono font-bold px-1 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
            {activePreset.stateCode}
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
          }`}
        />
      </button>

      {/* Floating Dropdown Menu - Lists all cities without search */}
      {isOpen && (
        <div
          role="listbox"
          id="cities-dropdown-menu"
          className="absolute right-0 sm:left-0 sm:right-auto mt-1.5 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 transition-colors"
        >
          {/* Header & Tabs */}
          <div className="p-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-850">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Cidades do Brasil
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                {currentList.length} opções
              </span>
            </div>

            {/* Quick Section Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-slate-200/70 dark:bg-slate-800 p-0.5 rounded-xl text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('capitals')}
                className={`py-1 rounded-lg transition-all text-center cursor-pointer ${
                  activeTab === 'capitals'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Capitais (27)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('popular')}
                className={`py-1 rounded-lg transition-all text-center cursor-pointer ${
                  activeTab === 'popular'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Interior
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`py-1 rounded-lg transition-all text-center cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Todas ({ALL_PRESET_CITIES.length})
              </button>
            </div>
          </div>

          {/* Cities List (Full direct scrollable list, no search) */}
          <div className="max-h-72 overflow-y-auto p-1.5 divide-y divide-slate-100 dark:divide-slate-800/50 custom-scrollbar">
            {currentList.map((city) => {
              const isSelected =
                currentLocation.name.toLowerCase() === city.name.toLowerCase() ||
                (Math.abs(currentLocation.lat - city.lat) < 0.05 &&
                  Math.abs(currentLocation.lon - city.lon) < 0.05);

              return (
                <button
                  key={`city-item-${city.id}`}
                  type="button"
                  onClick={() => handleSelect(city)}
                  role="option"
                  aria-selected={isSelected}
                  className={`w-full px-3 py-2 text-left rounded-xl text-xs font-medium transition-colors flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-bold'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <MapPin
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isSelected
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                      }`}
                    />
                    <span className="truncate">{city.name}</span>
                    {city.isCapital && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
                        Capital
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected
                          ? 'bg-blue-200/80 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {city.stateCode || 'BR'}
                    </span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

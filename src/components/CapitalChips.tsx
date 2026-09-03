import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Landmark, Search, Check } from 'lucide-react';
import { LocationData } from '../types';
import { BRAZIL_CAPITALS, normalizeCityName } from '../data/brazilCities';

interface CapitalChipsProps {
  currentLocation: LocationData;
  onSelectCity: (location: LocationData) => void;
}

export const CapitalChips: React.FC<CapitalChipsProps> = ({ currentLocation, onSelectCity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setFilterQuery('');
    }
  }, [isOpen]);

  // Check if the current location is one of the 27 capitals
  const activeCapital = BRAZIL_CAPITALS.find(
    (c) =>
      c.name.toLowerCase() === currentLocation.name.toLowerCase() ||
      (Math.abs(c.lat - currentLocation.lat) < 0.05 && Math.abs(c.lon - currentLocation.lon) < 0.05)
  );

  // Filtered list of capitals based on user query
  const filteredCapitals = BRAZIL_CAPITALS.filter((cap) => {
    if (!filterQuery.trim()) return true;
    const query = normalizeCityName(filterQuery);
    return (
      normalizeCityName(cap.name).includes(query) ||
      normalizeCityName(cap.stateCode || '').includes(query) ||
      normalizeCityName(cap.state || '').includes(query)
    );
  });

  const handleSelect = (capital: LocationData) => {
    onSelectCity(capital);
    setIsOpen(false);
  };

  return (
    <div className="relative shrink-0" ref={dropdownRef} id="capitals-dropdown-section">
      {/* Discreet Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        id="capitals-dropdown-trigger"
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all border cursor-pointer select-none shadow-2xs ${
          isOpen || activeCapital
            ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold'
            : 'bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
        }`}
        title="Ver todas as 27 capitais do Brasil"
      >
        <Landmark className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
        <span className="truncate max-w-[120px]">
          {activeCapital ? activeCapital.name : 'Capitais'}
        </span>
        {activeCapital?.stateCode && (
          <span className="text-[9px] font-mono font-bold px-1 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
            {activeCapital.stateCode}
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
          }`}
        />
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          id="capitals-dropdown-menu"
          className="absolute right-0 sm:left-0 sm:right-auto mt-1.5 w-64 sm:w-72 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 transition-colors"
        >
          {/* Header & Quick Filter Input */}
          <div className="p-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850">
            <div className="flex items-center justify-between px-1 mb-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                27 Capitais do Brasil
              </span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                {filteredCapitals.length} cidades
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filtrar capital..."
                className="w-full pl-8 pr-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Capitals List (Scrollable) */}
          <div className="max-h-60 overflow-y-auto p-1.5 divide-y divide-slate-50 dark:divide-slate-800/40 custom-scrollbar">
            {filteredCapitals.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400 dark:text-slate-500">
                Nenhuma capital encontrada
              </div>
            ) : (
              filteredCapitals.map((capital) => {
                const isSelected =
                  currentLocation.name.toLowerCase() === capital.name.toLowerCase() ||
                  (Math.abs(currentLocation.lat - capital.lat) < 0.05 &&
                    Math.abs(currentLocation.lon - capital.lon) < 0.05);

                return (
                  <button
                    key={`cap-dropdown-${capital.id}`}
                    type="button"
                    onClick={() => handleSelect(capital)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="truncate">{capital.name}</span>
                      {capital.stateCode && (
                        <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0 font-medium">
                          {capital.stateCode}
                        </span>
                      )}
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 ml-1.5" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Map, ExternalLink } from 'lucide-react';
import { LocationData } from '../types';
import { BRAZIL_CAPITALS } from '../data/brazilCities';

interface BrazilRegionsOverviewProps {
  currentLocation: LocationData;
  onSelectCity: (location: LocationData) => void;
}

const REGIONS = [
  {
    name: 'Sudeste',
    codes: ['SP', 'RJ', 'MG', 'ES']
  },
  {
    name: 'Sul',
    codes: ['PR', 'SC', 'RS']
  },
  {
    name: 'Nordeste',
    codes: ['BA', 'CE', 'PE', 'RN', 'PB', 'AL', 'SE', 'PI', 'MA']
  },
  {
    name: 'Centro-Oeste',
    codes: ['DF', 'GO', 'MT', 'MS']
  },
  {
    name: 'Norte',
    codes: ['AM', 'PA', 'RO', 'AC', 'RR', 'AP', 'TO']
  }
];

export const BrazilRegionsOverview: React.FC<BrazilRegionsOverviewProps> = ({
  currentLocation,
  onSelectCity
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 transition-colors" id="brazil-regions-section">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/60">
          <Map className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
            Navegar por Regiões do Brasil
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Selecione uma capital para ver a previsão detalhada imediatamente
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {REGIONS.map((region) => {
          const regionCapitals = BRAZIL_CAPITALS.filter((c) => region.codes.includes(c.stateCode || ''));

          return (
            <div
              key={region.name}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  {region.name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  {regionCapitals.length} capitais
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {regionCapitals.map((cap) => {
                  const isSelected =
                    currentLocation.name.toLowerCase() === cap.name.toLowerCase();

                  return (
                    <button
                      key={cap.id}
                      onClick={() => onSelectCity(cap)}
                      className={`text-xs px-2.5 py-1 rounded-xl font-semibold transition-all active:scale-95 flex items-center gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-blue-300 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs'
                      }`}
                    >
                      <span>{cap.name}</span>
                      <span className={`text-[10px] font-mono ${isSelected ? 'text-blue-200' : 'text-slate-400 dark:text-slate-400'}`}>
                        {cap.stateCode}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

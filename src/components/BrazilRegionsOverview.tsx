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
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6" id="brazil-regions-section">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
          <Map className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
            Navegar por Regiões do Brasil
          </h3>
          <p className="text-xs text-slate-500 font-medium">
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
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  {region.name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-600">
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
                      className={`text-xs px-2.5 py-1 rounded-xl font-semibold transition-all active:scale-95 flex items-center gap-1 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 shadow-xs'
                      }`}
                    >
                      <span>{cap.name}</span>
                      <span className={`text-[10px] font-mono ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
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

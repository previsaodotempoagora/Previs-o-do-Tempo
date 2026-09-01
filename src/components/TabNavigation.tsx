import React from 'react';
import { Calendar, Clock, CalendarDays } from 'lucide-react';
import { ForecastTab } from '../types';

interface TabNavigationProps {
  activeTab: ForecastTab;
  onChangeTab: (tab: ForecastTab) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onChangeTab }) => {
  const tabs: { id: ForecastTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'today',
      label: 'Hoje',
      icon: <Clock className="w-4 h-4" />,
      badge: 'Tempo Real'
    },
    {
      id: '7days',
      label: 'Próximos 7 Dias',
      icon: <Calendar className="w-4 h-4" />,
      badge: 'Semanal'
    },
    {
      id: '15days',
      label: 'Previsão 15 Dias',
      icon: <CalendarDays className="w-4 h-4" />,
      badge: 'Estendida'
    }
  ];

  return (
    <div className="w-full bg-slate-100 p-1.5 rounded-2xl flex items-center justify-between gap-1.5 border border-slate-200" id="forecast-tab-navigation">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`tab-btn-${tab.id}`}
            onClick={() => onChangeTab(tab.id)}
            className={`relative flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
              isActive
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>
              {tab.icon}
            </span>
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={`hidden md:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-blue-50 text-blue-700 font-bold' : 'bg-slate-200/80 text-slate-600'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

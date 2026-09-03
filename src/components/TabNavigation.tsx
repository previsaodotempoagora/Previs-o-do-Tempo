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
    <div
      className="w-full bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl flex items-center justify-between gap-1.5 border border-slate-200 dark:border-slate-700 transition-colors"
      id="forecast-tab-navigation"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`tab-btn-${tab.id}`}
            onClick={() => onChangeTab(tab.id)}
            className={`relative flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'
            }`}
          >
            <span
              className={
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
              }
            >
              {tab.icon}
            </span>
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={`hidden md:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                    : 'bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
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

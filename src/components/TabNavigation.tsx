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
      className="w-full bg-stone-100 dark:bg-plum-850 p-1.5 rounded-2xl flex items-center justify-between gap-1.5 border border-stone-200/90 dark:border-plum-800 transition-colors"
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
                ? 'bg-white dark:bg-plum-900 text-brand-600 dark:text-brand-300 shadow-sm border border-brand-200/70 dark:border-brand-800/50'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-plum-800/60'
            }`}
          >
            <span
              className={
                isActive ? 'text-brand-600 dark:text-brand-400' : 'text-stone-400 dark:text-stone-500'
              }
            >
              {tab.icon}
            </span>
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={`hidden md:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300'
                    : 'bg-stone-200/80 dark:bg-plum-800 text-stone-600 dark:text-stone-300'
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

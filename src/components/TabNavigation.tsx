import React from 'react';
import { Calendar, Clock, CalendarDays, BookOpen } from 'lucide-react';
import { ForecastTab } from '../types';

interface TabNavigationProps {
  activeTab: ForecastTab;
  onChangeTab: (tab: ForecastTab) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onChangeTab }) => {
  const tabs: { id: ForecastTab; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    {
      id: 'today',
      label: 'Hoje',
      shortLabel: 'Hoje',
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: '7days',
      label: 'Próximos 7 Dias',
      shortLabel: '7 Dias',
      icon: <Calendar className="w-4 h-4" />
    },
    {
      id: '15days',
      label: 'Previsão 15 Dias',
      shortLabel: '15 Dias',
      icon: <CalendarDays className="w-4 h-4" />
    },
    {
      id: 'blog',
      label: 'Blog & Guias',
      shortLabel: 'Blog & Guias',
      icon: <BookOpen className="w-4 h-4" />
    }
  ];

  return (
    <nav
      aria-label="Navegação principal de previsão e guias"
      className="w-full bg-stone-100 dark:bg-plum-850 p-1.5 rounded-2xl grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-1.5 border border-stone-200/90 dark:border-plum-800 transition-colors"
      id="forecast-tab-navigation"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`tab-btn-${tab.id}`}
            onClick={() => onChangeTab(tab.id)}
            className={`relative sm:flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer whitespace-nowrap ${
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
            <span className="sm:hidden">{tab.shortLabel}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

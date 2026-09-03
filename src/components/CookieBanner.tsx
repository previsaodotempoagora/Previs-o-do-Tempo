import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface CookieBannerProps {
  onOpenPrivacy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem('previsaodotempo_cookie_accepted');
      if (!accepted) {
        // Show after a tiny delay for natural presentation
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('previsaodotempo_cookie_accepted', 'true');
    } catch (e) {
      // localStorage may fail in private mode
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-4.5 animate-in slide-in-from-bottom-5 duration-300 transition-colors"
      id="lgpd-cookie-consent-banner"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 border border-blue-100 dark:border-blue-900/60">
          <ShieldCheck className="w-5 h-5" />
        </div>

        <div className="flex-1 text-xs text-slate-600 dark:text-slate-300 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">
              Privacidade & Uso de Cookies
            </h4>
            <button
              onClick={handleAccept}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
              title="Dispensar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="leading-relaxed text-[11px] text-slate-600 dark:text-slate-300">
            Utilizamos cookies e tecnologias similares para melhorar sua experiência, salvar preferências de cidades e exibir anúncios personalizados em conformidade com a <strong>LGPD</strong> e as diretrizes do Google AdSense.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAccept}
              id="accept-cookies-btn"
              className="flex-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-[11px] font-bold rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Aceitar e Continuar
            </button>
            <button
              onClick={onOpenPrivacy}
              id="privacy-details-btn"
              className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-semibold rounded-xl transition-all cursor-pointer"
            >
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';

interface AdSenseSlotProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  slotId = '0000000000',
  format = 'auto',
  className = ''
}) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      // AdSense script will run when active
    }
  }, []);

  return (
    <div className={`w-full flex flex-col items-center my-4 ${className}`} id={`adsense-wrapper-${slotId}`}>
      {/* Official AdSense label mandatory by policy */}
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
        Publicidade
      </span>

      {/* Ad container */}
      <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl min-h-[90px] flex items-center justify-center p-3 text-center overflow-hidden">
        {/* Real AdSense tag */}
        <ins
          className="adsbygoogle block w-full text-center"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />

        {/* Fallback clean placeholder banner */}
        <div className="flex flex-col items-center justify-center text-slate-400 text-xs py-2">
          <span className="font-semibold text-slate-500 text-[11px]">
            Espaço Reservado para Anúncios do Google AdSense
          </span>
          <span className="text-[10px] text-slate-400">
            Formato Responsivo • Alta Relevância
          </span>
        </div>
      </div>
    </div>
  );
};

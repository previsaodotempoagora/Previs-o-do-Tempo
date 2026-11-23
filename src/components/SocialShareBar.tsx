import React, { useState } from 'react';
import { Check, Link2, Share2 } from 'lucide-react';

interface SocialShareBarProps {
  title: string;
  summary: string;
  slug: string;
  variant?: 'compact' | 'full';
}

export const SocialShareBar: React.FC<SocialShareBarProps> = ({
  title,
  summary,
  slug,
  variant = 'full'
}) => {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
      ? `https://www.previsaodotempoagora.com.br/blog/${slug}`
      : typeof window !== 'undefined'
      ? `${window.location.origin}/blog/${slug}`
      : `https://www.previsaodotempoagora.com.br/blog/${slug}`;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedWhatsApp = encodeURIComponent(`${title}\n\n${summary}\n\nLeia o guia completo: ${shareUrl}`);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // ignore clipboard errors
    }
  };

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, text: summary, url: shareUrl });
      } else {
        await handleCopy();
      }
    } catch {
      // cancelled
    }
  };

  const networks = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodedWhatsApp}`,
      hoverClasses: 'hover:bg-[#25D366]/12 hover:border-[#25D366]/50 hover:text-[#128C7E] dark:hover:text-[#4ade80]',
      logo: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true" fill="none">
          <circle cx="12" cy="12" r="11" fill="#25D366" />
          <path
            d="M17.1 14.3c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z"
            fill="#FFFFFF"
          />
        </svg>
      )
    },
    {
      id: 'facebook',
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      hoverClasses: 'hover:bg-[#1877F2]/10 hover:border-[#1877F2]/45 hover:text-[#1877F2] dark:hover:text-[#60a5fa]',
      logo: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true" fill="none">
          <circle cx="12" cy="12" r="11" fill="#1877F2" />
          <path
            d="M15.1 12.7l.4-2.6h-2.5V8.4c0-.7.35-1.4 1.48-1.4h1.14V4.8s-1.04-.18-2.03-.18c-2.07 0-3.42 1.25-3.42 3.52v1.96H7.9v2.6h2.27v6.3h2.83v-6.3h2.1Z"
            fill="#FFFFFF"
          />
        </svg>
      )
    },
    {
      id: 'x',
      name: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      hoverClasses: 'hover:bg-stone-900/10 dark:hover:bg-white/10 hover:border-stone-400 dark:hover:border-stone-500 hover:text-stone-900 dark:hover:text-white',
      logo: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true" fill="none">
          <circle cx="12" cy="12" r="11" className="fill-stone-900 dark:fill-stone-100" />
          <path
            d="M13.15 11.15L16.9 6.8h-.89l-3.26 3.78-2.6-3.78H7.15l3.93 5.72-3.93 4.56h.89l3.44-4 2.75 4h3l-4.08-5.93Zm-1.22 1.41l-.4-.57-3.17-4.53h1.37l2.56 3.66.4.57 3.33 4.76h-1.37l-2.72-3.89Z"
            className="fill-white dark:fill-stone-950"
          />
        </svg>
      )
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      hoverClasses: 'hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/45 hover:text-[#0A66C2] dark:hover:text-[#60a5fa]',
      logo: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true" fill="none">
          <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#0A66C2" />
          <path
            d="M7.6 9.8H5.4v7.6h2.2V9.8Zm-1.1-3.5a1.28 1.28 0 1 0 0 2.56 1.28 1.28 0 0 0 0-2.56Zm11.1 6.7c0-2.16-1.15-3.4-2.83-3.4-1.25 0-1.95.69-2.28 1.22V9.8h-2.17c.03.67 0 7.6 0 7.6h2.17v-4.24c0-.23.02-.45.09-.61.18-.45.6-.92 1.3-.92.92 0 1.29.7 1.29 1.72v4.05h2.43V13Z"
            fill="#FFFFFF"
          />
        </svg>
      )
    },
    {
      id: 'telegram',
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      hoverClasses: 'hover:bg-[#229ED9]/12 hover:border-[#229ED9]/45 hover:text-[#0088cc] dark:hover:text-[#38bdf8]',
      logo: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true" fill="none">
          <circle cx="12" cy="12" r="11" fill="#229ED9" />
          <path
            d="M17.3 7.6 6.4 11.8c-.74.3-.74.71-.14.9l2.8.87 6.48-4.08c.31-.19.59-.09.36.12l-5.25 4.74-.2 2.9c.29 0 .42-.13.58-.29l1.4-1.36 2.9 2.14c.53.3.92.14 1.05-.49l1.9-8.95c.19-.78-.3-1.13-.98-.8Z"
            fill="#FFFFFF"
          />
        </svg>
      )
    }
  ];

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center gap-1.5" aria-label="Compartilhar artigo">
        {networks.map((net) => (
          <a
            key={net.id}
            href={net.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compartilhar no ${net.name}`}
            title={`Compartilhar no ${net.name}`}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-stone-200 dark:border-plum-800 bg-stone-50 dark:bg-plum-850 text-xs font-semibold text-stone-700 dark:text-stone-200 transition-colors ${net.hoverClasses}`}
          >
            {net.logo}
            <span className="hidden sm:inline">{net.name}</span>
          </a>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copiar link do artigo"
          title="Copiar link do artigo"
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-stone-200 dark:border-plum-800 bg-stone-50 dark:bg-plum-850 hover:bg-brand-50 dark:hover:bg-plum-800 text-xs font-semibold text-stone-700 dark:text-stone-200 transition-colors cursor-pointer"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Link2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
          )}
          <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Copiar'}</span>
        </button>
      </div>
    );
  }

  return (
    <section
      aria-label="Compartilhar nas redes sociais"
      className="mt-8 p-5 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200/90 dark:border-plum-800 space-y-3.5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-0.5">
          <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Compartilhe este guia nas redes sociais</span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Ajude familiares, amigos e vizinhos a se prepararem melhor para as mudanças do tempo.
          </p>
        </div>
        {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Compartilhar</span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {networks.map((net) => (
          <a
            key={net.id}
            href={net.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compartilhar no ${net.name}`}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-stone-200 dark:border-plum-700 bg-white dark:bg-plum-900 text-xs font-bold text-stone-700 dark:text-stone-200 shadow-2xs transition-colors ${net.hoverClasses}`}
          >
            {net.logo}
            <span>{net.name}</span>
          </a>
        ))}

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-stone-200 dark:border-plum-700 bg-white dark:bg-plum-900 hover:bg-brand-50 dark:hover:bg-plum-800 text-xs font-bold text-stone-700 dark:text-stone-200 shadow-2xs transition-colors cursor-pointer"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Link2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          )}
          <span>{copied ? 'Link copiado!' : 'Copiar link'}</span>
        </button>
      </div>
    </section>
  );
};

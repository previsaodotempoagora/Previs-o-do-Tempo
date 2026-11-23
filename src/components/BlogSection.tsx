import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  MapPin,
  Search,
  X
} from 'lucide-react';
import {
  ALL_BLOG_ARTICLES,
  BLOG_CATEGORIES,
  BLOG_REGIONS,
  BlogArticle,
  BlogCategory,
  BrazilRegion,
  formatPortugueseDate
} from '../data/blogArticles';
import { LocationData } from '../types';
import { getArticleImages } from '../data/blogImages';
import { BlogArticleView } from './BlogArticleView';
import { AdSenseSlot } from './AdSenseSlot';

interface BlogSectionProps {
  selectedSlug: string | null;
  onOpenArticle: (slug: string) => void;
  onBackToBlog: () => void;
  onSelectCityWeather: (location: LocationData) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  selectedSlug,
  onOpenArticle,
  onBackToBlog,
  onSelectCityWeather
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | BlogCategory>('all');
  const [activeRegion, setActiveRegion] = useState<'all' | Exclude<BrazilRegion, 'Nacional'>>('all');

  const activeArticle: BlogArticle | undefined = useMemo(() => {
    if (!selectedSlug) return undefined;
    return ALL_BLOG_ARTICLES.find((a) => a.slug === selectedSlug);
  }, [selectedSlug]);

  const filteredArticles = useMemo(() => {
    const q = searchTerm
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

    return ALL_BLOG_ARTICLES.filter((article) => {
      if (activeCategory !== 'all' && article.category !== activeCategory) {
        return false;
      }

      if (activeRegion !== 'all') {
        if (article.region !== activeRegion) return false;
      }

      if (!q) return true;

      const searchable = [
        article.title,
        article.summary,
        article.stateName || '',
        article.stateCode || '',
        article.category,
        article.region,
        ...article.keywords
      ]
        .join(' ')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

      return searchable.includes(q);
    });
  }, [searchTerm, activeCategory, activeRegion]);

  const stateDirectory = useMemo(
    () =>
      ALL_BLOG_ARTICLES.filter((a) => a.category === 'Guias por Estado').sort((a, b) =>
        (a.stateName || '').localeCompare(b.stateName || '', 'pt-BR')
      ),
    []
  );

  // Render full article reading view if a slug is active
  if (activeArticle) {
    return (
      <BlogArticleView
        article={activeArticle}
        onBackToBlog={onBackToBlog}
        onOpenArticle={onOpenArticle}
        onSelectCityWeather={onSelectCityWeather}
      />
    );
  }

  const showLeadStory =
    !searchTerm.trim() && activeCategory === 'all' && activeRegion === 'all' && filteredArticles.length > 0;
  const leadArticle = showLeadStory ? filteredArticles[0] : null;
  const gridArticles = showLeadStory ? filteredArticles.slice(1) : filteredArticles;

  return (
    <div className="space-y-5 animate-in fade-in duration-200" id="blog-hub-container">
      {/* Editorial Blog Masthead & Search */}
      <section className="bg-white dark:bg-plum-900 rounded-3xl border border-stone-200/90 dark:border-plum-800 shadow-sm p-5 sm:p-8 space-y-5">
        <div className="max-w-3xl space-y-2.5">
          <div className="text-xs font-medium text-stone-500 dark:text-stone-400 flex flex-wrap items-center gap-2">
            <span className="font-bold text-brand-600 dark:text-brand-300">
              Blog & Guias Climáticos
            </span>
            <span aria-hidden="true">·</span>
            <span>Clima & Prevenção</span>
            <span aria-hidden="true">·</span>
            <span>Todos os Estados do Brasil</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-semibold text-stone-900 dark:text-stone-50 leading-tight tracking-tight text-balance">
            Clima, Prevenção e Proteção em Todo o Brasil
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            Guias detalhados de cada estado brasileiro e manuais práticos sobre como se proteger de tempestades, ondas de calor, frio intenso, ar seco e riscos do dia a dia.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-3 pt-1">
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por estado (ex: Bahia, Paraná, SP) ou tema (raios, calor, mofo)..."
              aria-label="Buscar artigos no blog"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-200 dark:border-plum-800 bg-stone-50 dark:bg-plum-850 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:focus:border-brand-400 transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                title="Limpar busca"
                className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Interactive Category Segmented Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setActiveRegion('all');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-plum-850 text-stone-700 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-plum-800'
              }`}
            >
              Todos
            </button>

            {BLOG_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    if (category !== 'Guias por Estado') {
                      setActiveRegion('all');
                    }
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-stone-100 dark:bg-plum-850 text-stone-700 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-plum-800'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Optional Region Filter for State Guides */}
          {(activeCategory === 'all' || activeCategory === 'Guias por Estado') && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 mr-1">
                Região:
              </span>
              <button
                type="button"
                onClick={() => setActiveRegion('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                  activeRegion === 'all'
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-plum-950'
                    : 'bg-stone-100 dark:bg-plum-850 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Todas
              </button>
              {BLOG_REGIONS.map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => {
                    setActiveCategory('Guias por Estado');
                    setActiveRegion(region);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                    activeRegion === region
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-plum-950'
                      : 'bg-stone-100 dark:bg-plum-850 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lead Story Spotlight */}
      {leadArticle && (
        <section className="bg-white dark:bg-plum-900 rounded-3xl border border-stone-200/90 dark:border-plum-800 shadow-sm p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-medium text-stone-500 dark:text-stone-400 flex flex-wrap items-center gap-2">
                <span className="font-bold text-brand-600 dark:text-brand-300">
                  Guia em Destaque
                </span>
                <span aria-hidden="true">·</span>
                <span>{leadArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>Atualizado em {formatPortugueseDate(leadArticle.updatedAt)}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{leadArticle.readTimeMinutes} min de leitura</span>
              </div>

              <h2 className="font-serif text-xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-50 leading-snug text-balance">
                <a
                  href={`/blog/${leadArticle.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenArticle(leadArticle.slug);
                  }}
                  className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
                >
                  {leadArticle.title}
                </a>
              </h2>

              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
                {leadArticle.summary}
              </p>

              <div className="pt-1">
                <a
                  href={`/blog/${leadArticle.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenArticle(leadArticle.slug);
                  }}
                  className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold transition-colors shadow-xs"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Ler Guia Completo</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <figure className="space-y-1.5">
                <div className="aspect-video w-full overflow-hidden rounded-2xl border border-stone-200/80 dark:border-plum-800 bg-stone-100 dark:bg-plum-850">
                  <img
                    src={getArticleImages(leadArticle).hero.src}
                    alt={getArticleImages(leadArticle).hero.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="text-[11px] text-stone-400 dark:text-stone-500 italic px-1">
                  Imagem ilustrativa livre de direitos autorais
                </figcaption>
              </figure>
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200/80 dark:border-plum-800 space-y-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Resumo Rápido
                </h3>
                <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  {leadArticle.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-brand-600 dark:text-brand-400 shrink-0">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-extrabold text-stone-800 dark:text-stone-100">
            {searchTerm || activeCategory !== 'all' || activeRegion !== 'all'
              ? 'Guias e Artigos Encontrados'
              : 'Artigos e Guias de Prevenção'}
          </h2>
        </div>

        {gridArticles.length === 0 ? (
          <div className="bg-white dark:bg-plum-900 rounded-3xl border border-stone-200/90 dark:border-plum-800 p-10 text-center space-y-3">
            <p className="text-sm font-bold text-stone-700 dark:text-stone-200">
              Nenhum artigo encontrado para "{searchTerm}".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
                setActiveRegion('all');
              }}
              className="py-2 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gridArticles.map((article) => {
              const cardImg = getArticleImages(article).hero;
              return (
                <article
                  key={article.slug}
                  className="bg-white dark:bg-plum-900 rounded-2xl border border-stone-200/90 dark:border-plum-800 hover:border-brand-300 dark:hover:border-brand-700 overflow-hidden flex flex-col justify-between transition-colors shadow-2xs group"
                >
                  <div>
                    <figure>
                      <a
                        href={`/blog/${article.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onOpenArticle(article.slug);
                        }}
                        className="block aspect-video w-full overflow-hidden bg-stone-100 dark:bg-plum-850"
                      >
                        <img
                          src={cardImg.src}
                          alt={cardImg.alt}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      </a>
                      <figcaption className="px-5 pt-2 text-[10px] text-stone-400 dark:text-stone-500 italic">
                        Imagem ilustrativa livre de direitos autorais
                      </figcaption>
                    </figure>
                    <div className="p-5 pt-2.5 pb-3 space-y-2.5">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-medium text-stone-500 dark:text-stone-400">
                        <span className="font-bold text-brand-600 dark:text-brand-300">
                          {article.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {article.stateCode ? `${article.stateName} (${article.stateCode})` : article.region}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{article.readTimeMinutes} min</span>
                      </div>

                      <h3 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                        <a
                          href={`/blog/${article.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onOpenArticle(article.slug);
                          }}
                          className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
                        >
                          {article.title}
                        </a>
                      </h3>

                      <p className="text-xs sm:text-[13px] text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                        {article.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 border-t border-stone-100 dark:border-plum-800 flex items-center justify-between text-xs">
                    <span className="text-stone-400 dark:text-stone-500">
                      {formatPortugueseDate(article.updatedAt)}
                    </span>
                    <a
                      href={`/blog/${article.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenArticle(article.slug);
                      }}
                      className="font-bold text-brand-600 dark:text-brand-300 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Ler artigo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <AdSenseSlot slotId="blog-hub-mid-banner" format="auto" className="my-3" />

      {/* Complete State Directory for Easy Navigation & Internal Linking */}
      <section className="bg-white dark:bg-plum-900 rounded-3xl border border-stone-200/90 dark:border-plum-800 shadow-sm p-5 sm:p-7 space-y-4">
        <div className="space-y-1">
          <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <span>Índice Completo por Estado Brasileiro</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Acesse rapidamente o guia climático, sazonalidade e medidas preventivas de qualquer estado do Brasil.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {stateDirectory.map((st) => (
            <a
              key={st.slug}
              href={`/blog/${st.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onOpenArticle(st.slug);
              }}
              className="p-3 rounded-xl bg-stone-50/80 dark:bg-plum-850 border border-stone-200/80 dark:border-plum-800 hover:border-brand-300 dark:hover:border-brand-700 transition-colors flex items-center justify-between gap-2 text-xs"
            >
              <span className="font-semibold text-stone-800 dark:text-stone-100 truncate">
                {st.stateName} ({st.stateCode})
              </span>
              <span className="text-stone-400 dark:text-stone-500 shrink-0">
                {st.region} →
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

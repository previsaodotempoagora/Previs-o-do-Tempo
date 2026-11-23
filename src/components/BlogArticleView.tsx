import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CloudSun,
  HelpCircle,
  Lightbulb,
  ShieldCheck
} from 'lucide-react';
import {
  BlogArticle,
  formatPortugueseDate,
  getRelatedArticles
} from '../data/blogArticles';
import { getArticleImages } from '../data/blogImages';
import { ALL_PRESET_CITIES } from '../data/brazilCities';
import { LocationData } from '../types';
import { AdSenseSlot } from './AdSenseSlot';
import { SocialShareBar } from './SocialShareBar';

interface BlogArticleViewProps {
  article: BlogArticle;
  onBackToBlog: () => void;
  onOpenArticle: (slug: string) => void;
  onSelectCityWeather: (location: LocationData) => void;
}

export const BlogArticleView: React.FC<BlogArticleViewProps> = ({
  article,
  onBackToBlog,
  onOpenArticle,
  onSelectCityWeather
}) => {
  const [readProgress, setReadProgress] = useState(0);

  const relatedArticles = getRelatedArticles(article, 3);
  const articleImages = getArticleImages(article);
  const linkedCity = article.relatedCityId
    ? ALL_PRESET_CITIES.find((c) => c.id === article.relatedCityId)
    : undefined;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) {
        setReadProgress(0);
        return;
      }
      const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setReadProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.slug]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(`article-sec-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const midSectionIndex = Math.max(0, Math.floor(article.sections.length / 2) - 1);

  return (
    <article
      className="space-y-6 animate-in fade-in duration-200"
      id={`blog-article-${article.slug}`}
    >
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-0.5 bg-transparent z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-brand-600 dark:bg-brand-400 transition-[width] duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* Top Navigation Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-plum-900 rounded-2xl border border-stone-200/90 dark:border-plum-800 px-4 py-3 shadow-2xs">
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 min-w-0">
          <button
            type="button"
            onClick={onBackToBlog}
            className="inline-flex items-center gap-1.5 font-bold text-brand-600 dark:text-brand-300 hover:underline whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Todos os Artigos</span>
          </button>
          <span aria-hidden="true">/</span>
          <span className="truncate">{article.category}</span>
          {article.stateName && (
            <>
              <span aria-hidden="true">/</span>
              <span className="font-semibold text-stone-700 dark:text-stone-200 truncate">
                {article.stateName} ({article.stateCode})
              </span>
            </>
          )}
        </div>

        <SocialShareBar
          title={article.title}
          summary={article.summary}
          slug={article.slug}
          variant="compact"
        />
      </div>

      {/* Main Editorial Card + Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Primary Reading Column */}
        <div className="lg:col-span-8 bg-white dark:bg-plum-900 rounded-3xl border border-stone-200/90 dark:border-plum-800 shadow-sm px-5 py-6 sm:px-10 sm:py-9">
          {/* Editorial Header */}
          <header className="space-y-4 pb-6 border-b border-stone-200/80 dark:border-plum-800">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-stone-500 dark:text-stone-400 font-medium">
              <span className="font-bold text-brand-600 dark:text-brand-300">
                {article.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{article.region === 'Nacional' ? 'Todo o Brasil' : `Região ${article.region}`}</span>
              <span aria-hidden="true">·</span>
              <span>Atualizado em {formatPortugueseDate(article.updatedAt)}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{article.readTimeMinutes} min de leitura</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-stone-900 dark:text-stone-50 leading-[1.2] tracking-tight text-balance">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              {article.summary}
            </p>

            <div className="pt-1 text-xs text-stone-500 dark:text-stone-400">
              Por <span className="font-semibold text-stone-700 dark:text-stone-200">{article.author}</span>
            </div>
          </header>

          {/* Image 1: Featured Hero Image */}
          <figure className="mt-6 mb-7 space-y-2">
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-stone-200/80 dark:border-plum-800 bg-stone-100 dark:bg-plum-850">
              <img
                src={articleImages.hero.src}
                alt={articleImages.hero.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed px-1">
              {articleImages.hero.caption}
            </figcaption>
          </figure>

          {/* Key Takeaways */}
          <section
            aria-label="Pontos principais"
            className="my-7 p-5 rounded-2xl bg-brand-50/55 dark:bg-plum-850 border border-brand-200/70 dark:border-plum-800 space-y-3"
          >
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-brand-700 dark:text-brand-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Pontos-Chave deste Guia</span>
            </h2>
            <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-200 leading-relaxed">
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-1" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Article Body Sections */}
          <div className="space-y-8 max-w-3xl">
            {article.sections.map((section, sectionIndex) => (
              <React.Fragment key={section.id}>
                <section id={`article-sec-${section.id}`} className="scroll-mt-24 space-y-4">
                  <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100 leading-snug tracking-tight pt-1">
                    {section.heading}
                  </h2>

                  <div className="space-y-4 text-[15.5px] sm:text-base text-stone-700 dark:text-stone-300 leading-[1.8]">
                    {section.paragraphs.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        className={
                          sectionIndex === 0 && pIdx === 0
                            ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none first-letter:text-brand-600 dark:first-letter:text-brand-400'
                            : undefined
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.checklist && section.checklist.length > 0 && (
                    <div className="mt-5 p-5 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200/90 dark:border-plum-800 space-y-3">
                      {section.checklistTitle && (
                        <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                          <span>{section.checklistTitle}</span>
                        </h3>
                      )}
                      <ul className="space-y-2.5 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                        {section.checklist.map((item, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-md bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                              {cIdx + 1}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.practicalTip && (
                    <div className="mt-4 p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200/80 dark:border-amber-800/40 text-sm text-amber-950 dark:text-amber-200 flex items-start gap-3 leading-relaxed">
                      <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-1" />
                      <div>
                        <span className="font-bold block text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-0.5">
                          Dica Prática
                        </span>
                        <p>{section.practicalTip}</p>
                      </div>
                    </div>
                  )}
                </section>

                {/* Image 2 + Natural mid-article AdSense slot */}
                {sectionIndex === midSectionIndex && (
                  <>
                    <figure className="my-7 space-y-2">
                      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-stone-200/80 dark:border-plum-800 bg-stone-100 dark:bg-plum-850">
                        <img
                          src={articleImages.secondary.src}
                          alt={articleImages.secondary.alt}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <figcaption className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed px-1">
                        {articleImages.secondary.caption}
                      </figcaption>
                    </figure>
                    <AdSenseSlot slotId={`blog-mid-${article.slug}`} format="auto" className="my-6" />
                  </>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Branded Social Share Bar at end of article */}
          <SocialShareBar
            title={article.title}
            summary={article.summary}
            slug={article.slug}
            variant="full"
          />

          {/* Article FAQ Section */}
          {article.faqs.length > 0 && (
            <section className="mt-10 pt-8 border-t border-stone-200/80 dark:border-plum-800 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <span>Perguntas Frequentes</span>
              </h2>
              <div className="space-y-3">
                {article.faqs.map((faq, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-4 rounded-2xl bg-stone-50 dark:bg-plum-850 border border-stone-200/80 dark:border-plum-800 space-y-1.5"
                  >
                    <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sticky Editorial Sidebar */}
        <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
          {/* Live Weather CTA for State Articles */}
          {linkedCity && (
            <div className="p-5 rounded-3xl bg-white dark:bg-plum-900 border border-stone-200/90 dark:border-plum-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-brand-600 dark:text-brand-300 text-xs font-extrabold uppercase tracking-wider">
                <CloudSun className="w-4 h-4" />
                <span>Tempo em Tempo Real</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                Previsão atualizada em {linkedCity.name} ({linkedCity.stateCode})
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Consulte temperatura agora, previsão hora a hora, índice UV, rajadas de vento e tendência para os próximos 15 dias em {article.stateName}.
              </p>
              <button
                type="button"
                onClick={() => onSelectCityWeather(linkedCity)}
                className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Ver Clima em {linkedCity.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Table of Contents */}
          <div className="p-5 rounded-3xl bg-white dark:bg-plum-900 border border-stone-200/90 dark:border-plum-800 shadow-sm space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Neste Artigo
            </h3>
            <nav aria-label="Índice do artigo" className="space-y-1.5">
              {article.sections.map((sec, idx) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className="w-full text-left py-1.5 px-2.5 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-brand-600 dark:hover:text-brand-300 hover:bg-stone-50 dark:hover:bg-plum-850 transition-colors flex items-start gap-2 cursor-pointer"
                >
                  <span className="text-[11px] font-bold text-stone-400 dark:text-stone-500 tabular-nums shrink-0 mt-0.5">
                    0{idx + 1}.
                  </span>
                  <span className="leading-snug">{sec.heading}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Editorial Standards & Reliability Note */}
          <div className="p-5 rounded-3xl bg-stone-50 dark:bg-plum-850 border border-stone-200/90 dark:border-plum-800 space-y-2 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            <span className="font-extrabold text-stone-800 dark:text-stone-100 block">
              Compromisso Editorial & Segurança
            </span>
            <p>
              Conteúdo informativo elaborado com base em climatologia regional brasileira e boas práticas de Defesa Civil e saúde pública. Em emergências climáticas, acione os bombeiros (193) ou a Defesa Civil (199).
            </p>
          </div>
        </aside>
      </div>

      {/* Related Articles */}
      <section className="bg-white dark:bg-plum-900 rounded-3xl border border-stone-200/90 dark:border-plum-800 shadow-sm p-5 sm:p-7 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100">
            Continue Lendo
          </h2>
          <button
            type="button"
            onClick={onBackToBlog}
            className="text-xs font-bold text-brand-600 dark:text-brand-300 hover:underline cursor-pointer"
          >
            Ver todos os guias →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedArticles.map((rel) => {
            const relThumb = getArticleImages(rel).hero;
            return (
              <a
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onOpenArticle(rel.slug);
                }}
                className="group rounded-2xl bg-stone-50/70 dark:bg-plum-850 border border-stone-200/80 dark:border-plum-800 hover:border-brand-300 dark:hover:border-brand-700 transition-colors overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video w-full overflow-hidden bg-stone-200 dark:bg-plum-800">
                    <img
                      src={relThumb.src}
                      alt={relThumb.alt}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="text-[11px] font-medium text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                      <span className="font-bold text-brand-600 dark:text-brand-300">
                        {rel.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{rel.readTimeMinutes} min</span>
                    </div>
                    <h3 className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100 group-hover:text-brand-600 dark:group-hover:text-brand-300 leading-snug transition-colors">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {rel.summary}
                    </p>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-300 inline-flex items-center gap-1">
                    <span>Ler guia</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </article>
  );
};

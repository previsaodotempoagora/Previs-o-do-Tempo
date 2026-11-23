import { BlogArticle, BlogCategory, BrazilRegion } from './blogTypes';
import { STATE_ARTICLES_PART_1 } from './blogStateArticles1';
import { STATE_ARTICLES_PART_2 } from './blogStateArticles2';
import { PREVENTION_ARTICLES } from './blogPreventionArticles';

export type {
  BlogArticle,
  BlogArticleSection,
  BlogCategory,
  BlogFaqItem,
  BrazilRegion
} from './blogTypes';

export const ALL_BLOG_ARTICLES: BlogArticle[] = [
  ...PREVENTION_ARTICLES,
  ...STATE_ARTICLES_PART_1,
  ...STATE_ARTICLES_PART_2
];

export const BLOG_CATEGORIES: BlogCategory[] = [
  'Guias por Estado',
  'Prevenção & Segurança',
  'Saúde & Clima',
  'Fenômenos & Educação'
];

export const BLOG_REGIONS: Exclude<BrazilRegion, 'Nacional'>[] = [
  'Sudeste',
  'Sul',
  'Centro-Oeste',
  'Nordeste',
  'Norte'
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return ALL_BLOG_ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedArticles(currentArticle: BlogArticle, limit = 3): BlogArticle[] {
  const candidates = ALL_BLOG_ARTICLES.filter((a) => a.slug !== currentArticle.slug);

  const sameRegionOrCategory = candidates.filter(
    (a) =>
      (currentArticle.region !== 'Nacional' && a.region === currentArticle.region) ||
      a.category === currentArticle.category
  );

  const others = candidates.filter(
    (a) => !sameRegionOrCategory.some((match) => match.slug === a.slug)
  );

  return [...sameRegionOrCategory, ...others].slice(0, limit);
}

export function formatPortugueseDate(isoDate: string): string {
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const year = parts[0];
  const monthIndex = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const months = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro'
  ];
  const monthName = months[monthIndex] || parts[1];
  return `${day} de ${monthName} de ${year}`;
}

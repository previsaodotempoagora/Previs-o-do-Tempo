export type BlogCategory =
  | 'Guias por Estado'
  | 'Prevenção & Segurança'
  | 'Saúde & Clima'
  | 'Fenômenos & Educação';

export type BrazilRegion =
  | 'Sudeste'
  | 'Sul'
  | 'Centro-Oeste'
  | 'Nordeste'
  | 'Norte'
  | 'Nacional';

export interface BlogArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
  checklistTitle?: string;
  checklist?: string[];
  practicalTip?: string;
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  category: BlogCategory;
  region: BrazilRegion;
  stateCode?: string;
  stateName?: string;
  relatedCityId?: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readTimeMinutes: number;
  summary: string;
  keyTakeaways: string[];
  sections: BlogArticleSection[];
  faqs: BlogFaqItem[];
}

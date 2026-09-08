export interface SpotlightConfig {
  activeProId: string;
  projectTitle: string;
  projectLocation: string;
  projectImage: string;
  editorialNote: string;
  reviewQuote: string;
  reviewAuthor: string;
  updatedAt: string;
}

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  proId?: string;
  proName?: string;
  category?: string;
  projectType?: string;
  notes?: string;
  source: 'contact_modal' | 'estimate_modal' | 'join_modal';
  status: 'new' | 'contacted' | 'completed' | 'archived';
  createdAt: string;
}

export interface AdminStoreData {
  pros: import('@/data/tradewell').Pro[];
  spotlight: SpotlightConfig;
  leads: LeadItem[];
  settings: {
    passcode: string;
    lastUpdated: string;
  };
}

export const DEFAULT_SPOTLIGHT: SpotlightConfig = {
  activeProId: 'valor-roofing',
  projectTitle: 'Architectural Shingle Replacement & Gutters',
  projectLocation: 'Jonesboro & Craighead County, AR',
  projectImage: '/assets/img/roof-replacement.jpg',
  editorialNote:
    'Valor Roofing LLC was selected for this week’s spotlight following outstanding homeowner reports during the recent severe weather season. From same-day emergency roof inspections and transparent insurance estimates to complete architectural shingle replacements completed within 48 hours, Valor sets the benchmark for Arkansas roofing standards.',
  reviewQuote:
    'Valor Roofing responded immediately when our roof began leaking after a storm. They gave an honest written quote, worked directly with our insurance adjuster, and completed the full roof in a single day. Flawless work.',
  reviewAuthor: 'Marcus T., Jonesboro homeowner (Verified Customer)',
  updatedAt: 'Updated for this week'
};

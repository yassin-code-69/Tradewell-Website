/* ============================================================================
   Tradewell — Home Services Directory Data & Logic
   TypeScript port of the Arkansas contractor dataset & ranking engine
   Updated for 5 Core Categories & Specific Verified Pros
   ========================================================================== */

export interface SiteInfo {
  name: string;
  tagline: string;
  title: string;
  blurb: string;
}

export interface ClientInfo {
  name: string;
  phone: string;
  phoneHref: string;
  area: string;
  category: string;
  rating: number;
  reviewCount: number | null;
  services: string[];
}

export interface Category {
  name: string;
  group: string;
  icon: string;
  pros: number;
}

export interface CoreCategory {
  id: string;
  name: string;
  group: string;
  icon: string;
  prosCount: number;
  blurb: string;
}

export interface TradeFamily {
  cats: string[];
  keywords: string[];
}

export interface ServiceItem {
  name: string;
  icon: string;
  img: string;
  blurb: string;
  cost: string;
  maps?: string;
}

export interface ProjectItem {
  name: string;
  img: string;
  cost: string;
  span: string;
  label?: string;
}

export interface Pro {
  id: string;
  name: string;
  demo: boolean;
  featured?: boolean;
  tradewellScore?: number;
  category: string;
  categories: string[];
  services: string[];
  rating: number;
  reviews: number | null;
  ratingOnly?: boolean;
  city: string;
  area: string;
  covers: string[];
  phone?: string;
  phoneHref?: string;
  logo?: string;
  gallery?: string[];
  initials: string;
  accent: string;
  responds: string;
  blurb: string;
  about: string;
}

export interface ReviewItem {
  name: string;
  stars: number;
  days: number;
  text: string;
  date?: string;
  service?: string;
}

export interface ArticleItem {
  tag: string;
  title: string;
  blurb: string;
  read: string;
  img: string;
  topic: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface StepItem {
  n: string;
  title: string;
  body: string;
}

export const SITE: SiteInfo = {
  name: 'Tradewell Home',
  tagline: 'All Home Services',
  title: 'Tradewell Home — Find Trusted Home Service Professionals in Arkansas',
  blurb: 'Connect with vetted local pros across Arkansas. Compare ratings and request estimates.'
};

export const CLIENT: ClientInfo = {
  name: 'Valor Roofing LLC',
  phone: '+1 870-316-8800',
  phoneHref: 'tel:+18703168800',
  area: 'Northeast & Central Arkansas',
  category: 'Roofing & Home Repairs',
  rating: 5.0,
  reviewCount: 48,
  services: ['Roof Repair', 'Roof Replacement', 'Storm Damage', 'Gutters', 'Siding', 'Home Repairs']
};

export const ICONS: Record<string, string> = {
  roof: 'M3 11 12 4l9 7M5 10v10h14V10M9 20v-6h6v6',
  hammer: 'M14 6l4 4M3 21l8-8M12.5 7.5 16 4a3 3 0 0 1 4 4l-3.5 3.5-4-4z',
  pipe: 'M4 8h6a3 3 0 0 1 3 3v5a3 3 0 0 0 3 3h4M4 5v6M17 17h4',
  flame: 'M12 3c3 4 5 6 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 .5 1.5 1.5 2 2 1 .5-1-1-3 1-6z',
  bolt: 'M13 2 4 14h6l-1 8 9-12h-6l1-8z',
  sparkle: 'M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5M19 15l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5',
  leaf: 'M5 19c0-8 6-13 14-13 0 8-5 14-13 14M5 19c2-4 5-6 8-7',
  brush: 'M9 14V6a3 3 0 0 1 6 0v8M7 14h10v3a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4v-3z',
  layers: 'M12 3 3 8l9 5 9-5-9-5zM3 13l9 5 9-5M3 17.5 12 22l9-4.5',
  door: 'M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M4 21h16M14 12h.01',
  window: 'M4 4h16v16H4zM12 4v16M4 12h16',
  fence: 'M4 21V9l3-4 3 4v12M14 21V9l3-4 3 4v12M2 12h20M2 16h20',
  concrete: 'M3 9h18v10H3zM3 9l3-4h12l3 4M8 9v10M16 9v10',
  deck: 'M3 20h18M4 16h16M5 12h14M7 20v-8M17 20v-8',
  garage: 'M3 21V9l9-5 9 5v12M7 21v-8h10v8M7 17h10',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z',
  truck: 'M3 7h11v9H3zM14 10h4l3 3v3h-7M6.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  bug: 'M9 5a3 3 0 0 1 6 0M6 10h12v4a6 6 0 0 1-12 0v-4zM3 9l3 1M21 9l-3 1M3 17l3-1M21 17l-3-1M12 10v9',
  droplet: 'M12 3c4 5 6 7.5 6 10a6 6 0 0 1-12 0c0-2.5 2-5 6-10z',
  sun: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 2v2M12 20v2M4 12H2M22 12h-2M5 5 3.5 3.5M20.5 20.5 19 19M19 5l1.5-1.5M3.5 20.5 5 19',
  wrench: 'M15 3a5 5 0 0 0-6 6L3 15v6h6l6-6a5 5 0 0 0 6-6l-3.5 3.5-3-3L18 6l-3-3z',
  broom: 'M13 3 9 11M4 21l5-10 6 3-5 10-6-3zM14 14l6-3',
  clipboard: 'M9 4h6v3H9zM7 5H5v16h14V5h-2M9 12h6M9 16h4',
  pool: 'M3 17c2-1.5 3-1.5 5 0s3 1.5 5 0 3-1.5 5 0M3 12c2-1.5 3-1.5 5 0s3 1.5 5 0 3-1.5 5 0M8 12V4M16 12V4',
  chimney: 'M4 12 12 5l8 7M6 11v9h12v-9M15 6V3h3v5',
  tree: 'M12 3 6 12h3l-4 6h14l-4-6h3L12 3zM12 18v3',
  home: 'M3 11 12 3l9 8M6 10v10h12V10',
  box: 'M3 7 12 3l9 4-9 4-9-4zM3 7v10l9 4 9-4V7',
  lock: 'M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5z',
  spray: 'M8 8h6v13H8zM8 8V4h4M16 4h.01M19 6h.01M17 9h.01M20 11h.01'
};

export const CORE_CATEGORIES: CoreCategory[] = [
  { id: 'roofing', name: 'Roofing', group: 'Exterior & Roofing', icon: 'roof', prosCount: 4, blurb: 'Shingle repair, complete roof replacements, storm damage restoration, and gutters.' },
  { id: 'homerepairs', name: 'Home repairs', group: 'Construction & Repairs', icon: 'wrench', prosCount: 3, blurb: 'Structural repairs, carpentry, drywall patching, rot repairs, and general home improvements.' },
  { id: 'hvac', name: 'HVAC (Commercial)', group: 'Heating & Cooling', icon: 'flame', prosCount: 3, blurb: 'Commercial rooftop units, cooling installations, chillers, and emergency AC service.' },
  { id: 'electrical', name: 'Electrical', group: 'Power & Systems', icon: 'bolt', prosCount: 2, blurb: 'Commercial electrical wiring, panel upgrades, safety inspections, and generator backups.' },
  { id: 'lawngarden', name: 'Lawn/Garden', group: 'Outdoor & Grounds', icon: 'leaf', prosCount: 3, blurb: 'Specialized turf care, scheduled mowing, seasonal cleanups, and landscape design.' }
];

export const CATEGORIES: Category[] = [
  { name: 'Roofing', group: 'Core Trades', icon: 'roof', pros: 4 },
  { name: 'Home repairs', group: 'Core Trades', icon: 'wrench', pros: 3 },
  { name: 'HVAC (Commercial)', group: 'Core Trades', icon: 'flame', pros: 3 },
  { name: 'Electrical', group: 'Core Trades', icon: 'bolt', pros: 2 },
  { name: 'Lawn/Garden', group: 'Core Trades', icon: 'leaf', pros: 3 },

  { name: 'Roof Repair', group: 'Roofing', icon: 'hammer', pros: 4 },
  { name: 'Roof Replacement', group: 'Roofing', icon: 'roof', pros: 4 },
  { name: 'Storm Damage Repair', group: 'Roofing', icon: 'shield', pros: 3 },
  { name: 'Gutters', group: 'Roofing', icon: 'droplet', pros: 3 },
  { name: 'Siding', group: 'Home repairs', icon: 'layers', pros: 3 },
  { name: 'AC Repair', group: 'HVAC (Commercial)', icon: 'sun', pros: 3 },
  { name: 'Furnace Repair', group: 'HVAC (Commercial)', icon: 'flame', pros: 3 },
  { name: 'Commercial Wiring', group: 'Electrical', icon: 'bolt', pros: 2 },
  { name: 'Landscaping', group: 'Lawn/Garden', icon: 'leaf', pros: 3 },
  { name: 'Lawn Care', group: 'Lawn/Garden', icon: 'leaf', pros: 3 }
];

export const FAMILIES: Record<string, TradeFamily> = {
  roofing: {
    cats: ['Roofing', 'Roof Repair', 'Roof Replacement', 'Storm Damage Repair', 'Gutters'],
    keywords: ['roof', 'shingle', 'gutter', 'storm', 'valor', 'sharp', 'robertson', 'prime']
  },
  homerepairs: {
    cats: ['Home repairs', 'General Contractors', 'Drywall', 'Carpentry', 'Siding'],
    keywords: ['repair', 'home repair', 'construction', 'markley', 'fuller', 'carpentry', 'drywall']
  },
  hvac: {
    cats: ['HVAC (Commercial)', 'HVAC', 'AC Repair', 'Furnace Repair'],
    keywords: ['hvac', 'commercial', 'townsend', 'prestige', 'jason', 'air', 'heat', 'cooling', 'furnace']
  },
  electrical: {
    cats: ['Electrical', 'Commercial Wiring', 'Generator Installation'],
    keywords: ['electric', 'electrical', 'mws', 'wilkins', 'panel', 'wiring', 'power']
  },
  lawngarden: {
    cats: ['Lawn/Garden', 'Landscaping', 'Lawn Care'],
    keywords: ['lawn', 'garden', 'lacey', 'turf', 'tj', 'salina', 'mow', 'landscape', 'yard']
  }
};

export const IMAGES: Record<string, string[]> = {
  'Roofing': ['/assets/img/roofing.jpg', '/assets/img/roofing-2.jpg', '/assets/img/roofing-3.jpg'],
  'Home repairs': ['/assets/img/handyman.jpg', '/assets/img/roofing-2.jpg', '/assets/img/flooring.jpg'],
  'HVAC (Commercial)': ['/assets/img/hvac.jpg', '/assets/img/hvac-2.jpg', '/assets/img/electrical.jpg'],
  'Electrical': ['/assets/img/electrical.jpg', '/assets/img/electrical-2.jpg', '/assets/img/handyman.jpg'],
  'Lawn/Garden': ['/assets/img/landscaping.jpg', '/assets/img/landscaping-2.jpg', '/assets/img/handyman.jpg'],
  'Plumbing': ['/assets/img/plumbing.jpg', '/assets/img/plumbing-2.jpg', '/assets/img/bathroom.jpg'],
  'General Contractors': ['/assets/img/kitchen.jpg', '/assets/img/bathroom.jpg', '/assets/img/flooring.jpg'],
  'Handyman': ['/assets/img/handyman.jpg', '/assets/img/painting.jpg', '/assets/img/windows.jpg'],
  'Windows': ['/assets/img/windows.jpg', '/assets/img/painting.jpg', '/assets/img/roofing-3.jpg']
};

export const SERVICES: ServiceItem[] = [
  { name: 'Roofing', icon: 'roof', img: '/assets/img/roofing.jpg', blurb: 'Repairs, replacements and storm damage inspections.', cost: '$450 – $14,800' },
  { name: 'Home repairs', icon: 'wrench', img: '/assets/img/handyman.jpg', blurb: 'Structural carpentry, rot repairs, drywall and maintenance.', cost: '$150 – $4,800' },
  { name: 'HVAC (Commercial)', icon: 'flame', img: '/assets/img/hvac.jpg', blurb: 'Commercial rooftop heating, cooling installations and repair.', cost: '$220 – $12,500' },
  { name: 'Electrical', icon: 'bolt', img: '/assets/img/electrical.jpg', blurb: 'Commercial wiring, panel upgrades, and generator backups.', cost: '$190 – $4,600' },
  { name: 'Lawn/Garden', icon: 'leaf', img: '/assets/img/landscaping.jpg', blurb: 'Turf care, scheduled mowing, cleanups, and landscaping.', cost: '$90 – $3,400' }
];

export const PROJECTS: ProjectItem[] = [
  { name: 'Roof Repair', img: '/assets/img/roof-repair.jpg', cost: '$450 – $2,100', span: '1 – 2 days' },
  { name: 'Roof Replacement', img: '/assets/img/roof-replacement.jpg', cost: '$8,400 – $22,000', span: '2 – 5 days' },
  { name: 'HVAC Installation', img: '/assets/img/hvac-2.jpg', cost: '$5,100 – $12,900', span: '1 – 2 days' },
  { name: 'Commercial Wiring', img: '/assets/img/electrical-2.jpg', cost: '$850 – $4,200', span: '1 – 3 days' },
  { name: 'Landscape Design', img: '/assets/img/landscaping.jpg', cost: '$1,800 – $14,500', span: '1 – 3 weeks' }
];

export const CITIES: string[] = [
  'Jonesboro', 'Paragould', 'Searcy', 'Cabot', 'Newport', 'Batesville', 'Wynne', 'Trumann',
  'Harrisburg', 'Beebe', 'Bald Knob', 'Marked Tree', 'Blytheville', 'Walnut Ridge', 'Pocahontas',
  'Conway', 'Heber Springs', 'Little Rock', 'North Little Rock', 'Sherwood', 'Jacksonville', 'Benton'
];

export const NE_AR = [
  'Jonesboro', 'Paragould', 'Newport', 'Wynne', 'Trumann', 'Harrisburg',
  'Marked Tree', 'Blytheville', 'Walnut Ridge', 'Pocahontas', 'Batesville'
];

export const CENTRAL_AR = [
  'Searcy', 'Cabot', 'Beebe', 'Bald Knob', 'Conway', 'Heber Springs',
  'Little Rock', 'North Little Rock', 'Sherwood', 'Jacksonville', 'Benton'
];

export const PROS: Pro[] = [
  /* ---------------- Roofing ---------------- */
  {
    id: 'valor-roofing',
    name: 'Valor Roofing LLC',
    demo: false,
    featured: true,
    logo: '/assets/img/valor-roofing-logo.png',
    tradewellScore: 99,
    category: 'Roofing',
    categories: ['Roofing', 'Home repairs', 'Roof Repair', 'Roof Replacement', 'Storm Damage Repair', 'Gutters', 'Siding'],
    services: ['Roof Repair', 'Complete Roof Replacement', 'Storm Damage Inspection', 'Gutters', 'Exterior Repairs'],
    rating: 5.0,
    reviews: 48,
    ratingOnly: false,
    city: 'Northeast & Central Arkansas',
    area: 'Craighead, White, Pulaski & Lonoke Counties',
    covers: NE_AR.concat(CENTRAL_AR),
    phone: '+1 870-316-8800',
    phoneHref: 'tel:+18703168800',
    initials: 'VR',
    accent: '#B8402C',
    responds: 'Typically responds same day',
    blurb: 'Premier roofing installations, full replacements, storm restoration and home repairs across Arkansas.',
    about: 'Valor Roofing LLC is Arkansas’s trusted roofing contractor serving homeowners throughout Northeast and Central Arkansas. Specializing in leak diagnosis, architectural shingle replacement, high-wind storm restoration, gutters and envelope home repairs.'
  },
  {
    id: 'charles-sharp-roofing',
    name: 'Charles Sharp Roofing',
    demo: false,
    tradewellScore: 98,
    category: 'Roofing',
    categories: ['Roofing', 'Roof Repair', 'Roof Replacement', 'Gutters'],
    services: ['Residential Roofing', 'Leak Repair', 'Shingle Replacement', 'Seamless Gutters'],
    rating: 4.9,
    reviews: 142,
    city: 'Jonesboro, AR',
    area: 'Craighead County & Northeast AR',
    covers: ['Jonesboro', 'Paragould', 'Trumann', 'Harrisburg', 'Blytheville', 'Newport'],
    initials: 'CS',
    accent: '#1D6E8E',
    responds: 'Responds in about 1 hour',
    blurb: 'Dedicated residential roofing installations, shingle repair, and custom gutter systems.',
    about: 'Charles Sharp Roofing has proudly served Arkansas homeowners with high-quality roof repairs, full roof replacements, and prompt storm damage assessments.'
  },
  {
    id: 'chase-robertson-roofing',
    name: 'Chase Robertson Roofing',
    demo: false,
    tradewellScore: 96,
    category: 'Roofing',
    categories: ['Roofing', 'Roof Replacement', 'Metal Roofing', 'Storm Damage Repair'],
    services: ['Architectural Shingles', 'Standing Seam Metal', 'Storm Inspection', 'Reroofing'],
    rating: 4.8,
    reviews: 118,
    city: 'Searcy, AR',
    area: 'White County & Central AR',
    covers: ['Searcy', 'Beebe', 'Bald Knob', 'Cabot', 'Heber Springs', 'Conway'],
    initials: 'CR',
    accent: '#2F7A4E',
    responds: 'Responds in about 2 hours',
    blurb: 'Quality metal and shingle roofing systems engineered for Arkansas climate.',
    about: 'Chase Robertson Roofing specializes in durable residential roofing solutions, from emergency storm damage repair to architectural shingle installations.'
  },
  {
    id: 'prime-roofing',
    name: 'Prime Roofing',
    demo: false,
    tradewellScore: 97,
    category: 'Roofing',
    categories: ['Roofing', 'Roof Repair', 'Commercial Roofing', 'Gutters'],
    services: ['Complete Reroof', 'Roof Inspections', 'Flat Roofing', 'Gutters & Downspouts'],
    rating: 4.8,
    reviews: 164,
    city: 'Little Rock, AR',
    area: 'Pulaski County & Metro Area',
    covers: ['Little Rock', 'North Little Rock', 'Sherwood', 'Benton', 'Conway', 'Jacksonville'],
    initials: 'PR',
    accent: '#6B4E9B',
    responds: 'Responds in about 3 hours',
    blurb: 'Comprehensive residential and light commercial roofing contractor.',
    about: 'Prime Roofing provides premium roofing replacements, high-wind shingle installations, and fast leak repairs across Central Arkansas.'
  },

  /* ---------------- Home repairs ---------------- */
  {
    id: 'markley-construction',
    name: 'Markley Construction Inc',
    demo: false,
    tradewellScore: 98,
    category: 'Home repairs',
    categories: ['Home repairs', 'General Contractors', 'Drywall', 'Carpentry'],
    services: ['Structural Repairs', 'Finish Carpentry', 'Drywall Repair', 'Home Renovations'],
    rating: 4.9,
    reviews: 135,
    city: 'Cabot, AR',
    area: 'Lonoke County & Central AR',
    covers: ['Cabot', 'Jacksonville', 'Sherwood', 'Beebe', 'Little Rock'],
    initials: 'MC',
    accent: '#B5761F',
    responds: 'Responds in about 2 hours',
    blurb: 'General home repairs, structural carpentry, and turnkey residential improvements.',
    about: 'Markley Construction Inc delivers reliable home repair solutions including framing, rot repair, interior patching, and exterior envelope fixes.'
  },
  {
    id: 'fuller-construction',
    name: 'Fuller Construction',
    demo: false,
    category: 'Home repairs',
    categories: ['Home repairs', 'Handyman', 'Remodeling', 'Siding'],
    services: ['Home Maintenance', 'Siding Repair', 'Door & Window Trim', 'Deck Repairs'],
    rating: 4.8,
    reviews: 98,
    city: 'Conway, AR',
    area: 'Faulkner County',
    covers: ['Conway', 'Greenbrier', 'Little Rock', 'Maumelle'],
    initials: 'FC',
    accent: '#46586A',
    responds: 'Responds in about 3 hours',
    blurb: 'Expert residential construction, punch-list repairs, and exterior maintenance.',
    about: 'Fuller Construction assists homeowners with essential structural repairs, siding patching, deck refurbishments, and general carpentry.'
  },

  /* ---------------- HVAC (Commercial) ---------------- */
  {
    id: 'townsend-heat-air',
    name: 'Townsend Heat and Air',
    demo: false,
    category: 'HVAC (Commercial)',
    categories: ['HVAC (Commercial)', 'HVAC', 'AC Repair', 'Commercial Heating'],
    services: ['Commercial HVAC', 'Rooftop Units', 'Chillers & Heat Pumps', 'Preventative Maintenance'],
    rating: 4.9,
    reviews: 176,
    city: 'Jonesboro, AR',
    area: 'Craighead County & Northeast AR',
    covers: ['Jonesboro', 'Paragould', 'Trumann', 'Newport', 'Blytheville'],
    initials: 'TH',
    accent: '#D9534F',
    responds: 'Responds in about 1 hour',
    blurb: 'Full-service commercial and residential heating, cooling, and ventilation systems.',
    about: 'Townsend Heat and Air is a premier HVAC contractor handling commercial packaged rooftop units, split system repairs, duct design, and emergency cooling.'
  },
  {
    id: 'prestige-heating-cooling',
    name: 'Prestige Heating and Cooling',
    demo: false,
    category: 'HVAC (Commercial)',
    categories: ['HVAC (Commercial)', 'HVAC', 'Furnace Repair', 'Air Conditioning'],
    services: ['Commercial Air Conditioning', 'Heating Repair', 'Ventilation', 'System Replacements'],
    rating: 4.8,
    reviews: 149,
    city: 'Little Rock, AR',
    area: 'Pulaski County & Metro Area',
    covers: ['Little Rock', 'North Little Rock', 'Benton', 'Bryant', 'Sherwood'],
    initials: 'PH',
    accent: '#2C7A8C',
    responds: 'Responds in about 2 hours',
    blurb: 'High-efficiency commercial HVAC installations and rapid emergency cooling repair.',
    about: 'Prestige Heating and Cooling specializes in commercial climate control, energy-efficient heat pump systems, and industrial HVAC maintenance.'
  },
  {
    id: 'jasons-heat-air',
    name: 'Jason’s Heat and Air',
    demo: false,
    category: 'HVAC (Commercial)',
    categories: ['HVAC (Commercial)', 'HVAC', 'AC Repair', 'Heat Pumps'],
    services: ['Commercial Maintenance', 'AC Tune-Ups', 'Gas Furnaces', 'Ductless Mini-Splits'],
    rating: 4.9,
    reviews: 122,
    city: 'Searcy, AR',
    area: 'White County',
    covers: ['Searcy', 'Beebe', 'Bald Knob', 'Heber Springs', 'Cabot'],
    initials: 'JH',
    accent: '#FCAF21',
    responds: 'Responds in about 2 hours',
    blurb: 'Dependable commercial & residential HVAC diagnostics, installations, and repairs.',
    about: 'Jason’s Heat and Air provides honest, expert service for commercial offices, retail buildings, and homes across White County and beyond.'
  },

  /* ---------------- Electrical ---------------- */
  {
    id: 'mws-electrical',
    name: 'MWS Electrical',
    demo: false,
    category: 'Electrical',
    categories: ['Electrical', 'Commercial Electrical', 'Panel Upgrades', 'Generators'],
    services: ['Commercial Wiring', 'Service Panel Upgrades', 'Lighting Retrofits', 'Generator Installs'],
    rating: 4.9,
    reviews: 154,
    city: 'Jonesboro, AR',
    area: 'Craighead County & Northeast AR',
    covers: ['Jonesboro', 'Paragould', 'Trumann', 'Harrisburg', 'Blytheville'],
    initials: 'MW',
    accent: '#F5A623',
    responds: 'Responds in about 1 hour',
    blurb: 'Master licensed electricians delivering commercial power, lighting, and safety upgrades.',
    about: 'MWS Electrical handles full electrical builds, code compliance inspections, high-voltage equipment hookups, and backup generator systems.'
  },
  {
    id: 'wilkins-electrical',
    name: 'Wilkins Electrical',
    demo: false,
    category: 'Electrical',
    categories: ['Electrical', 'Commercial Wiring', 'EV Chargers', 'Safety Inspections'],
    services: ['Commercial Circuits', 'Breaker Panels', 'EV Charger Install', 'Troubleshooting'],
    rating: 4.8,
    reviews: 116,
    city: 'Cabot, AR',
    area: 'Lonoke County & Central AR',
    covers: ['Cabot', 'Jacksonville', 'Sherwood', 'Little Rock', 'Beebe'],
    initials: 'WE',
    accent: '#B5761F',
    responds: 'Responds in about 2 hours',
    blurb: 'Precision electrical contracting for commercial facilities and modern residences.',
    about: 'Wilkins Electrical provides prompt electrical troubleshooting, heavy-up panel replacements, and commercial lighting installations.'
  },

  /* ---------------- Lawn/Garden ---------------- */
  {
    id: 'lacey-turf-property',
    name: 'Lacey Turf and Property Services',
    demo: false,
    category: 'Lawn/Garden',
    categories: ['Lawn/Garden', 'Landscaping', 'Lawn Care', 'Weed Control'],
    services: ['Turf Management', 'Weed & Feed Programs', 'Commercial Grounds Care', 'Aeration & Seeding'],
    rating: 4.9,
    reviews: 148,
    city: 'Jonesboro, AR',
    area: 'Craighead County & Northeast AR',
    covers: ['Jonesboro', 'Paragould', 'Brookland', 'Trumann'],
    initials: 'LT',
    accent: '#2F7A4E',
    responds: 'Responds in about 2 hours',
    blurb: 'Specialized turf care, weed control programs, and commercial grounds maintenance.',
    about: 'Lacey Turf and Property Services turns Arkansas lawns into lush, healthy green turf with professional fertilization, weed control, and property upkeep.'
  },
  {
    id: 'tj-lawn-service',
    name: 'T&J lawn Service',
    demo: false,
    category: 'Lawn/Garden',
    categories: ['Lawn/Garden', 'Lawn Care', 'Mowing', 'Seasonal Cleanups'],
    services: ['Scheduled Mowing', 'Edging & Trimming', 'Leaf Removal', 'Mulching & Bed Care'],
    rating: 4.8,
    reviews: 92,
    city: 'Searcy, AR',
    area: 'White County',
    covers: ['Searcy', 'Beebe', 'Bald Knob', 'Kensett'],
    initials: 'TJ',
    accent: '#3F8442',
    responds: 'Responds in about 3 hours',
    blurb: 'Reliable weekly lawn mowing, precision edging, and seasonal yard cleanups.',
    about: 'T&J lawn Service keeps residential and commercial properties impeccably manicured with dependable scheduling and detail-oriented yard care.'
  },
  {
    id: 'salinas-lawn-landscape',
    name: 'Salina’s lawn and landscape',
    demo: false,
    category: 'Lawn/Garden',
    categories: ['Lawn/Garden', 'Landscaping', 'Hardscape', 'Irrigation'],
    services: ['Landscape Design', 'Sod Installation', 'Mulch & Rock Beds', 'Drainage Solutions'],
    rating: 4.9,
    reviews: 167,
    city: 'Little Rock, AR',
    area: 'Pulaski County & Metro Area',
    covers: ['Little Rock', 'North Little Rock', 'Benton', 'Bryant', 'Sherwood', 'Maumelle'],
    initials: 'SL',
    accent: '#2E8B6B',
    responds: 'Responds in about 2 hours',
    blurb: 'Complete landscape design, sod laying, stone flowerbeds, and seasonal grounds care.',
    about: 'Salina’s lawn and landscape provides high-end landscaping, outdoor transformations, French drains, and recurring lawn maintenance.'
  }
];

export const REVIEW_POOL: ReviewItem[] = [
  { name: 'Marcus T.', stars: 5, days: 12, text: 'Showed up when they said they would, quoted in writing, and the final invoice matched the quote. No surprises.' },
  { name: 'Dana R.', stars: 5, days: 26, text: 'Explained what actually needed doing versus what could wait. I appreciated not being upsold.' },
  { name: 'Priya S.', stars: 5, days: 41, text: 'Left the place cleaner than they found it. Small thing, but it says a lot.' },
  { name: 'Kyle B.', stars: 4, days: 58, text: 'Solid work and fair pricing. Kept me updated throughout the work.' },
  { name: 'Alicia M.', stars: 5, days: 9, text: 'Called back quickly and had our estimate sorted promptly. Highly professional.' },
  { name: 'Grant W.', stars: 5, days: 73, text: 'Second time using them. Same crew, same standard. That consistency is why I called again.' },
  { name: 'Terrell J.', stars: 5, days: 33, text: 'Walked me through the options with photos before starting. Made the decision easy.' },
  { name: 'Hollis P.', stars: 5, days: 17, text: 'Fair quote, no pressure, and they honoured it even when the job turned out bigger than expected.' },
  { name: 'Jared O.', stars: 5, days: 5, text: 'Straightforward from the first call. Quote by email the same day, work booked for that week.' }
];

export const ARTICLES: ArticleItem[] = [
  {
    tag: 'Cost guide',
    title: 'What a roof replacement really costs in Arkansas',
    blurb: 'How square footage, pitch and material choice move the number, and where estimates usually differ.',
    read: '6 min read',
    img: '/assets/img/roof-replacement.jpg',
    topic: 'Roofing'
  },
  {
    tag: 'Advice',
    title: 'Questions worth asking before you hire any contractor',
    blurb: 'Nine questions that separate a solid quote from one that will grow once work starts.',
    read: '4 min read',
    img: '/assets/img/handyman.jpg',
    topic: 'Home repairs'
  },
  {
    tag: 'Seasonal',
    title: 'Getting your Commercial HVAC through an Arkansas summer',
    blurb: 'The maintenance that actually matters, and the warning signs worth calling about early.',
    read: '5 min read',
    img: '/assets/img/hvac.jpg',
    topic: 'HVAC (Commercial)'
  }
];

export const STATS: StatItem[] = [
  { value: '14+', label: 'Verified Arkansas Pros' },
  { value: '5', label: 'Core Trade Categories' },
  { value: '22', label: 'Arkansas Cities Covered' },
  { value: 'Free', label: 'To Drop Info & Get Estimates' }
];

export const STEPS: StepItem[] = [
  { n: '1', title: 'Choose Your Trade', body: 'Select from Roofing, Home Repairs, Commercial HVAC, Electrical, or Lawn & Garden.' },
  { n: '2', title: 'Drop Your Project Info', body: 'Send your project details directly to the pros. Free, with zero obligation to hire.' },
  { n: '3', title: 'Connect & Get An Estimate', body: 'Verified local pros contact you promptly with clear estimates and reliable timelines.' }
];

/* --------------------------------------------------------------------- */
/* Algorithms & Helper Functions                                         */
/* --------------------------------------------------------------------- */

export const norm = (s: string | null | undefined): string => String(s || '').toLowerCase().trim();
export const clamp = (n: number, lo: number, hi: number): number => Math.max(lo, Math.min(hi, n));

export const CAT_FAMILY: Record<string, string> = {};
Object.keys(FAMILIES).forEach((key) => {
  FAMILIES[key].cats.forEach((c) => {
    CAT_FAMILY[norm(c)] = key;
  });
});

export function familyFor(term: string): string | null {
  const t = norm(term);
  if (!t) return null;
  if (CAT_FAMILY[t]) return CAT_FAMILY[t];

  let best: string | null = null;
  let bestLen = 0;
  CATEGORIES.forEach((c) => {
    const n = norm(c.name);
    if ((t.indexOf(n) !== -1 || n.indexOf(t) !== -1) && n.length > bestLen && CAT_FAMILY[n]) {
      best = CAT_FAMILY[n];
      bestLen = n.length;
    }
  });
  if (best) return best;

  let hit: string | null = null;
  Object.keys(FAMILIES).forEach((key) => {
    if (hit) return;
    if (FAMILIES[key].keywords.some((k) => t.indexOf(k) !== -1)) hit = key;
  });
  return hit;
}

const kwCache: Record<string, RegExp> = {};
export function keywordHit(text: string, keyword: string): boolean {
  let re = kwCache[keyword];
  if (!re) {
    re = kwCache[keyword] = new RegExp('\\b' + keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  }
  return re.test(text);
}

export function familyDepth(pro: Pro, familyKey: string | null): number {
  if (!familyKey) return 0;
  const fam = FAMILIES[familyKey];
  if (!fam) return 0;
  let hits = 0;
  pro.categories.forEach((c) => {
    if (fam.cats.indexOf(c) !== -1) hits++;
  });
  pro.services.forEach((s) => {
    const n = norm(s);
    if (fam.keywords.some((k) => keywordHit(n, k))) hits++;
  });
  return hits;
}

export function scorePro(pro: Pro, term: string, city: string): number {
  const t = norm(term);
  const family = familyFor(t);

  /* relevance */
  let serviceMatch = 0;
  if (!t) {
    serviceMatch = 18;
  } else {
    const cats = pro.categories.map(norm);
    const svcs = pro.services.map(norm);
    if (norm(pro.category) === t) serviceMatch = 30;
    else if (family && CAT_FAMILY[norm(pro.category)] === family) serviceMatch = 26;
    else if (cats.indexOf(t) !== -1) serviceMatch = 22;
    else if (cats.some((c) => keywordHit(c, t))) serviceMatch = 18;
    else if (svcs.some((s) => keywordHit(s, t))) serviceMatch = 14;
    else if (keywordHit(norm(pro.name), t)) serviceMatch = 24;
    else return 0;
  }
  serviceMatch += Math.min(20, familyDepth(pro, family) * 2.5);

  /* location */
  let locationMatch = 14;
  if (city) {
    const c = norm(city).split(',')[0].trim();
    locationMatch = pro.covers.some((x) => norm(x) === c) ? 20 : 6;
  }

  /* quality */
  const ratingScore = clamp((pro.rating - 4.0) * 30, 0, 30);
  const reviewScore = pro.reviews == null
    ? 5
    : Math.min(10, (10 * Math.log10(pro.reviews + 1)) / Math.log10(400));

  /* Valor Roofing LLC priority boost */
  const featuredBoost = pro.featured ? 15 : 0;

  return serviceMatch + locationMatch + ratingScore + reviewScore + featuredBoost;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function dateFrom(daysAgo: number): string {
  const d = new Date(Date.now() - daysAgo * 86400000);
  return MONTHS[d.getMonth()] + ' ' + d.getFullYear();
}

const reviewCache: Record<string, ReviewItem[]> = {};
export function reviewsFor(pro: Pro): ReviewItem[] {
  if (pro.ratingOnly) return [];
  if (reviewCache[pro.id]) return reviewCache[pro.id];

  let seed = 0;
  for (let i = 0; i < pro.id.length; i++) seed += pro.id.charCodeAt(i) * (i + 1);

  const pool = pro.rating >= 4.75
    ? REVIEW_POOL.filter((r) => r.stars === 5)
    : REVIEW_POOL;

  const out: ReviewItem[] = [];
  for (let i = 0; i < 3; i++) {
    const r = pool[(seed + i * 5) % pool.length];
    out.push({
      name: r.name,
      stars: r.stars,
      days: r.days,
      text: r.text,
      date: dateFrom(r.days + (seed % 20)),
      service: pro.services[i % pro.services.length]
    });
  }
  reviewCache[pro.id] = out;
  return out;
}

export const byId = (id: string): Pro | undefined => PROS.find((p) => p.id === id);
export const galleryFor = (pro: Pro): string[] =>
  pro.gallery && pro.gallery.length > 0
    ? pro.gallery
    : IMAGES[pro.category] || IMAGES[pro.categories[0]] || IMAGES.Roofing;
export const isTopRated = (pro: Pro): boolean => pro.rating >= 4.9;
export const isFast = (pro: Pro): boolean => /hour|same day/i.test(pro.responds);

export function rankedFor(term: string, limit: number): Pro[] {
  return PROS
    .map((p) => ({ pro: p, score: scorePro(p, term, '') }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.pro);
}

export function displayTerm(term: string): string {
  if (!term) return '';
  const hit = CATEGORIES.find((c) => norm(c.name) === norm(term));
  if (hit) return hit.name;
  return term.replace(/\b[a-z]/g, (ch) => ch.toUpperCase());
}

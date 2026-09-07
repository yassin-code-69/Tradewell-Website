/* ============================================================================
   Tradewell — Home Services Directory Data & Logic
   TypeScript port of the original dataset & ranking engine
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
  name: 'Tradewell',
  tagline: 'All Home Services',
  title: 'Tradewell — Find Trusted Home Service Professionals in Arkansas',
  blurb: 'An independent directory covering every home service trade, connecting Arkansas homeowners with local professionals.'
};

export const CLIENT: ClientInfo = {
  name: 'Valor Roofing LLC',
  phone: '+1 870-316-8800',
  phoneHref: 'tel:+18703168800',
  area: 'Northeast & Central Arkansas',
  category: 'Roofing Contractor',
  rating: 5.0,
  reviewCount: null,
  services: ['Roofing', 'Roof Repair', 'Roof Replacement', 'Storm Damage']
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

export const CATEGORIES: Category[] = [
  { name: 'Roofing', group: 'Roofing & Exteriors', icon: 'roof', pros: 148 },
  { name: 'Roof Repair', group: 'Roofing & Exteriors', icon: 'hammer', pros: 136 },
  { name: 'Roof Replacement', group: 'Roofing & Exteriors', icon: 'roof', pros: 121 },
  { name: 'Storm Damage Repair', group: 'Roofing & Exteriors', icon: 'shield', pros: 88 },
  { name: 'Gutters', group: 'Roofing & Exteriors', icon: 'droplet', pros: 94 },
  { name: 'Siding', group: 'Roofing & Exteriors', icon: 'layers', pros: 82 },
  { name: 'Windows', group: 'Roofing & Exteriors', icon: 'window', pros: 106 },
  { name: 'Doors', group: 'Roofing & Exteriors', icon: 'door', pros: 91 },
  { name: 'Garage Doors', group: 'Roofing & Exteriors', icon: 'garage', pros: 67 },
  { name: 'Chimney Service', group: 'Roofing & Exteriors', icon: 'chimney', pros: 43 },
  { name: 'Solar Installation', group: 'Roofing & Exteriors', icon: 'sun', pros: 38 },
  { name: 'Pressure Washing', group: 'Roofing & Exteriors', icon: 'spray', pros: 72 },

  { name: 'Plumbing', group: 'Home Systems', icon: 'pipe', pros: 164 },
  { name: 'Drain Cleaning', group: 'Home Systems', icon: 'droplet', pros: 118 },
  { name: 'Water Heater Service', group: 'Home Systems', icon: 'flame', pros: 97 },
  { name: 'HVAC', group: 'Home Systems', icon: 'flame', pros: 152 },
  { name: 'AC Repair', group: 'Home Systems', icon: 'sun', pros: 139 },
  { name: 'Furnace Repair', group: 'Home Systems', icon: 'flame', pros: 111 },
  { name: 'Air Duct Cleaning', group: 'Home Systems', icon: 'spray', pros: 58 },
  { name: 'Electrical', group: 'Home Systems', icon: 'bolt', pros: 143 },
  { name: 'Generator Installation', group: 'Home Systems', icon: 'bolt', pros: 41 },
  { name: 'Insulation', group: 'Home Systems', icon: 'layers', pros: 63 },
  { name: 'Home Security', group: 'Home Systems', icon: 'shield', pros: 54 },
  { name: 'Septic Service', group: 'Home Systems', icon: 'pipe', pros: 36 },

  { name: 'General Contractors', group: 'Remodeling & Interiors', icon: 'hammer', pros: 128 },
  { name: 'Kitchen Remodeling', group: 'Remodeling & Interiors', icon: 'home', pros: 99 },
  { name: 'Bathroom Remodeling', group: 'Remodeling & Interiors', icon: 'droplet', pros: 104 },
  { name: 'Basement Remodeling', group: 'Remodeling & Interiors', icon: 'layers', pros: 47 },
  { name: 'Flooring', group: 'Remodeling & Interiors', icon: 'layers', pros: 117 },
  { name: 'Carpet Installation', group: 'Remodeling & Interiors', icon: 'layers', pros: 61 },
  { name: 'Tile Work', group: 'Remodeling & Interiors', icon: 'layers', pros: 74 },
  { name: 'Drywall', group: 'Remodeling & Interiors', icon: 'layers', pros: 86 },
  { name: 'Cabinetry', group: 'Remodeling & Interiors', icon: 'box', pros: 52 },
  { name: 'Countertops', group: 'Remodeling & Interiors', icon: 'box', pros: 58 },
  { name: 'Painting', group: 'Remodeling & Interiors', icon: 'brush', pros: 133 },
  { name: 'Interior Painting', group: 'Remodeling & Interiors', icon: 'brush', pros: 124 },
  { name: 'Exterior Painting', group: 'Remodeling & Interiors', icon: 'brush', pros: 108 },
  { name: 'Handyman', group: 'Remodeling & Interiors', icon: 'wrench', pros: 176 },

  { name: 'Landscaping', group: 'Outdoor & Structures', icon: 'leaf', pros: 141 },
  { name: 'Lawn Care', group: 'Outdoor & Structures', icon: 'leaf', pros: 158 },
  { name: 'Tree Service', group: 'Outdoor & Structures', icon: 'tree', pros: 96 },
  { name: 'Irrigation & Sprinklers', group: 'Outdoor & Structures', icon: 'droplet', pros: 44 },
  { name: 'Fencing', group: 'Outdoor & Structures', icon: 'fence', pros: 87 },
  { name: 'Concrete', group: 'Outdoor & Structures', icon: 'concrete', pros: 79 },
  { name: 'Driveway Paving', group: 'Outdoor & Structures', icon: 'concrete', pros: 65 },
  { name: 'Decks', group: 'Outdoor & Structures', icon: 'deck', pros: 71 },
  { name: 'Patios', group: 'Outdoor & Structures', icon: 'deck', pros: 68 },
  { name: 'Masonry', group: 'Outdoor & Structures', icon: 'concrete', pros: 49 },
  { name: 'Foundation Repair', group: 'Outdoor & Structures', icon: 'home', pros: 42 },
  { name: 'Pool Service', group: 'Outdoor & Structures', icon: 'pool', pros: 39 },
  { name: 'Outdoor Lighting', group: 'Outdoor & Structures', icon: 'bolt', pros: 33 },

  { name: 'House Cleaning', group: 'Cleaning & Home Care', icon: 'sparkle', pros: 167 },
  { name: 'Carpet Cleaning', group: 'Cleaning & Home Care', icon: 'broom', pros: 112 },
  { name: 'Window Cleaning', group: 'Cleaning & Home Care', icon: 'window', pros: 57 },
  { name: 'Gutter Cleaning', group: 'Cleaning & Home Care', icon: 'droplet', pros: 83 },
  { name: 'Junk Removal', group: 'Cleaning & Home Care', icon: 'truck', pros: 76 },
  { name: 'Moving Services', group: 'Cleaning & Home Care', icon: 'truck', pros: 92 },
  { name: 'Pest Control', group: 'Cleaning & Home Care', icon: 'bug', pros: 129 },
  { name: 'Appliance Repair', group: 'Cleaning & Home Care', icon: 'wrench', pros: 101 },
  { name: 'Water Damage Restoration', group: 'Cleaning & Home Care', icon: 'droplet', pros: 55 },
  { name: 'Mold Remediation', group: 'Cleaning & Home Care', icon: 'shield', pros: 37 },
  { name: 'Home Inspection', group: 'Cleaning & Home Care', icon: 'clipboard', pros: 64 },
  { name: 'Locksmith', group: 'Cleaning & Home Care', icon: 'lock', pros: 45 }
];

export const FAMILIES: Record<string, TradeFamily> = {
  roofing: {
    cats: ['Roofing', 'Roof Repair', 'Roof Replacement', 'Storm Damage Repair', 'Gutters'],
    keywords: ['roof', 'shingle', 'gutter', 'storm']
  },
  plumbing: {
    cats: ['Plumbing', 'Drain Cleaning', 'Water Heater Service', 'Septic Service'],
    keywords: ['plumb', 'drain', 'water heater', 'sewer', 'pipe', 'leak', 'slab']
  },
  hvac: {
    cats: ['HVAC', 'AC Repair', 'Furnace Repair', 'Air Duct Cleaning'],
    keywords: ['hvac', 'furnace', 'ac ', 'duct', 'heat pump', 'thermostat', 'mini split', 'cooling']
  },
  electrical: {
    cats: ['Electrical', 'Generator Installation', 'Outdoor Lighting', 'Home Security'],
    keywords: ['electric', 'panel', 'generator', 'wiring', 'lighting', 'ev charger']
  },
  cleaning: {
    cats: ['House Cleaning', 'Carpet Cleaning', 'Window Cleaning', 'Gutter Cleaning'],
    keywords: ['clean', 'deep clean', 'move-out', 'recurring']
  },
  landscaping: {
    cats: ['Landscaping', 'Lawn Care', 'Tree Service', 'Irrigation & Sprinklers'],
    keywords: ['landscap', 'lawn', 'tree', 'sod', 'mow', 'hardscape', 'stump', 'irrigation']
  },
  painting: {
    cats: ['Painting', 'Interior Painting', 'Exterior Painting'],
    keywords: ['paint', 'cabinet refinish']
  },
  flooring: {
    cats: ['Flooring', 'Carpet Installation', 'Tile Work'],
    keywords: ['floor', 'lvp', 'hardwood', 'tile', 'carpet']
  },
  remodeling: {
    cats: ['General Contractors', 'Kitchen Remodeling', 'Bathroom Remodeling', 'Basement Remodeling', 'Drywall', 'Cabinetry', 'Countertops'],
    keywords: ['remodel', 'kitchen', 'bath', 'addition', 'drywall', 'cabinet', 'countertop', 'framing']
  },
  handyman: {
    cats: ['Handyman', 'Appliance Repair', 'Doors'],
    keywords: ['handyman', 'repair', 'mounting', 'assembly', 'punch list']
  },
  pest: {
    cats: ['Pest Control', 'Mold Remediation'],
    keywords: ['pest', 'termite', 'rodent', 'mold']
  },
  exterior: {
    cats: ['Windows', 'Doors', 'Siding', 'Garage Doors', 'Pressure Washing'],
    keywords: ['window', 'door', 'siding', 'garage', 'pressure wash']
  }
};

export const IMAGES: Record<string, string[]> = {
  'Roofing': ['/assets/img/roofing.jpg', '/assets/img/roofing-2.jpg', '/assets/img/roofing-3.jpg'],
  'Plumbing': ['/assets/img/plumbing.jpg', '/assets/img/plumbing-2.jpg', '/assets/img/bathroom.jpg'],
  'HVAC': ['/assets/img/hvac.jpg', '/assets/img/hvac-2.jpg', '/assets/img/electrical.jpg'],
  'Electrical': ['/assets/img/electrical.jpg', '/assets/img/electrical-2.jpg', '/assets/img/handyman.jpg'],
  'House Cleaning': ['/assets/img/cleaning.jpg', '/assets/img/cleaning-2.jpg', '/assets/img/kitchen.jpg'],
  'Landscaping': ['/assets/img/landscaping.jpg', '/assets/img/landscaping-2.jpg', '/assets/img/handyman.jpg'],
  'Painting': ['/assets/img/painting.jpg', '/assets/img/kitchen-2.jpg', '/assets/img/windows.jpg'],
  'Flooring': ['/assets/img/flooring.jpg', '/assets/img/flooring-2.jpg', '/assets/img/kitchen.jpg'],
  'General Contractors': ['/assets/img/kitchen.jpg', '/assets/img/bathroom.jpg', '/assets/img/flooring.jpg'],
  'Handyman': ['/assets/img/handyman.jpg', '/assets/img/painting.jpg', '/assets/img/windows.jpg'],
  'Pest Control': ['/assets/img/pest.jpg', '/assets/img/landscaping-2.jpg', '/assets/img/handyman.jpg'],
  'Windows': ['/assets/img/windows.jpg', '/assets/img/painting.jpg', '/assets/img/roofing-3.jpg'],
  'Tree Service': ['/assets/img/landscaping-2.jpg', '/assets/img/landscaping.jpg', '/assets/img/handyman.jpg']
};

export const SERVICES: ServiceItem[] = [
  { name: 'Roofing', icon: 'roof', img: '/assets/img/roofing.jpg', blurb: 'Repairs, replacements and storm damage inspections.', cost: '$450 – $14,800' },
  { name: 'Plumbing', icon: 'pipe', img: '/assets/img/plumbing.jpg', blurb: 'Leaks, drains, water heaters and full repipes.', cost: '$180 – $3,200' },
  { name: 'HVAC', icon: 'flame', img: '/assets/img/hvac.jpg', blurb: 'Heating and cooling service, repair and install.', cost: '$220 – $9,500' },
  { name: 'Electrical', icon: 'bolt', img: '/assets/img/electrical.jpg', blurb: 'Panels, rewiring, generators and troubleshooting.', cost: '$190 – $4,600' },
  { name: 'House Cleaning', icon: 'sparkle', img: '/assets/img/cleaning.jpg', blurb: 'Deep cleans, move-outs and recurring service.', cost: '$120 – $480' },
  { name: 'Landscaping', icon: 'leaf', img: '/assets/img/landscaping.jpg', blurb: 'Design, sod, hardscape and season-long upkeep.', cost: '$260 – $7,400' },
  { name: 'Painting', icon: 'brush', img: '/assets/img/painting.jpg', blurb: 'Interior and exterior repaints and refinishing.', cost: '$380 – $6,900' },
  { name: 'Flooring', icon: 'layers', img: '/assets/img/flooring.jpg', blurb: 'Hardwood, LVP, tile and carpet installation.', cost: '$900 – $11,200' },
  { name: 'Remodeling', icon: 'hammer', img: '/assets/img/kitchen-2.jpg', blurb: 'Kitchens, baths, basements and room additions.', cost: '$4,500 – $68,000', maps: 'General Contractors' },
  { name: 'Handyman', icon: 'wrench', img: '/assets/img/handyman.jpg', blurb: 'Small repairs, mounting, assembly and punch lists.', cost: '$95 – $850' },
  { name: 'Pest Control', icon: 'bug', img: '/assets/img/pest.jpg', blurb: 'Termite inspections, rodents and quarterly plans.', cost: '$140 – $1,900' },
  { name: 'Windows', icon: 'window', img: '/assets/img/windows.jpg', blurb: 'Replacement windows, glass and weatherproofing.', cost: '$420 – $12,600' }
];

export const PROJECTS: ProjectItem[] = [
  { name: 'Roof Repair', img: '/assets/img/roof-repair.jpg', cost: '$450 – $2,100', span: '1 – 2 days' },
  { name: 'Roof Replacement', img: '/assets/img/roof-replacement.jpg', cost: '$8,400 – $22,000', span: '2 – 5 days' },
  { name: 'Bathroom Remodeling', img: '/assets/img/bathroom.jpg', cost: '$6,200 – $28,000', span: '2 – 5 weeks' },
  { name: 'Kitchen Remodeling', img: '/assets/img/kitchen.jpg', cost: '$14,000 – $68,000', span: '4 – 10 weeks' },
  { name: 'HVAC', img: '/assets/img/hvac-2.jpg', cost: '$5,100 – $12,900', span: '1 – 2 days', label: 'HVAC Installation' },
  { name: 'Plumbing', img: '/assets/img/plumbing-2.jpg', cost: '$180 – $1,400', span: 'Same day', label: 'Plumbing Repair' },
  { name: 'Exterior Painting', img: '/assets/img/painting.jpg', cost: '$2,900 – $9,600', span: '3 – 8 days' },
  { name: 'Flooring', img: '/assets/img/flooring-2.jpg', cost: '$2,400 – $11,200', span: '2 – 6 days', label: 'Flooring Installation' },
  { name: 'Landscaping', img: '/assets/img/landscaping.jpg', cost: '$1,800 – $14,500', span: '1 – 3 weeks', label: 'Landscape Design' }
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
  /* Roofing */
  {
    id: 'valor-roofing', name: 'Valor Roofing LLC', demo: false,
    category: 'Roofing',
    categories: ['Roofing', 'Roof Repair', 'Roof Replacement', 'Storm Damage Repair', 'Gutters', 'Siding'],
    services: CLIENT.services,
    rating: CLIENT.rating, reviews: CLIENT.reviewCount, ratingOnly: true,
    city: 'Northeast & Central Arkansas', area: CLIENT.area, covers: NE_AR.concat(CENTRAL_AR),
    phone: CLIENT.phone, phoneHref: CLIENT.phoneHref,
    initials: 'VR', accent: '#B8402C', responds: 'Typically responds same day',
    blurb: 'Roof repair, full replacement and storm damage work across Northeast and Central Arkansas.',
    about: 'Valor Roofing LLC is a roofing contractor serving homeowners throughout Northeast and Central Arkansas. The company handles roof repair, complete roof replacement, storm damage work and gutters, covering both the Jonesboro region and the Central Arkansas corridor.'
  },
  {
    id: 'ridgeline', name: 'Ridgeline Roofing Co.', demo: true, category: 'Roofing',
    categories: ['Roofing', 'Roof Repair', 'Gutters'], services: ['Roof Repair', 'Shingle Roofing', 'Gutters'],
    rating: 4.8, reviews: 214, city: 'Jonesboro, AR', area: 'Craighead County',
    covers: ['Jonesboro', 'Paragould', 'Trumann', 'Harrisburg'],
    initials: 'RR', accent: '#1D6E8E', responds: 'Responds in about 2 hours',
    blurb: 'Residential shingle and metal roofing with a dedicated repair crew.',
    about: 'A residential roofing company focused on shingle and standing-seam metal roofs, with a separate crew kept free for same-week repair calls.'
  },
  {
    id: 'summit-crest', name: 'Summit Crest Roofing & Exteriors', demo: true, category: 'Roofing',
    categories: ['Roofing', 'Roof Replacement', 'Siding', 'Windows'], services: ['Roof Replacement', 'Siding', 'Windows'],
    rating: 4.7, reviews: 168, city: 'Searcy, AR', area: 'White County',
    covers: ['Searcy', 'Beebe', 'Bald Knob', 'Cabot'],
    initials: 'SC', accent: '#2F7A4E', responds: 'Responds in about 4 hours',
    blurb: 'Full exterior contractor covering roofing, siding and window packages.',
    about: 'An exterior contractor that bundles roofing with siding and window replacement, which tends to suit whole-envelope projects rather than single repairs.'
  },
  {
    id: 'northgate', name: 'Northgate Roof & Construction', demo: true, category: 'Roofing',
    categories: ['Roofing', 'Storm Damage Repair', 'General Contractors'], services: ['Storm Damage', 'Roof Repair', 'Framing'],
    rating: 4.6, reviews: 132, city: 'Cabot, AR', area: 'Lonoke County',
    covers: ['Cabot', 'Jacksonville', 'Beebe', 'Sherwood'],
    initials: 'NG', accent: '#6B4E9B', responds: 'Responds within a day',
    blurb: 'Storm restoration and general construction for residential properties.',
    about: 'Works primarily on storm restoration, carrying framing and structural capability in-house for jobs that go past the roof deck.'
  },
  {
    id: 'cedar-hollow', name: 'Cedar Hollow Roofing Services', demo: true, category: 'Roofing',
    categories: ['Roofing', 'Roof Repair', 'Gutters'], services: ['Roof Inspection', 'Leak Repair', 'Gutter Guards'],
    rating: 4.5, reviews: 96, city: 'Newport, AR', area: 'Jackson County',
    covers: ['Newport', 'Batesville', 'Walnut Ridge'],
    initials: 'CH', accent: '#B5761F', responds: 'Responds within a day',
    blurb: 'Inspection-led roof repair and gutter protection work.',
    about: 'A smaller outfit that leads with paid roof inspections and takes on repair and gutter protection rather than full replacements.'
  },

  /* Plumbing */
  {
    id: 'rivergate', name: 'Rivergate Plumbing Co.', demo: true, category: 'Plumbing',
    categories: ['Plumbing', 'Drain Cleaning', 'Water Heater Service', 'Bathroom Remodeling'],
    services: ['Emergency Repair', 'Water Heaters', 'Repiping'],
    rating: 4.9, reviews: 231, city: 'Little Rock, AR', area: 'Pulaski County',
    covers: ['Little Rock', 'North Little Rock', 'Sherwood', 'Benton', 'Jacksonville'],
    initials: 'RP', accent: '#1B6E8F', responds: 'Responds in about 1 hour',
    blurb: 'Round-the-clock residential plumbing across the Little Rock metro.',
    about: 'A metro-wide plumbing company running an after-hours dispatch rota, covering emergency repair through to planned repipes.'
  },
  {
    id: 'bluewater', name: 'Bluewater Plumbing Group', demo: true, category: 'Plumbing',
    categories: ['Plumbing', 'Drain Cleaning', 'Water Heater Service'], services: ['Leak Repair', 'Drain Cleaning', 'Water Heaters'],
    rating: 4.8, reviews: 186, city: 'Jonesboro, AR', area: 'Craighead County',
    covers: ['Jonesboro', 'Paragould', 'Trumann', 'Newport'],
    initials: 'BP', accent: '#2C5F7A', responds: 'Responds in about 1 hour',
    blurb: 'Residential plumbing with same-day emergency dispatch.',
    about: 'Handles the everyday residential list — leaks, clogs, failing water heaters — with same-day slots held back for emergencies.'
  },
  {
    id: 'anchor-point', name: 'Anchor Point Plumbing Co.', demo: true, category: 'Plumbing',
    categories: ['Plumbing', 'Bathroom Remodeling', 'Septic Service'], services: ['Repiping', 'Fixture Install', 'Sewer Lines'],
    rating: 4.7, reviews: 143, city: 'Searcy, AR', area: 'White County',
    covers: ['Searcy', 'Beebe', 'Bald Knob', 'Heber Springs'],
    initials: 'AP', accent: '#3B5F8A', responds: 'Responds in about 3 hours',
    blurb: 'Repipes, fixture upgrades and bathroom plumbing rough-ins.',
    about: 'Leans toward planned work — repipes, fixture packages and rough-in for bathroom remodels — rather than emergency call-outs.'
  },
  {
    id: 'copperline', name: 'Copperline Plumbing & Drain', demo: true, category: 'Plumbing',
    categories: ['Plumbing', 'Drain Cleaning'], services: ['Drain Clearing', 'Camera Inspection', 'Slab Leaks'],
    rating: 4.6, reviews: 119, city: 'Cabot, AR', area: 'Lonoke County',
    covers: ['Cabot', 'Jacksonville', 'Sherwood', 'Beebe'],
    initials: 'CP', accent: '#9A5B2E', responds: 'Responds within a day',
    blurb: 'Drain and sewer specialists working from camera inspection.',
    about: 'Specialises in drains and sewer lines, diagnosing with camera inspection before quoting excavation or lining.'
  },

  /* HVAC */
  {
    id: 'kestrel-hvac', name: 'Kestrel Heating & Cooling', demo: true, category: 'HVAC',
    categories: ['HVAC', 'AC Repair', 'Furnace Repair', 'Air Duct Cleaning'], services: ['System Install', 'AC Repair', 'Duct Work'],
    rating: 4.9, reviews: 178, city: 'Little Rock, AR', area: 'Pulaski County',
    covers: ['Little Rock', 'North Little Rock', 'Sherwood', 'Benton'],
    initials: 'KH', accent: '#1F7A8C', responds: 'Responds in about 2 hours',
    blurb: 'Full-service heating and cooling with maintenance plans.',
    about: 'Covers install through to seasonal maintenance, with duct work handled in-house instead of subcontracted.'
  },
  {
    id: 'delta-air', name: 'Delta Air Comfort Systems', demo: true, category: 'HVAC',
    categories: ['HVAC', 'AC Repair', 'Furnace Repair'], services: ['AC Repair', 'Furnace Service', 'System Install'],
    rating: 4.8, reviews: 201, city: 'Jonesboro, AR', area: 'Craighead County',
    covers: ['Jonesboro', 'Paragould', 'Trumann', 'Harrisburg', 'Newport'],
    initials: 'DA', accent: '#2E6E8E', responds: 'Responds in about 2 hours',
    blurb: 'Heating and cooling service with seasonal maintenance plans.',
    about: 'A long-running Northeast Arkansas HVAC outfit doing repair, replacement and twice-yearly maintenance visits.'
  },
  {
    id: 'true-north-hvac', name: 'True North Heating & Air', demo: true, category: 'HVAC',
    categories: ['HVAC', 'Air Duct Cleaning', 'Insulation'], services: ['Duct Cleaning', 'Heat Pumps', 'Insulation'],
    rating: 4.6, reviews: 154, city: 'Batesville, AR', area: 'Independence County',
    covers: ['Batesville', 'Newport', 'Heber Springs', 'Walnut Ridge'],
    initials: 'TN', accent: '#4A6B8A', responds: 'Responds within a day',
    blurb: 'Efficiency-focused HVAC, duct sealing and insulation.',
    about: 'Approaches heating and cooling from the efficiency side, pairing equipment work with duct sealing and attic insulation.'
  },
  {
    id: 'crosswind', name: 'Crosswind Climate Co.', demo: true, category: 'HVAC',
    categories: ['HVAC', 'AC Repair'], services: ['Emergency AC', 'Thermostats', 'Mini Splits'],
    rating: 4.5, reviews: 87, city: 'Conway, AR', area: 'Faulkner County',
    covers: ['Conway', 'Little Rock', 'Sherwood'],
    initials: 'CC', accent: '#7A5B9B', responds: 'Responds within a day',
    blurb: 'Mini-split installs and emergency cooling repair.',
    about: 'A smaller crew concentrating on ductless mini-split installation and summer emergency cooling calls.'
  },

  /* Electrical */
  {
    id: 'brightpath', name: 'Brightpath Electrical Services', demo: true, category: 'Electrical',
    categories: ['Electrical', 'Generator Installation', 'Outdoor Lighting'], services: ['Panel Upgrades', 'Generators', 'Lighting'],
    rating: 4.9, reviews: 176, city: 'Jonesboro, AR', area: 'Craighead County',
    covers: ['Jonesboro', 'Paragould', 'Trumann', 'Newport'],
    initials: 'BE', accent: '#C08A15', responds: 'Responds in about 2 hours',
    blurb: 'Panel upgrades, standby generators and exterior lighting.',
    about: 'Residential electrical work weighted toward service upgrades and standby generator installs.'
  },
  {
    id: 'vantage-power', name: 'Vantage Power & Light', demo: true, category: 'Electrical',
    categories: ['Electrical', 'Home Security', 'Outdoor Lighting'], services: ['Rewiring', 'EV Chargers', 'Landscape Lighting'],
    rating: 4.8, reviews: 163, city: 'North Little Rock, AR', area: 'Pulaski County',
    covers: ['North Little Rock', 'Little Rock', 'Sherwood', 'Jacksonville', 'Benton'],
    initials: 'VP', accent: '#B0553F', responds: 'Responds in about 3 hours',
    blurb: 'Rewiring, EV charger installs and low-voltage work.',
    about: 'Covers whole-home rewiring alongside newer work — EV chargers, landscape lighting and low-voltage security runs.'
  },
  {
    id: 'ironwood-electric', name: 'Ironwood Electric LLC', demo: true, category: 'Electrical',
    categories: ['Electrical', 'Home Security'], services: ['Rewiring', 'Smart Home', 'Troubleshooting'],
    rating: 4.7, reviews: 128, city: 'Searcy, AR', area: 'White County',
    covers: ['Searcy', 'Beebe', 'Bald Knob', 'Cabot'],
    initials: 'IE', accent: '#5A6C7C', responds: 'Responds in about 5 hours',
    blurb: 'Rewiring, smart home integration and fault finding.',
    about: 'Takes on older-home rewiring and the fault-finding jobs other electricians have already looked at.'
  },
  {
    id: 'lampline', name: 'Lampline Electric Co.', demo: true, category: 'Electrical',
    categories: ['Electrical', 'Outdoor Lighting'], services: ['Fixture Install', 'Outlets', 'Ceiling Fans'],
    rating: 4.6, reviews: 142, city: 'Conway, AR', area: 'Faulkner County',
    covers: ['Conway', 'Little Rock', 'North Little Rock'],
    initials: 'LE', accent: '#8A6A2E', responds: 'Responds within a day',
    blurb: 'Fixtures, outlets, fans and everyday electrical jobs.',
    about: 'Handles the smaller electrical list most homeowners actually call about — fixtures, added outlets and ceiling fans.'
  },

  /* Landscaping */
  {
    id: 'terrace-stone', name: 'Terrace & Stone Outdoor', demo: true, category: 'Landscaping',
    categories: ['Landscaping', 'Patios', 'Irrigation & Sprinklers', 'Outdoor Lighting'], services: ['Design Build', 'Patios', 'Irrigation'],
    rating: 4.9, reviews: 124, city: 'Little Rock, AR', area: 'Pulaski County',
    covers: ['Little Rock', 'North Little Rock', 'Benton', 'Sherwood'],
    initials: 'TS', accent: '#2F7A4E', responds: 'Responds in about 4 hours',
    blurb: 'Design-build landscaping, patios and irrigation.',
    about: 'A design-build studio taking projects from drawings through planting, hardscape and irrigation.'
  },
  {
    id: 'stonebrook', name: 'Stonebrook Landscape Design', demo: true, category: 'Landscaping',
    categories: ['Landscaping', 'Lawn Care', 'Patios'], services: ['Design', 'Sod & Seeding', 'Hardscape'],
    rating: 4.8, reviews: 157, city: 'Cabot, AR', area: 'Lonoke County',
    covers: ['Cabot', 'Jacksonville', 'Beebe', 'Sherwood', 'Searcy'],
    initials: 'SL', accent: '#3F8442', responds: 'Responds in about 3 hours',
    blurb: 'Landscape design with in-house hardscape crews.',
    about: 'Runs its own hardscape crews, so walls, walkways and planting are scheduled as one job rather than split between trades.'
  },
  {
    id: 'greenfield', name: 'Greenfield Lawn Co.', demo: true, category: 'Landscaping',
    categories: ['Lawn Care', 'Landscaping', 'Irrigation & Sprinklers'], services: ['Mowing Plans', 'Fertilisation', 'Aeration'],
    rating: 4.7, reviews: 189, city: 'Jonesboro, AR', area: 'Craighead County',
    covers: ['Jonesboro', 'Paragould', 'Trumann', 'Harrisburg'],
    initials: 'GL', accent: '#4C7A2E', responds: 'Responds in about 6 hours',
    blurb: 'Season-long lawn programmes and turf treatment.',
    about: 'Built around recurring lawn programmes — mowing, fertilisation and aeration on a set schedule.'
  },
  {
    id: 'oakline', name: 'Oakline Tree & Lawn', demo: true, category: 'Tree Service',
    categories: ['Tree Service', 'Lawn Care', 'Junk Removal'], services: ['Tree Removal', 'Trimming', 'Stump Grinding'],
    rating: 4.6, reviews: 111, city: 'Newport, AR', area: 'Jackson County',
    covers: ['Newport', 'Batesville', 'Walnut Ridge', 'Jonesboro'],
    initials: 'OT', accent: '#5A7A2E', responds: 'Responds within a day',
    blurb: 'Tree removal, trimming and storm cleanup.',
    about: 'Tree work including removals near structures, plus storm cleanup and stump grinding.'
  },

  /* House Cleaning */
  {
    id: 'freshfield', name: 'Freshfield Home Cleaning', demo: true, category: 'House Cleaning',
    categories: ['House Cleaning', 'Carpet Cleaning', 'Window Cleaning'], services: ['Deep Clean', 'Move-Out', 'Recurring'],
    rating: 4.9, reviews: 243, city: 'Jonesboro, AR', area: 'Craighead County',
    covers: ['Jonesboro', 'Paragould', 'Trumann', 'Harrisburg'],
    initials: 'FH', accent: '#2E8B6B', responds: 'Responds in about 1 hour',
    blurb: 'Recurring and one-time residential cleaning.',
    about: 'Sends the same team to each recurring client, and takes one-off deep cleans and move-out turnovers alongside.'
  },
  {
    id: 'sparrow-broom', name: 'Sparrow & Broom', demo: true, category: 'House Cleaning',
    categories: ['House Cleaning', 'Window Cleaning'], services: ['Weekly Service', 'Deep Clean', 'Post-Renovation'],
    rating: 4.8, reviews: 198, city: 'Little Rock, AR', area: 'Pulaski County',
    covers: ['Little Rock', 'North Little Rock', 'Sherwood', 'Benton'],
    initials: 'SB', accent: '#1B7A55', responds: 'Responds in about 2 hours',
    blurb: 'Weekly service, deep cleans and post-renovation cleanup.',
    about: 'Metro cleaning company that also takes post-renovation cleanup, which is a different job from a standard deep clean.'
  },
  {
    id: 'tidewell', name: 'Tidewell Cleaning Co.', demo: true, category: 'House Cleaning',
    categories: ['House Cleaning', 'Carpet Cleaning'], services: ['Deep Clean', 'Carpets', 'Upholstery'],
    rating: 4.7, reviews: 167, city: 'Conway, AR', area: 'Faulkner County',
    covers: ['Conway', 'Little Rock', 'North Little Rock'],
    initials: 'TC', accent: '#2C7A8C', responds: 'Responds in about 4 hours',
    blurb: 'Home cleaning plus carpet and upholstery extraction.',
    about: 'Combines standard house cleaning with hot-water extraction for carpets and upholstery.'
  },
  {
    id: 'clearview-care', name: 'Clearview Home Care', demo: true, category: 'House Cleaning',
    categories: ['House Cleaning', 'Window Cleaning', 'Gutter Cleaning'], services: ['Recurring', 'Windows', 'Gutters'],
    rating: 4.6, reviews: 132, city: 'Searcy, AR', area: 'White County',
    covers: ['Searcy', 'Beebe', 'Bald Knob', 'Cabot'],
    initials: 'CV', accent: '#4A7A8C', responds: 'Responds within a day',
    blurb: 'Interior cleaning bundled with windows and gutters.',
    about: 'Bundles inside cleaning with exterior upkeep — windows and gutters — on the same visit schedule.'
  },

  /* Painting */
  {
    id: 'brushline', name: 'Brushline Painters', demo: true, category: 'Painting',
    categories: ['Painting', 'Interior Painting', 'Exterior Painting', 'Drywall'], services: ['Interior', 'Exterior', 'Drywall Repair'],
    rating: 4.8, reviews: 152, city: 'Jonesboro, AR', area: 'Craighead County',
    covers: ['Jonesboro', 'Paragould', 'Trumann', 'Newport'],
    initials: 'BL', accent: '#B0553F', responds: 'Responds in about 3 hours',
    blurb: 'Interior and exterior repaints with drywall repair.',
    about: 'Does its own drywall patching before painting, which avoids coordinating two trades on repaint jobs.'
  },
  {
    id: 'maple-grove', name: 'Maple Grove Painting Co.', demo: true, category: 'Painting',
    categories: ['Painting', 'Interior Painting', 'Exterior Painting'], services: ['Interior', 'Exterior', 'Cabinet Refinishing'],
    rating: 4.7, reviews: 134, city: 'Conway, AR', area: 'Faulkner County',
    covers: ['Conway', 'Little Rock', 'North Little Rock', 'Sherwood'],
    initials: 'MG', accent: '#A0522D', responds: 'Responds in about 4 hours',
    blurb: 'Repaints plus sprayed cabinet refinishing.',
    about: 'Interior and exterior repaints, with a spray booth setup for cabinet doors rather than brushing them in place.'
  },
  {
    id: 'cobalt-coat', name: 'Cobalt Coat Painting', demo: true, category: 'Painting',
    categories: ['Painting', 'Interior Painting'], services: ['Interior', 'Trim & Doors', 'Ceilings'],
    rating: 4.6, reviews: 98, city: 'Little Rock, AR', area: 'Pulaski County',
    covers: ['Little Rock', 'North Little Rock', 'Benton'],
    initials: 'CB', accent: '#3B5F8A', responds: 'Responds within a day',
    blurb: 'Interior painting, trim, doors and ceilings.',
    about: 'Interior-only painters, which keeps them available through the months exterior crews are booked out.'
  },

  /* Flooring */
  {
    id: 'timberline-floor', name: 'Timberline Flooring', demo: true, category: 'Flooring',
    categories: ['Flooring', 'Tile Work', 'Carpet Installation'], services: ['Hardwood', 'LVP', 'Tile'],
    rating: 4.8, reviews: 141, city: 'Little Rock, AR', area: 'Pulaski County',
    covers: ['Little Rock', 'North Little Rock', 'Sherwood', 'Benton', 'Conway'],
    initials: 'TF', accent: '#8C6239', responds: 'Responds in about 3 hours',
    blurb: 'Hardwood, LVP and tile supply and installation.',
    about: 'Supplies and fits, so material and labour come from one quote instead of two.'
  },
  {
    id: 'northfloor', name: 'Northfloor Surfaces', demo: true, category: 'Flooring',
    categories: ['Flooring', 'Carpet Installation', 'Tile Work'], services: ['LVP', 'Carpet', 'Subfloor Repair'],
    rating: 4.7, reviews: 98, city: 'Jonesboro, AR', area: 'Craighead County',
    covers: ['Jonesboro', 'Paragould', 'Newport', 'Trumann'],
    initials: 'NF', accent: '#7A5230', responds: 'Responds in about 5 hours',
    blurb: 'Flooring installation including subfloor repair.',
    about: 'Takes on jobs where the subfloor needs work first, rather than quoting over an unknown deck.'
  },
  {
    id: 'basecoat', name: 'Basecoat Floors', demo: true, category: 'Flooring',
    categories: ['Flooring', 'Tile Work'], services: ['Tile', 'Vinyl', 'Refinishing'],
    rating: 4.5, reviews: 76, city: 'Searcy, AR', area: 'White County',
    covers: ['Searcy', 'Beebe', 'Cabot', 'Bald Knob'],
    initials: 'BF', accent: '#9A5B2E', responds: 'Responds within a day',
    blurb: 'Tile, vinyl and hardwood refinishing.',
    about: 'Small crew handling tile and vinyl plus sand-and-refinish work on existing hardwood.'
  },

  /* Remodeling / General Contracting */
  {
    id: 'harbor-main', name: 'Harbor & Main Builders', demo: true, category: 'General Contractors',
    categories: ['General Contractors', 'Kitchen Remodeling', 'Bathroom Remodeling', 'Basement Remodeling', 'Cabinetry'],
    services: ['Kitchens', 'Additions', 'Whole-Home'],
    rating: 4.9, reviews: 146, city: 'Little Rock, AR', area: 'Pulaski County',
    covers: ['Little Rock', 'North Little Rock', 'Benton', 'Sherwood'],
    initials: 'HM', accent: '#46586A', responds: 'Responds in about 6 hours',
    blurb: 'Whole-home remodels, additions and kitchens.',
    about: 'Design-led remodeller working on larger projects — full kitchens, additions and whole-home renovations.'
  },
  {
    id: 'keystone-gc', name: 'Keystone General Contracting', demo: true, category: 'General Contractors',
    categories: ['General Contractors', 'Kitchen Remodeling', 'Bathroom Remodeling', 'Drywall'],
    services: ['Kitchens', 'Baths', 'Additions'],
    rating: 4.8, reviews: 189, city: 'Jonesboro, AR', area: 'Craighead County',
    covers: ['Jonesboro', 'Paragould', 'Trumann', 'Newport', 'Harrisburg'],
    initials: 'KG', accent: '#4A5A6B', responds: 'Responds in about 6 hours',
    blurb: 'Kitchen and bath remodels plus room additions.',
    about: 'General contractor running kitchen and bath remodels with its own carpentry and drywall crews.'
  },
  {
    id: 'foundry-reno', name: 'Foundry Home Renovations', demo: true, category: 'General Contractors',
    categories: ['General Contractors', 'Bathroom Remodeling', 'Flooring', 'Countertops'],
    services: ['Bathrooms', 'Flooring', 'Countertops'],
    rating: 4.7, reviews: 128, city: 'Cabot, AR', area: 'Lonoke County',
    covers: ['Cabot', 'Jacksonville', 'Sherwood', 'Beebe'],
    initials: 'FR', accent: '#6B4E9B', responds: 'Responds within a day',
    blurb: 'Bathroom renovations, flooring and countertops.',
    about: 'Mid-size renovation work — bathrooms, flooring and surfaces — rather than structural additions.'
  },
  {
    id: 'redbrick', name: 'Redbrick Remodeling', demo: true, category: 'General Contractors',
    categories: ['General Contractors', 'Basement Remodeling', 'Drywall', 'Painting'],
    services: ['Basements', 'Drywall', 'Trim Work'],
    rating: 4.6, reviews: 113, city: 'Conway, AR', area: 'Faulkner County',
    covers: ['Conway', 'Little Rock', 'North Little Rock'],
    initials: 'RB', accent: '#8C4A32', responds: 'Responds within a day',
    blurb: 'Basement conversions, drywall and finish carpentry.',
    about: 'Focused on finishing unfinished space — basements and bonus rooms — through to trim and paint.'
  },

  /* Handyman */
  {
    id: 'tackle-list', name: 'Tackle List Handyman', demo: true, category: 'Handyman',
    categories: ['Handyman', 'Drywall', 'Doors', 'Appliance Repair'], services: ['Repairs', 'Mounting', 'Door Adjustment'],
    rating: 4.8, reviews: 174, city: 'Jonesboro, AR', area: 'Craighead County',
    covers: ['Jonesboro', 'Paragould', 'Trumann', 'Harrisburg'],
    initials: 'TL', accent: '#B5761F', responds: 'Responds in about 2 hours',
    blurb: 'Half-day and full-day handyman bookings.',
    about: 'Books by the half-day, so several small jobs get cleared in one visit instead of separate call-outs.'
  },
  {
    id: 'handy-hollow', name: 'Handy Hollow Home Services', demo: true, category: 'Handyman',
    categories: ['Handyman', 'Drywall', 'Doors'], services: ['Repairs', 'Assembly', 'Shelving'],
    rating: 4.7, reviews: 208, city: 'Searcy, AR', area: 'White County',
    covers: ['Searcy', 'Beebe', 'Bald Knob', 'Cabot', 'Heber Springs'],
    initials: 'HH', accent: '#8A6A2E', responds: 'Responds in about 2 hours',
    blurb: 'Small-job specialists for the household punch list.',
    about: 'Takes the jobs too small for a trade contractor — patching, assembly, shelving and sticking doors.'
  },
  {
    id: 'odd-jobs', name: 'Odd Jobs Collective', demo: true, category: 'Handyman',
    categories: ['Handyman', 'Appliance Repair', 'Junk Removal'], services: ['Repairs', 'Appliances', 'Hauling'],
    rating: 4.5, reviews: 91, city: 'Conway, AR', area: 'Faulkner County',
    covers: ['Conway', 'Little Rock', 'North Little Rock'],
    initials: 'OJ', accent: '#5A6C7C', responds: 'Responds within a day',
    blurb: 'Repairs, appliance work and light hauling.',
    about: 'A small collective covering repairs, appliance swaps and hauling the old unit away in the same trip.'
  },

  /* Pest Control */
  {
    id: 'blackhawk-pest', name: 'Blackhawk Pest Defense', demo: true, category: 'Pest Control',
    categories: ['Pest Control'], services: ['Termites', 'Quarterly Plans', 'Rodents'],
    rating: 4.8, reviews: 187, city: 'Jonesboro, AR', area: 'Craighead County',
    covers: ['Jonesboro', 'Paragould', 'Trumann', 'Newport', 'Harrisburg'],
    initials: 'BD', accent: '#7A4A2E', responds: 'Responds in about 3 hours',
    blurb: 'Termite treatment and quarterly protection plans.',
    about: 'Termite work plus quarterly perimeter treatment, with real-estate inspection reports available.'
  },
  {
    id: 'cypress-pest', name: 'Cypress Pest Management', demo: true, category: 'Pest Control',
    categories: ['Pest Control', 'Mold Remediation'], services: ['General Pest', 'Mosquitoes', 'Crawlspace'],
    rating: 4.7, reviews: 121, city: 'Little Rock, AR', area: 'Pulaski County',
    covers: ['Little Rock', 'North Little Rock', 'Benton', 'Sherwood'],
    initials: 'CM', accent: '#4C7A2E', responds: 'Responds in about 5 hours',
    blurb: 'General pest, mosquito programmes and crawlspace work.',
    about: 'General pest control that also handles crawlspace moisture and the mould problems that follow it.'
  },
  {
    id: 'sentry-pest', name: 'Sentry Pest Solutions', demo: true, category: 'Pest Control',
    categories: ['Pest Control'], services: ['Termites', 'Rodents', 'Inspections'],
    rating: 4.6, reviews: 145, city: 'Cabot, AR', area: 'Lonoke County',
    covers: ['Cabot', 'Jacksonville', 'Beebe', 'Sherwood'],
    initials: 'SP', accent: '#8C6239', responds: 'Responds within a day',
    blurb: 'Termite inspections and rodent exclusion.',
    about: 'Inspection-first pest control, doing rodent exclusion work rather than repeat baiting visits.'
  },

  /* Windows & Exteriors */
  {
    id: 'everclad', name: 'Everclad Siding & Windows', demo: true, category: 'Windows',
    categories: ['Windows', 'Siding', 'Doors'], services: ['Replacement Windows', 'Siding', 'Entry Doors'],
    rating: 4.8, reviews: 137, city: 'Little Rock, AR', area: 'Pulaski County',
    covers: ['Little Rock', 'North Little Rock', 'Benton', 'Conway'],
    initials: 'EC', accent: '#2C5F7A', responds: 'Responds in about 4 hours',
    blurb: 'Replacement windows, siding and entry doors.',
    about: 'Exterior envelope work — windows, siding and doors — usually quoted as a single package.'
  },
  {
    id: 'clearpane', name: 'Clearpane Window & Door', demo: true, category: 'Windows',
    categories: ['Windows', 'Doors', 'Garage Doors'], services: ['Windows', 'Glass Repair', 'Patio Doors'],
    rating: 4.7, reviews: 109, city: 'Jonesboro, AR', area: 'Craighead County',
    covers: ['Jonesboro', 'Paragould', 'Trumann', 'Newport'],
    initials: 'CW', accent: '#1D6E8E', responds: 'Responds within a day',
    blurb: 'Window replacement, glass repair and patio doors.',
    about: 'Replaces full units but will also repair failed glass, which is often the cheaper fix.'
  },
  {
    id: 'bright-sash', name: 'Bright Sash Windows', demo: true, category: 'Windows',
    categories: ['Windows', 'Doors'], services: ['Windows', 'Screens', 'Weatherproofing'],
    rating: 4.6, reviews: 84, city: 'Conway, AR', area: 'Faulkner County',
    covers: ['Conway', 'Little Rock', 'North Little Rock'],
    initials: 'BS', accent: '#6B7A8C', responds: 'Responds within a day',
    blurb: 'Windows, screens and draught-proofing.',
    about: 'Window replacement plus the smaller jobs — screens, seals and draught-proofing older frames.'
  }
];

export const REVIEW_POOL: ReviewItem[] = [
  { name: 'Marcus T.', stars: 5, days: 12, text: 'Showed up when they said they would, quoted in writing, and the final invoice matched the quote. No surprises.' },
  { name: 'Dana R.', stars: 5, days: 26, text: 'Explained what actually needed doing versus what could wait. I appreciated not being upsold.' },
  { name: 'Priya S.', stars: 5, days: 41, text: 'Left the place cleaner than they found it. Small thing, but it says a lot.' },
  { name: 'Kyle B.', stars: 4, days: 58, text: 'Solid work and fair pricing. Took a couple of days longer than estimated, but they kept me updated.' },
  { name: 'Alicia M.', stars: 5, days: 9, text: 'Called back within the hour on a weekend. Had it sorted the next morning.' },
  { name: 'Grant W.', stars: 5, days: 73, text: 'Second time using them. Same crew, same standard. That consistency is why I called again.' },
  { name: 'Nina F.', stars: 4, days: 88, text: 'Good result overall. Scheduling took a bit of back and forth but the work itself was clean.' },
  { name: 'Terrell J.', stars: 5, days: 33, text: 'Walked me through the options with photos before starting. Made the decision easy.' },
  { name: 'Hollis P.', stars: 5, days: 17, text: 'Fair quote, no pressure, and they honoured it even when the job turned out bigger than expected.' },
  { name: 'Renee K.', stars: 4, days: 104, text: 'Happy with the outcome. Would have liked a bit more notice on the arrival window.' },
  { name: 'Owen D.', stars: 5, days: 51, text: 'Careful with the floors and the landscaping. Clearly done this a while.' },
  { name: 'Bianca L.', stars: 5, days: 22, text: 'Answered every question without making me feel like I was wasting their time.' },
  { name: 'Curtis A.', stars: 5, days: 66, text: 'Came back to check the work a week later without me asking. Not something I expected.' },
  { name: 'Simone V.', stars: 4, days: 95, text: 'Reasonable price and tidy work. One small snag, fixed the following week without argument.' },
  { name: 'Jared O.', stars: 5, days: 5, text: 'Straightforward from the first call. Quote by email the same day, work booked for that week.' },
  { name: 'Leah C.', stars: 5, days: 38, text: 'They found the actual cause rather than just treating the symptom. Saved me a repeat visit.' },
  { name: 'Devon H.', stars: 5, days: 80, text: 'Crew was polite, on time and worked steadily. Job finished a day early.' },
  { name: 'Marisol G.', stars: 4, days: 61, text: 'Good communication throughout. Result is exactly what I asked for.' }
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
    topic: 'General Contractors'
  },
  {
    tag: 'Seasonal',
    title: 'Getting your HVAC through an Arkansas summer',
    blurb: 'The maintenance that actually matters, and the warning signs worth calling about early.',
    read: '5 min read',
    img: '/assets/img/hvac.jpg',
    topic: 'HVAC'
  },
  {
    tag: 'Project guide',
    title: 'Planning a bathroom remodel without blowing the budget',
    blurb: 'Where the money goes, what drives timelines, and which changes are worth paying for.',
    read: '8 min read',
    img: '/assets/img/bathroom.jpg',
    topic: 'Bathroom Remodeling'
  },
  {
    tag: 'Cost guide',
    title: 'Flooring by the square foot: comparing your options',
    blurb: 'LVP, hardwood, tile and carpet on installed cost, durability and where each one suits.',
    read: '5 min read',
    img: '/assets/img/flooring.jpg',
    topic: 'Flooring'
  },
  {
    tag: 'Advice',
    title: 'After the storm: what to document before repairs begin',
    blurb: 'A short checklist to work through before anyone climbs on the roof.',
    read: '3 min read',
    img: '/assets/img/roof-repair.jpg',
    topic: 'Storm Damage Repair'
  }
];

export const STATS: StatItem[] = [
  { value: '63', label: 'Service categories' },
  { value: '2,400+', label: 'Pros in the network' },
  { value: '22', label: 'Arkansas cities covered' },
  { value: 'Free', label: 'To request estimates' }
];

export const STEPS: StepItem[] = [
  { n: '1', title: 'Tell us what you need', body: 'Search a service or browse the full category list to find the right trade for your project.' },
  { n: '2', title: 'Compare local pros', body: 'Review ratings, coverage areas and specialities side by side before you contact anyone.' },
  { n: '3', title: 'Request an estimate', body: 'Send your details to the pros you shortlist. Free to request, no obligation to hire.' }
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
    else if (keywordHit(norm(pro.name), t)) serviceMatch = 16;
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

  return serviceMatch + locationMatch + ratingScore + reviewScore;
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
export const galleryFor = (pro: Pro): string[] => IMAGES[pro.category] || IMAGES[pro.categories[0]] || IMAGES.Handyman;
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

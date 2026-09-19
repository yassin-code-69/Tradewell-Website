import fs from 'fs/promises';
import path from 'path';
import { PROS, Pro } from '@/data/tradewell';
import { SpotlightConfig, LeadItem, AdminStoreData, DEFAULT_SPOTLIGHT } from './adminTypes';
import { getSupabaseAdmin } from './supabaseAdmin';

export * from './adminTypes';

const STORE_PATH = path.join(process.cwd(), 'src', 'data', 'admin_store.json');

export const INITIAL_PROS: Pro[] = PROS.map((p) => ({
  ...p,
  tradewellScore:
    p.tradewellScore ||
    (p.id === 'valor-roofing'
      ? 99
      : p.id === 'charles-sharp-roofing'
      ? 98
      : p.id === 'mws-electrical'
      ? 99
      : (p.id === 'markley-construction' || p.id === 'markland-construction')
      ? 98
      : p.id === 'townsend-heat-air'
      ? 98
      : p.id === 'salinas-lawn-landscape'
      ? 98
      : p.id === 'prime-roofing'
      ? 97
      : p.id === 'jasons-heat-air'
      ? 97
      : p.id === 'lacey-turf-property'
      ? 97
      : p.id === 'chase-robertson-roofing'
      ? 96
      : p.id === 'prestige-heating-cooling'
      ? 96
      : p.id === 'wilkins-electrical'
      ? 96
      : 95)
}));

// Helper to convert DB pro row to Pro model
function dbRowToPro(row: any): Pro {
  return {
    id: row.id,
    name: row.name,
    demo: Boolean(row.demo),
    featured: Boolean(row.featured),
    tradewellScore: Number(row.tradewell_score) || 95,
    category: row.category,
    categories: row.categories || [row.category],
    services: row.services || [],
    rating: Number(row.rating) || 5.0,
    reviews: row.reviews != null ? Number(row.reviews) : null,
    ratingOnly: Boolean(row.rating_only),
    city: row.city,
    area: row.area || '',
    covers: row.covers || [],
    phone: row.phone || undefined,
    phoneHref: row.phone_href || undefined,
    facebookUrl: row.facebook_url || undefined,
    logo: row.logo || undefined,
    gallery: row.gallery || [],
    initials: row.initials || row.name.slice(0, 2).toUpperCase(),
    accent: row.accent || '#E87A1E',
    responds: row.responds || 'Typically responds same day',
    blurb: row.blurb || '',
    about: row.about || ''
  };
}

// Helper to convert Pro model to DB row
function proToDbRow(pro: Pro): any {
  return {
    id: pro.id,
    name: pro.name,
    demo: pro.demo ?? false,
    featured: pro.featured ?? false,
    tradewell_score: pro.tradewellScore || 95,
    category: pro.category,
    categories: pro.categories,
    services: pro.services || [],
    rating: pro.rating,
    reviews: pro.reviews,
    rating_only: pro.ratingOnly ?? false,
    city: pro.city,
    area: pro.area || '',
    covers: pro.covers || [],
    phone: pro.phone || '',
    phone_href: pro.phoneHref || '',
    facebook_url: pro.facebookUrl || '',
    logo: pro.logo || '',
    gallery: pro.gallery || [],
    initials: pro.initials || pro.name.slice(0, 2).toUpperCase(),
    accent: pro.accent || '#E87A1E',
    responds: pro.responds || 'Typically responds same day',
    blurb: pro.blurb || '',
    about: pro.about || '',
    updated_at: new Date().toISOString()
  };
}

// Helper to convert DB spotlight row to SpotlightConfig
function dbRowToSpotlight(row: any): SpotlightConfig {
  return {
    activeProId: row.active_pro_id || 'valor-roofing',
    projectTitle: row.project_title || 'Architectural Shingle Replacement & Gutters',
    projectLocation: row.project_location || 'Jonesboro & Craighead County, AR',
    projectImage: row.project_image || '/assets/img/roof-replacement.jpg',
    editorialNote: row.editorial_note || '',
    reviewQuote: row.review_quote || '',
    reviewAuthor: row.review_author || '',
    updatedAt: row.updated_at || 'Updated for this week'
  };
}

// Helper to convert SpotlightConfig to DB row
function spotlightToDbRow(spotlight: SpotlightConfig): any {
  return {
    id: 'weekly_spotlight',
    active_pro_id: spotlight.activeProId,
    project_title: spotlight.projectTitle,
    project_location: spotlight.projectLocation,
    project_image: spotlight.projectImage,
    editorial_note: spotlight.editorialNote,
    review_quote: spotlight.reviewQuote,
    review_author: spotlight.reviewAuthor,
    updated_at: spotlight.updatedAt || 'Updated for this week'
  };
}

// Helper to convert DB lead row to LeadItem
function dbRowToLead(row: any): LeadItem {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email || '',
    address: row.address || '',
    city: row.city || 'Arkansas',
    proId: row.pro_id || '',
    proName: row.pro_name || '',
    category: row.category || '',
    projectType: row.project_type || '',
    notes: row.notes || '',
    source: (row.source as LeadItem['source']) || 'contact_modal',
    status: (row.status as LeadItem['status']) || 'new',
    createdAt: row.created_at || new Date().toISOString()
  };
}

/**
 * Get entire store: attempts Supabase first, automatically seeding if empty,
 * falling back to local JSON if Supabase is offline/unconfigured.
 */
export async function getAdminStore(): Promise<AdminStoreData> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    try {
      // 1. Fetch pros
      const { data: prosData, error: prosError } = await supabase
        .from('pros')
        .select('*')
        .order('tradewell_score', { ascending: false });

      // If table exists and has records
      if (!prosError && prosData && prosData.length > 0) {
        const pros = prosData.map(dbRowToPro);

        // Fetch spotlight
        const { data: spotData } = await supabase
          .from('spotlight')
          .select('*')
          .eq('id', 'weekly_spotlight')
          .single();

        const spotlight = spotData ? dbRowToSpotlight(spotData) : DEFAULT_SPOTLIGHT;

        // Fetch leads
        const { data: leadsData } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });

        const leads = (leadsData || []).map(dbRowToLead);

        // Fetch settings
        const { data: settingRow } = await supabase
          .from('admin_settings')
          .select('value, updated_at')
          .eq('key', 'passcode')
          .single();

        const passcode = settingRow?.value?.passcode || process.env.ADMIN_PASSCODE || 'tradewell2026';
        const lastUpdated = settingRow?.updated_at || new Date().toISOString();

        return {
          pros,
          spotlight,
          leads,
          settings: { passcode, lastUpdated }
        };
      }

      // If pros table is empty, auto-seed with INITIAL_PROS and DEFAULT_SPOTLIGHT
      if (!prosError && (!prosData || prosData.length === 0)) {
        console.log('Seeding Supabase database with initial contractors & spotlight...');
        const seedPros = INITIAL_PROS.map(proToDbRow);
        await supabase.from('pros').upsert(seedPros);
        await supabase.from('spotlight').upsert(spotlightToDbRow(DEFAULT_SPOTLIGHT));
        await supabase.from('admin_settings').upsert({
          key: 'passcode',
          value: { passcode: process.env.ADMIN_PASSCODE || 'tradewell2026' },
          updated_at: new Date().toISOString()
        });

        return {
          pros: INITIAL_PROS,
          spotlight: DEFAULT_SPOTLIGHT,
          leads: [],
          settings: {
            passcode: process.env.ADMIN_PASSCODE || 'tradewell2026',
            lastUpdated: new Date().toISOString()
          }
        };
      }
    } catch (err) {
      console.warn('Supabase fetch failed, using local store fallback:', err);
    }
  }

  // Fallback: Local JSON store
  try {
    const data = await fs.readFile(STORE_PATH, 'utf-8');
    const parsed: AdminStoreData = JSON.parse(data);
    return parsed;
  } catch {
    const initial: AdminStoreData = {
      pros: INITIAL_PROS,
      spotlight: DEFAULT_SPOTLIGHT,
      leads: [],
      settings: {
        passcode: process.env.ADMIN_PASSCODE || 'tradewell2026',
        lastUpdated: new Date().toISOString()
      }
    };
    try {
      await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
      await fs.writeFile(STORE_PATH, JSON.stringify(initial, null, 2), 'utf-8');
    } catch {
      // Ignore if filesystem is read-only
    }
    return initial;
  }
}

/**
 * Save entire store or persist changes to Supabase and local file
 */
export async function saveAdminStore(data: AdminStoreData): Promise<void> {
  data.settings.lastUpdated = new Date().toISOString();

  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      // Persist pros in batch
      if (data.pros && data.pros.length > 0) {
        const rows = data.pros.map(proToDbRow);
        await supabase.from('pros').upsert(rows);
      }

      // Persist spotlight
      if (data.spotlight) {
        await supabase.from('spotlight').upsert(spotlightToDbRow(data.spotlight));
      }

      // Persist passcode setting
      if (data.settings) {
        await supabase.from('admin_settings').upsert({
          key: 'passcode',
          value: { passcode: data.settings.passcode },
          updated_at: data.settings.lastUpdated
        });
      }
    } catch (err) {
      console.warn('Could not sync to Supabase, saving to local filesystem:', err);
    }
  }

  // Also maintain local store copy as backup
  try {
    await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
    await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch {
    // Ignore in read-only environment
  }
}

/**
 * Direct pro updater for fast atomic updates
 */
export async function updateProInDatabase(proId: string, updates: Partial<Pro>): Promise<Pro | null> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const dbUpdates: any = { updated_at: new Date().toISOString() };
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.category !== undefined) dbUpdates.category = updates.category;
      if (updates.categories !== undefined) dbUpdates.categories = updates.categories;
      if (updates.services !== undefined) dbUpdates.services = updates.services;
      if (updates.city !== undefined) dbUpdates.city = updates.city;
      if (updates.area !== undefined) dbUpdates.area = updates.area;
      if (updates.rating !== undefined) dbUpdates.rating = updates.rating;
      if (updates.reviews !== undefined) dbUpdates.reviews = updates.reviews;
      if (updates.ratingOnly !== undefined) dbUpdates.rating_only = updates.ratingOnly;
      if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
      if (updates.phoneHref !== undefined) dbUpdates.phone_href = updates.phoneHref;
      if (updates.facebookUrl !== undefined) dbUpdates.facebook_url = updates.facebookUrl;
      if (updates.logo !== undefined) dbUpdates.logo = updates.logo;
      if (updates.covers !== undefined) dbUpdates.covers = updates.covers;
      if (updates.tradewellScore !== undefined) dbUpdates.tradewell_score = updates.tradewellScore;
      if (updates.gallery !== undefined) dbUpdates.gallery = updates.gallery;
      if (updates.initials !== undefined) dbUpdates.initials = updates.initials;
      if (updates.accent !== undefined) dbUpdates.accent = updates.accent;
      if (updates.responds !== undefined) dbUpdates.responds = updates.responds;
      if (updates.blurb !== undefined) dbUpdates.blurb = updates.blurb;
      if (updates.about !== undefined) dbUpdates.about = updates.about;

      const { data, error } = await supabase
        .from('pros')
        .update(dbUpdates)
        .eq('id', proId)
        .select()
        .single();

      if (!error && data) {
        return dbRowToPro(data);
      }
    } catch (err) {
      console.warn('Error in updateProInDatabase with Supabase, falling back to full store save:', err);
    }
  }

  // Fallback
  const store = await getAdminStore();
  const index = store.pros.findIndex((p) => p.id === proId);
  if (index === -1) return null;

  store.pros[index] = { ...store.pros[index], ...updates };
  await saveAdminStore(store);
  return store.pros[index];
}

/**
 * Direct spotlight updater
 */
export async function updateSpotlightInDatabase(spotlight: Partial<SpotlightConfig>): Promise<SpotlightConfig> {
  const store = await getAdminStore();
  const updated: SpotlightConfig = {
    ...store.spotlight,
    ...spotlight,
    updatedAt: spotlight.updatedAt || 'Updated for this week'
  };

  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      await supabase.from('spotlight').upsert(spotlightToDbRow(updated));
    } catch (err) {
      console.warn('Error updating spotlight in Supabase:', err);
    }
  }

  store.spotlight = updated;
  await saveAdminStore(store);
  return updated;
}

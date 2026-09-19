import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import fs from 'fs';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ijvzumttoeejpeosvxiv.supabase.co';
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || '';

if (!secretKey) {
  console.error('Please set SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY in environment before running.');
  process.exit(1);
}

const supabase = createClient(url, secretKey, {
  auth: { persistSession: false },
  realtime: { transport: ws }
});

// Read the admin store fallback
const localStoreData = JSON.parse(fs.readFileSync('./src/data/admin_store.json', 'utf-8'));

async function seed() {
  console.log(`Seeding ${localStoreData.pros.length} contractors to Supabase...`);

  // Format pros for database
  const dbPros = localStoreData.pros.map((p) => ({
    id: p.id,
    name: p.name,
    demo: p.demo ?? false,
    featured: p.featured ?? false,
    tradewell_score: p.tradewellScore || 95,
    category: p.category,
    categories: p.categories || [p.category],
    services: p.services || [],
    rating: p.rating,
    reviews: p.reviews,
    rating_only: p.ratingOnly ?? false,
    city: p.city,
    area: p.area || '',
    covers: p.covers || [],
    phone: p.phone || '',
    phone_href: p.phoneHref || '',
    facebook_url: p.facebookUrl || '',
    logo: p.logo || '',
    gallery: p.gallery || [],
    initials: p.initials || p.name.slice(0, 2).toUpperCase(),
    accent: p.accent || '#E87A1E',
    responds: p.responds || 'Typically responds same day',
    blurb: p.blurb || '',
    about: p.about || '',
    updated_at: new Date().toISOString()
  }));

  const { data: prosResult, error: prosError } = await supabase.from('pros').upsert(dbPros).select();
  if (prosError) {
    console.error('Error inserting pros:', prosError);
  } else {
    console.log(`Successfully seeded ${prosResult?.length} contractors!`);
  }

  // Seed spotlight
  const spot = localStoreData.spotlight;
  const dbSpot = {
    id: 'weekly_spotlight',
    active_pro_id: spot.activeProId,
    project_title: spot.projectTitle,
    project_location: spot.projectLocation,
    project_image: spot.projectImage,
    editorial_note: spot.editorialNote,
    review_quote: spot.reviewQuote,
    review_author: spot.reviewAuthor,
    updated_at: spot.updatedAt || 'Updated for this week'
  };

  const { error: spotError } = await supabase.from('spotlight').upsert(dbSpot);
  if (spotError) {
    console.error('Error inserting spotlight:', spotError);
  } else {
    console.log('Successfully seeded Spotlight contractor!');
  }

  // Seed admin settings
  const { error: setErr } = await supabase.from('admin_settings').upsert({
    key: 'passcode',
    value: { passcode: 'tradewell2026' },
    updated_at: new Date().toISOString()
  });
  if (setErr) {
    console.error('Error inserting admin settings:', setErr);
  } else {
    console.log('Successfully seeded Admin settings!');
  }

  // Seed sample leads
  if (localStoreData.leads && localStoreData.leads.length > 0) {
    const dbLeads = localStoreData.leads.map((l) => ({
      id: l.id,
      name: l.name,
      phone: l.phone,
      email: l.email || '',
      address: l.address || '',
      city: l.city || 'Arkansas',
      pro_id: l.proId || '',
      pro_name: l.proName || '',
      category: l.category || '',
      project_type: l.projectType || '',
      notes: l.notes || '',
      source: l.source || 'contact_modal',
      status: l.status || 'new',
      created_at: l.createdAt || new Date().toISOString()
    }));

    const { error: leadsErr } = await supabase.from('leads').upsert(dbLeads);
    if (leadsErr) {
      console.error('Error inserting leads:', leadsErr);
    } else {
      console.log(`Successfully seeded ${dbLeads.length} leads!`);
    }
  }

  console.log('All Supabase data seeded and verified successfully!');
}

seed();

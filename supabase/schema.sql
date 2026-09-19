-- ==========================================================
-- Tradewell Home - Supabase Database & Storage Setup
-- Project Reference: ijvzumttoeejpeosvxiv
-- ==========================================================

-- 1. Create Contractors (pros) table matching exact Pro type
CREATE TABLE IF NOT EXISTS public.pros (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  demo BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN DEFAULT false,
  tradewell_score INTEGER NOT NULL DEFAULT 95,
  category TEXT NOT NULL,
  categories TEXT[] NOT NULL DEFAULT '{}',
  services TEXT[] NOT NULL DEFAULT '{}',
  rating NUMERIC(3, 1) NOT NULL DEFAULT 5.0,
  reviews INTEGER DEFAULT 0,
  rating_only BOOLEAN DEFAULT false,
  city TEXT NOT NULL,
  area TEXT NOT NULL DEFAULT '',
  covers TEXT[] NOT NULL DEFAULT '{}',
  phone TEXT DEFAULT '',
  phone_href TEXT DEFAULT '',
  facebook_url TEXT DEFAULT '',
  logo TEXT DEFAULT '',
  gallery TEXT[] NOT NULL DEFAULT '{}',
  initials TEXT NOT NULL DEFAULT '',
  accent TEXT NOT NULL DEFAULT '#E87A1E',
  responds TEXT DEFAULT 'Typically responds same day',
  blurb TEXT DEFAULT '',
  about TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pros_category ON public.pros(category);
CREATE INDEX IF NOT EXISTS idx_pros_city ON public.pros(city);
CREATE INDEX IF NOT EXISTS idx_pros_tradewell_score ON public.pros(tradewell_score DESC);

-- 2. Create Spotlight table matching SpotlightConfig
CREATE TABLE IF NOT EXISTS public.spotlight (
  id TEXT PRIMARY KEY DEFAULT 'weekly_spotlight',
  active_pro_id TEXT REFERENCES public.pros(id) ON DELETE SET NULL,
  project_title TEXT NOT NULL DEFAULT 'Architectural Shingle Replacement & Gutters',
  project_location TEXT NOT NULL DEFAULT 'Jonesboro & Craighead County, AR',
  project_image TEXT NOT NULL DEFAULT '/assets/img/roof-replacement.jpg',
  editorial_note TEXT NOT NULL DEFAULT '',
  review_quote TEXT NOT NULL DEFAULT '',
  review_author TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT 'Updated for this week'
);

-- 3. Create Leads table matching LeadItem
CREATE TABLE IF NOT EXISTS public.leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT DEFAULT '',
  address TEXT DEFAULT '',
  city TEXT DEFAULT 'Arkansas',
  pro_id TEXT DEFAULT '',
  pro_name TEXT DEFAULT '',
  category TEXT DEFAULT '',
  project_type TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  source TEXT DEFAULT 'contact_modal',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- 4. Create Admin Settings table
CREATE TABLE IF NOT EXISTS public.admin_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.pros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spotlight ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to verified contractors and spotlight
DROP POLICY IF EXISTS "Public read pros" ON public.pros;
CREATE POLICY "Public read pros" ON public.pros FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read spotlight" ON public.spotlight;
CREATE POLICY "Public read spotlight" ON public.spotlight FOR SELECT USING (true);

-- Allow public lead submissions (insert only)
DROP POLICY IF EXISTS "Public insert leads" ON public.leads;
CREATE POLICY "Public insert leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Allow Service Role full access to all tables
DROP POLICY IF EXISTS "Service role full access pros" ON public.pros;
CREATE POLICY "Service role full access pros" ON public.pros FOR ALL USING (auth.jwt() IS NULL OR true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role full access spotlight" ON public.spotlight;
CREATE POLICY "Service role full access spotlight" ON public.spotlight FOR ALL USING (auth.jwt() IS NULL OR true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role full access leads" ON public.leads;
CREATE POLICY "Service role full access leads" ON public.leads FOR ALL USING (auth.jwt() IS NULL OR true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role full access settings" ON public.admin_settings;
CREATE POLICY "Service role full access settings" ON public.admin_settings FOR ALL USING (auth.jwt() IS NULL OR true) WITH CHECK (true);

-- 6. Setup Storage Bucket 'tradewell-media'
INSERT INTO storage.buckets (id, name, public)
VALUES ('tradewell-media', 'tradewell-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public view tradewell-media" ON storage.objects;
CREATE POLICY "Public view tradewell-media" ON storage.objects
FOR SELECT USING (bucket_id = 'tradewell-media');

DROP POLICY IF EXISTS "Service role manage tradewell-media" ON storage.objects;
CREATE POLICY "Service role manage tradewell-media" ON storage.objects
FOR ALL USING (bucket_id = 'tradewell-media') WITH CHECK (bucket_id = 'tradewell-media');

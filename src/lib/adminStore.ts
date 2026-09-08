import fs from 'fs/promises';
import path from 'path';
import { PROS, Pro } from '@/data/tradewell';
import { SpotlightConfig, LeadItem, AdminStoreData, DEFAULT_SPOTLIGHT } from './adminTypes';

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
      : p.id === 'markley-construction'
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

export async function getAdminStore(): Promise<AdminStoreData> {
  try {
    const data = await fs.readFile(STORE_PATH, 'utf-8');
    const parsed: AdminStoreData = JSON.parse(data);
    return parsed;
  } catch {
    // If file doesn't exist, create it with seed defaults
    const initial: AdminStoreData = {
      pros: INITIAL_PROS,
      spotlight: DEFAULT_SPOTLIGHT,
      leads: [
        {
          id: 'lead-sample-1',
          name: 'James Henderson',
          phone: '(870) 555-0143',
          email: 'jhenderson@gmail.com',
          city: 'Jonesboro, AR',
          proId: 'valor-roofing',
          proName: 'Valor Roofing LLC',
          category: 'Roofing',
          projectType: 'Storm Damage Inspection & Estimate',
          notes: 'Roof has shingle loss on south slope following hail storm. Need estimate for insurance adjuster.',
          source: 'contact_modal',
          status: 'new',
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
        },
        {
          id: 'lead-sample-2',
          name: 'Sarah Jenkins',
          phone: '(501) 555-8821',
          email: 's.jenkins@yahoo.com',
          city: 'Searcy, AR',
          proId: 'jasons-heat-air',
          proName: 'Jason’s Heat and Air',
          category: 'HVAC (Commercial)',
          projectType: 'Commercial Rooftop AC Service',
          notes: 'Unit 2 compressor not cooling warehouse floor. Looking for same-day or next-day diagnostic.',
          source: 'estimate_modal',
          status: 'contacted',
          createdAt: new Date(Date.now() - 3600000 * 26).toISOString()
        }
      ],
      settings: {
        passcode: process.env.ADMIN_PASSCODE || 'tradewell2026',
        lastUpdated: new Date().toISOString()
      }
    };
    await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
    await fs.writeFile(STORE_PATH, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
}

export async function saveAdminStore(data: AdminStoreData): Promise<void> {
  data.settings.lastUpdated = new Date().toISOString();
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

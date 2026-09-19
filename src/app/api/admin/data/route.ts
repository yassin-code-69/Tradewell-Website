import { NextResponse } from 'next/server';
import {
  getAdminStore,
  saveAdminStore,
  updateProInDatabase,
  updateSpotlightInDatabase,
  INITIAL_PROS,
  DEFAULT_SPOTLIGHT
} from '@/lib/adminStore';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET() {
  try {
    const store = await getAdminStore();
    return NextResponse.json({
      success: true,
      pros: store.pros,
      spotlight: store.spotlight,
      leads: store.leads,
      settings: {
        lastUpdated: store.settings.lastUpdated
      }
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching admin data';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.action === 'update_pro') {
      const { proId, updates } = body;
      const updatedPro = await updateProInDatabase(proId, updates);
      if (!updatedPro) {
        return NextResponse.json({ success: false, error: 'Contractor not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, pro: updatedPro });
    }

    if (body.action === 'update_spotlight') {
      const { spotlight } = body;
      const updatedSpotlight = await updateSpotlightInDatabase(spotlight);
      return NextResponse.json({ success: true, spotlight: updatedSpotlight });
    }

    if (body.action === 'update_passcode') {
      const { newPasscode } = body;
      if (!newPasscode || newPasscode.trim().length < 4) {
        return NextResponse.json({ success: false, error: 'Passcode must be at least 4 characters' }, { status: 400 });
      }
      const store = await getAdminStore();
      store.settings.passcode = newPasscode.trim();
      await saveAdminStore(store);
      return NextResponse.json({ success: true, message: 'Passcode updated successfully' });
    }

    if (body.action === 'reset_defaults') {
      const store = await getAdminStore();
      store.pros = INITIAL_PROS;
      store.spotlight = DEFAULT_SPOTLIGHT;
      await saveAdminStore(store);
      return NextResponse.json({ success: true, message: 'Reset to defaults successfully' });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error updating data';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

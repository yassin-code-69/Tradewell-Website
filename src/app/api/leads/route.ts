import { NextResponse } from 'next/server';
import { getAdminStore, saveAdminStore, LeadItem } from '@/lib/adminStore';

export async function GET() {
  try {
    const store = await getAdminStore();
    return NextResponse.json({ success: true, leads: store.leads || [] });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching leads';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, address, city, proId, proName, category, projectType, notes, source } = body;

    if (!name || !phone) {
      return NextResponse.json({ success: false, error: 'Name and Phone are required' }, { status: 400 });
    }

    const store = await getAdminStore();

    const newLead: LeadItem = {
      id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || '',
      address: address?.trim() || '',
      city: city?.trim() || 'Arkansas',
      proId: proId || '',
      proName: proName || 'General Inquiry',
      category: category || 'Home Services',
      projectType: projectType || 'Estimate Request',
      notes: notes?.trim() || '',
      source: source || 'contact_modal',
      status: 'new',
      createdAt: new Date().toISOString()
    };

    store.leads = [newLead, ...(store.leads || [])];
    await saveAdminStore(store);

    return NextResponse.json({ success: true, lead: newLead });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error recording lead';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { leadId, status } = await req.json();
    const store = await getAdminStore();
    const index = (store.leads || []).findIndex((l) => l.id === leadId);

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }

    store.leads[index].status = status;
    await saveAdminStore(store);

    return NextResponse.json({ success: true, lead: store.leads[index] });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error updating lead status';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const leadId = searchParams.get('id');

    if (!leadId) {
      return NextResponse.json({ success: false, error: 'Lead ID required' }, { status: 400 });
    }

    const store = await getAdminStore();
    store.leads = (store.leads || []).filter((l) => l.id !== leadId);
    await saveAdminStore(store);

    return NextResponse.json({ success: true, message: 'Lead deleted' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error deleting lead';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

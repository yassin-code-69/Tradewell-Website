import { NextResponse } from 'next/server';
import { getAdminStore, saveAdminStore, LeadItem } from '@/lib/adminStore';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const leads: LeadItem[] = data.map((r: any) => ({
          id: r.id,
          name: r.name,
          phone: r.phone,
          email: r.email || '',
          address: r.address || '',
          city: r.city || 'Arkansas',
          proId: r.pro_id || '',
          proName: r.pro_name || '',
          category: r.category || '',
          projectType: r.project_type || '',
          notes: r.notes || '',
          source: r.source || 'contact_modal',
          status: r.status || 'new',
          createdAt: r.created_at || new Date().toISOString()
        }));
        return NextResponse.json({ success: true, leads });
      }
    }

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

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from('leads').insert({
        id: newLead.id,
        name: newLead.name,
        phone: newLead.phone,
        email: newLead.email,
        address: newLead.address,
        city: newLead.city,
        pro_id: newLead.proId,
        pro_name: newLead.proName,
        category: newLead.category,
        project_type: newLead.projectType,
        notes: newLead.notes,
        source: newLead.source,
        status: newLead.status,
        created_at: newLead.createdAt
      });

      if (!error) {
        return NextResponse.json({ success: true, lead: newLead });
      }
    }

    const store = await getAdminStore();
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

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', leadId)
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({
          success: true,
          lead: {
            id: data.id,
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            city: data.city,
            proId: data.pro_id,
            proName: data.pro_name,
            category: data.category,
            projectType: data.project_type,
            notes: data.notes,
            source: data.source,
            status: data.status,
            createdAt: data.created_at
          }
        });
      }
    }

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

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from('leads').delete().eq('id', leadId);
      if (!error) {
        return NextResponse.json({ success: true, message: 'Lead deleted from Supabase' });
      }
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

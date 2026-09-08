import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminStore } from '@/lib/adminStore';

const AUTH_COOKIE = 'tw_admin_token';
const SESSION_SECRET = 'tradewell_admin_authenticated_session';

export async function POST(req: Request) {
  try {
    const { passcode } = await req.json();
    const store = await getAdminStore();
    const validPasscode = store.settings.passcode || process.env.ADMIN_PASSCODE || 'tradewell2026';

    if (passcode === validPasscode) {
      const cookieStore = await cookies();
      cookieStore.set(AUTH_COOKIE, SESSION_SECRET, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return NextResponse.json({ success: true, message: 'Authentication successful' });
    }

    return NextResponse.json({ success: false, error: 'Incorrect passcode' }, { status: 401 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (token === SESSION_SECRET) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  return NextResponse.json({ success: true, message: 'Logged out' });
}

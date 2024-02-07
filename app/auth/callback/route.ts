import { NextResponse, NextRequest } from 'next/server';
import { getRouteHandlerClient } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get('code');
  if (code) {
    const supabase = await getRouteHandlerClient();
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(requestUrl.origin);
}

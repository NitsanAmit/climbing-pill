import { NextResponse } from 'next/server';
import { UserProfile } from '@/app/api/repositories/User';
import { getRouteHandlerClient } from '@/app/api/supabase';

export async function GET(request: Request, { params }: { params: { userId: string } }): Promise<NextResponse<UserProfile | { error: string }>> {
  const id = params.userId;
  const supabase = await getRouteHandlerClient();

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }
  const { data, error } = await supabase.from('users').select('*').eq('id', id).returns<UserProfile>().single();
  if (data && data.user && !error) {
    return NextResponse.json(data.user, { status: 200 });
  } else if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  } else {
    return NextResponse.json({ error: 'unknown server error' }, { status: 500 });
  }
}

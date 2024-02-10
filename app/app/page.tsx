import { Dashboard } from '@/app/Dashboard';
import { getServerComponentClient } from '@/app/api/supabase';
import { getAuthenticatedUser, getProfile } from '@/app/api/SupabaseAuthService';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function Page() {
  const user = await getAuthenticatedUser(await getServerComponentClient());
  const profile = await getProfile(await getServerComponentClient());
  return <Dashboard user={user!} profile={profile!} />;
}

import { Dashboard } from '@/app/Dashboard';
import { getServerComponentClient } from '@/lib/supabase';
import { getAuthenticatedUser, getProfile } from '@/lib/services/SupabaseAuthService';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function Page() {
  const user = await getAuthenticatedUser(await getServerComponentClient());
  const profile = await getProfile(await getServerComponentClient());
  return <Dashboard user={user!} profile={profile!} />;
}

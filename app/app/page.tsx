import { Dashboard } from '@/app/Dashboard';
import { getServerComponentClient } from '@/lib/supabase';
import { SupabaseAuthService } from '@/lib/services/SupabaseAuthService';
import { AuthService } from '@/lib/services/AuthService';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function Page() {
  const authService = new AuthService(new SupabaseAuthService(await getServerComponentClient()));
  const user = await authService.getAuthenticatedUser();
  const profile = await authService.getProfile();
  return <Dashboard user={user!} profile={profile!} />;
}

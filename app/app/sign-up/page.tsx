import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { BioProfile } from '@/app/app/sign-up/BioProfile';
import { createUser, createClimberProfile } from '@/app/app/sign-up/actions';
import { ClimberProfile } from '@/app/app/sign-up/ClimberProfile';
import { getAuthenticatedUser, profileSetupComplete } from '@/lib/services/SupabaseAuthService';
import { getServerComponentClient } from '@/lib/supabase';

export default async function Page() {
  const supabase = await getServerComponentClient();
  const user = await getAuthenticatedUser(supabase);
  if (!user) {
    redirect('/auth/login');
    return;
  }

  if (!await profileSetupComplete(supabase)) {
    return <BioProfile user={user} onNext={createUser} />;
  }

  const { data: climberProfile, error } = await supabase.from('climber_profiles')
    .select('*')
    .eq('user_id', user.id);

  if (error || !climberProfile?.length) {
    return <ClimberProfile user={user} onNext={createClimberProfile} />;
  }

  revalidatePath('/app');
  redirect('/app');
}

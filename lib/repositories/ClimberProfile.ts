import { Tables } from '@/lib/types/database.types';
import { getServerActionClient } from '@/lib/supabase';

export type ClimberProfile = Tables<'climber_profiles'>;

const TABLE_NAME = 'climber_profiles';

export async function getClimberProfile(userId: string): Promise<ClimberProfile | null> {
  const supabase = await getServerActionClient();
  const { data, error } = await supabase.from(TABLE_NAME)
    .select('*')
    .eq('user_id', userId)
    .returns<ClimberProfile>()
    .single();
  return (data as ClimberProfile) || null;
}

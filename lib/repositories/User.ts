import { Tables } from '@/lib/types/database.types';
import { getServerActionClient } from '@/lib/supabase';

export type UserProfile = Tables<'users'>;

const TABLE_NAME = 'users';

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = await getServerActionClient();
  const { data, error } = await supabase.from(TABLE_NAME)
    .select('*')
    .eq('id', userId)
    .returns<UserProfile>()
    .single();
  return (data as UserProfile) || null;
}

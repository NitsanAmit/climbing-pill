'use server';

import { Database, Tables } from '@/lib/types/database.types';
import { getServerActionClient } from '@/app/api/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export type UserProfile = Tables<'users'>;

const TABLE_NAME = 'users';

export async function getUserProfile(client: SupabaseClient<Database>, userId: string): Promise<UserProfile | null> {
  const { data, error } = await client.from(TABLE_NAME)
    .select('*')
    .eq('id', userId)
    .returns<UserProfile>()
    .single();
  return (data as UserProfile) || null;
}

'use server';

import { Database, Tables } from '@/lib/types/database.types';
import { SupabaseClient } from '@supabase/supabase-js';

export type PhysicalAssessment = Tables<'physical_assessments'>;

const TABLE_NAME = 'physical_assessments';

export async function getPhysicalAssessment(client: SupabaseClient<Database>, userId: string): Promise<PhysicalAssessment | null> {
  const { data, error } = await client.from(TABLE_NAME)
    .select('*')
    .eq('user_id', userId)
    .returns<PhysicalAssessment>()
    .single();
  return (data as PhysicalAssessment) || null;
}

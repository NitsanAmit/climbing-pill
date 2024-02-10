'use server';

import { cookies } from 'next/headers';
import {
  createRouteHandlerClient,
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/types/database.types';
import { SupabaseClient } from '@supabase/supabase-js';


export async function getServerActionClient(cookiesStore = cookies()): Promise<SupabaseClient<Database>> {
  return createServerActionClient<Database>({ cookies: () => cookiesStore });
}

export async function getRouteHandlerClient(cookiesStore = cookies()): Promise<SupabaseClient<Database>> {
  return createRouteHandlerClient<Database>({ cookies: () => cookiesStore });
}

export async function getServerComponentClient(cookiesStore = cookies()): Promise<SupabaseClient<Database>> {
  return createServerComponentClient<Database>({ cookies: () => cookiesStore });
}

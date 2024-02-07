'use server';

import { cookies } from 'next/headers';
import {
  createMiddlewareClient,
  createRouteHandlerClient,
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/types/database.types';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';


export async function getServerActionClient(cookiesStore = cookies()): Promise<SupabaseClient<Database>> {
  return createServerActionClient<Database>({ cookies: () => cookiesStore });
}

export async function getRouteHandlerClient(cookiesStore = cookies()): Promise<SupabaseClient<Database>> {
  return createRouteHandlerClient<Database>({ cookies: () => cookiesStore });
}

export async function getMiddlewareClient(req: NextRequest): Promise<SupabaseClient<Database>> {
  const res = NextResponse.next();
  return createMiddlewareClient<Database>({ req, res });
}

export async function getServerComponentClient(cookiesStore = cookies()): Promise<SupabaseClient<Database>> {
  return createServerComponentClient<Database>({ cookies: () => cookiesStore });
}

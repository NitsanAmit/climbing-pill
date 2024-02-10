'use server';

import UserAlreadyExistsError from '@/lib/services/UserAlreadyExistsError';
import { Database } from '@/lib/types/database.types';
import { SupabaseClient } from '@supabase/supabase-js';
import { User } from '@/lib/types/users';
import { getUserProfile, UserProfile } from '@/app/api/repositories/User';

export async function login(client: SupabaseClient<Database>, email: string, password: string): Promise<void> {
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error || !data || !data.user) {
    throw error;
  }
}

export async function logout(client: SupabaseClient<Database>): Promise<void> {
  await client.auth.signOut();
}

export async function signUpWithEmail(client: SupabaseClient<Database>, email: string, password: string): Promise<void> {
  const { data, error } = await client.auth.signUp({ email, password });
  if (error || !data || !data.user) {
    if (error?.message === 'User already registered') {
      throw new UserAlreadyExistsError();
    }
    throw error;
  }
}

export async function signUpWithGoogle(client: SupabaseClient<Database>): Promise<void> {
  await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      scopes: 'email',
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

export async function getAuthenticatedUser(client: SupabaseClient<Database>): Promise<User | null> {
  await client.auth.getSession();
  const { data, error } = await client.auth.getUser();
  if (error) {
    throw error;
  }
  if (!data || !data.user) {
    return null;
  }
  return {
    id: data.user.id,
    email: data.user.email!,
  };
}

export async function getProfile(client: SupabaseClient<Database>): Promise<UserProfile | null> {
  try {
    const user = await getAuthenticatedUser(client);
    if (!user) {
      throw new Error('No authenticated user');
    }
    const profile = await getUserProfile(client, user.id);
    if (!profile) {
      return null;
    }
    return profile;
  } catch (error) {
    throw error;
  }
}

export async function getUserProfileImage(client: SupabaseClient<Database>, userId: string): Promise<string | null> {
  const { data, error } = await client
    .storage
    .from('user_profile_images')
    .download(userId);
  if (error || !data) {
    return null;
  }
  return URL.createObjectURL(data);
}

export async function uploadUserProfileImage(client: SupabaseClient<Database>, file: File, userId: string): Promise<string | null> {
  const { data, error } = await client
    .storage
    .from('user_profile_images')
    .upload(userId, file, {
      upsert: true,
    });
  if (error || !data) {
    return null;
  }
  return data.path;
}


export async function isUserAuthenticated(client: SupabaseClient<Database>): Promise<boolean> {
  return !!await getAuthenticatedUser(client);
}

export async function profileSetupComplete(client: SupabaseClient<Database>): Promise<boolean> {
  return !!await getProfile(client);
}

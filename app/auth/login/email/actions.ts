'use server';

import UserAlreadyExistsError from '@/lib/services/UserAlreadyExistsError';
import { login, signUpWithEmail } from '@/lib/services/SupabaseAuthService';
import { getServerActionClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createNewUser(email: string, password: string) {
  try {
    await signUpWithEmail(await getServerActionClient(), email, password);
  } catch (error) {
    revalidatePath('/auth/login');
    if (error instanceof UserAlreadyExistsError) {
      redirect(`/auth/login/email?email=${email}&emailError=${encodeURIComponent('User exists, please sign in')}&login=true`);
    } else {
      redirect(`/auth/login/email?email=${email}${error ? `&passwordError=${error.message}` : ''}`);
    }
  }
  revalidatePath('/app');
  redirect('/app/sign-up');
}

export async function loginUser(email: string, password: string) {
  try {
    await login(await getServerActionClient(), email, password);
  } catch (error) {
    revalidatePath('/auth/login');
    redirect(`/auth/login/email?email=${email}&passwordError=${error.message}`);
    return;
  }
  revalidatePath('/app');
  redirect('/app');
}

'use server';

import { AuthService, UserAlreadyExists } from '@/lib/services/AuthService';
import { SupabaseAuthService } from '@/lib/services/SupabaseAuthService';
import { getServerActionClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createNewUser(email: string, password: string) {
  const authService = new AuthService(new SupabaseAuthService(await getServerActionClient()));
  try {
    await authService.signUpWithEmail(email, password);
  } catch (error) {
    revalidatePath('/auth/login');
    if (error instanceof UserAlreadyExists) {
      redirect(`/auth/login/email?email=${email}&emailError=${encodeURIComponent('User exists, please sign in')}&login=true`);
    } else {
      redirect(`/auth/login/email?email=${email}${error ? `&passwordError=${error.message}` : ''}`);
    }
  }
  revalidatePath('/app');
  redirect('/app/sign-up');
}

export async function loginUser(email: string, password: string) {
  const authService = new AuthService(new SupabaseAuthService(await getServerActionClient()));
  try {
    await authService.login(email, password);
  } catch (error) {
    revalidatePath('/auth/login');
    redirect(`/auth/login/email?email=${email}&passwordError=${error.message}`);
    return;
  }
  revalidatePath('/app');
  redirect('/app');
}

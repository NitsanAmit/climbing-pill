import { IAuthService, UserAlreadyExists } from '@/lib/services/AuthService';
import { Database } from '@/lib/types/database.types';
import { SupabaseClient } from '@supabase/supabase-js';
import { User } from '@/lib/types/users';
import { getUserProfile, UserProfile } from '@/lib/repositories/User';

export class SupabaseAuthService implements IAuthService {

  constructor(private readonly client: SupabaseClient<Database>) {
  }

  async login(email: string, password: string): Promise<void> {
    const { data, error } = await this.client.auth.signInWithPassword({ email, password });
    if (error || !data || !data.user) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    await this.client.auth.signOut();
  }


  async signUpWithEmail(email: string, password: string): Promise<void> {
    const { data, error } = await this.client.auth.signUp({ email, password });
    if (error || !data || !data.user) {
      if (error?.message === 'User already registered') {
        throw new UserAlreadyExists();
      }
      throw error;
    }
  }

  async signUpWithGoogle(): Promise<void> {
    await this.client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'email',
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  async getAuthenticatedUser(): Promise<User | null> {
    await this.client.auth.getSession();
    const { data, error } = await this.client.auth.getUser();
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

  async getProfile(): Promise<UserProfile | null> {
    try {
      const user = await this.getAuthenticatedUser();
      if (!user) {
        throw new Error('No authenticated user');
      }
      const profile = await getUserProfile(user.id);
      if (!profile) {
        return null;
      }
      return profile;
    } catch (error) {
      throw error;
    }
  }

  async getUserProfileImage(userId: string): Promise<string | null> {
    const { data, error } = await this.client
      .storage
      .from('user_profile_images')
      .download(userId);
    if (error || !data) {
      return null;
    }
    return URL.createObjectURL(data);
  }

  async uploadUserProfileImage(file: File, userId: string): Promise<string | null> {
    const { data, error } = await this.client
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

}

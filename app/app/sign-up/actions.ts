'use server';

import { TablesInsert } from '@/lib/types/database.types';
import { BioProfile } from './BioProfile';
import { ClimberProfile } from './ClimberProfile';
import { AuthService } from '@/lib/services/AuthService';
import { SupabaseAuthService } from '@/lib/services/SupabaseAuthService';
import { getServerActionClient } from '@/lib/supabase';

export async function createUser(profileDetails: BioProfile): Promise<void> {
  const supabase = await getServerActionClient();
  const authService = new AuthService(new SupabaseAuthService(supabase));
  const user = await authService.getAuthenticatedUser();
  if (!user) {
    throw new Error('No user data found');
  }
  const userEntry: TablesInsert<'users'> = {
    first_name: profileDetails.firstName,
    last_name: profileDetails.lastName,
    phone_number: profileDetails.phoneNumber,
    email: user.email,
    id: user.id,
    is_active: true,
    is_admin: false,
    created_at: new Date().toISOString(),
  };
  if (profileDetails.image) {
    userEntry.image = await authService.uploadUserProfileImage(profileDetails.image, user.id);
  }
  const response = await supabase.from('users').insert(userEntry);
  if (response.error) {
    throw new Error(response.error.message);
  }
}


export async function createClimberProfile(climberProfile: ClimberProfile): Promise<void> {
  // TODO
}

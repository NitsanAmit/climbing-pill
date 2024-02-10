'use server';

import { TablesInsert } from '@/lib/types/database.types';
import { BioProfile } from './BioProfile';
import { ClimberProfile } from './ClimberProfile';
import { getAuthenticatedUser, uploadUserProfileImage } from '@/lib/services/SupabaseAuthService';
import { getServerActionClient } from '@/lib/supabase';

export async function createUser(profileDetails: BioProfile): Promise<{error: string} | void> {
  const supabase = await getServerActionClient();
  const user = await getAuthenticatedUser(supabase);
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
    userEntry.image = await uploadUserProfileImage(supabase, profileDetails.image.get('image') as File, user.id);
  }
  const response = await supabase.from('users').insert(userEntry);
  if (response.error) {
    if (response.error.code === DUPLICATE_KEY_ERROR && response.error.message.includes('phone_number')) {
      return { error: 'Phone number already in use' };
    }
    throw new Error(response.error.message);
  }
}


export async function createClimberProfile(climberProfile: ClimberProfile): Promise<void> {
  const supabase = await getServerActionClient();
  const user = await getAuthenticatedUser(supabase);
  if (!user) {
    throw new Error('No user data found');
  }
  // TODO: Noam
}

const DUPLICATE_KEY_ERROR = '23505';

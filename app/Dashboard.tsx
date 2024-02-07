'use client';
import { User } from '@supabase/gotrue-js';
import { Database } from '@/lib/types/database.types';
import { Button } from '@fluentui/react-components';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const Dashboard: React.FC<DashboardProps> = ({ user, profile }) => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const signout = async () => {
    await supabase.auth.signOut();
    router.replace('/auth/login');
  };
  return (
    <div className="flex flex-col items-center min-h-screen min-[431px]:p-6">
      <h1>Dashboard</h1>
      <p>{user.email}</p>
      <p>{profile.first_name}</p>
      <p>{profile.last_name}</p>
      <p>{profile.user_id}</p>
      <div>
        {
          JSON.stringify(profile)
        }
      </div>
      <Button onClick={signout}>Sign out</Button>
    </div>
  );
};

type DashboardProps = {
  user: User;
  profile: Database['public']['Tables']['LegacyUsers']['Row'];
}

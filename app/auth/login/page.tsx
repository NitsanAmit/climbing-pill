'use client';

import {
  makeStyles,
  shorthands,
} from '@fluentui/react-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signUpWithGoogle } from '@/app/api/SupabaseAuthService';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/types/database.types';
import { Button } from '@/lib/components/Button';

export default function Page() {

  const [loading, setLoading] = useState(false);
  const styles = useStyles();
  const router = useRouter();
  const googleLogin = async () => {
    setLoading(true);
    await signUpWithGoogle(createClientComponentClient<Database>());
    router.refresh();
  };
  const emailLogin = () => router.push('/auth/login/email');

  return (
    <div className={styles.page} >
      <GoogleButton onClick={googleLogin} disabled={loading}>Continue with Google</GoogleButton>
      <EmailButton onClick={emailLogin} disabled={loading}>Continue with Email</EmailButton>
    </div>
  );
}

const GoogleButton = (props) => {
  return <Button {...props}>
    <Image className="mr-2" width="22" height="22" src="/googleLogo.png" alt="google logo"/>
    {props.children}
  </Button>;
};
const EmailButton = (props) => {
  return <Button {...props} $outlined>{props.children}</Button>;
};

const useStyles = makeStyles({
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    width: '100%',
    ...shorthands.flex(1),
    ...shorthands.padding('24px'),
    rowGap: '16px',
  },
  drawer: {
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
  },
});

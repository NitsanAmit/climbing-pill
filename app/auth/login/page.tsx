'use client';

import {
  makeStyles,
  shorthands,
} from '@fluentui/react-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { AuthService } from '@/lib/services/AuthService';
import { SupabaseAuthService } from '@/lib/services/SupabaseAuthService';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/types/database.types';

export default function Page() {

  const [loading, setLoading] = useState(false);
  const styles = useStyles();
  const router = useRouter();
  const authService = new AuthService(new SupabaseAuthService(createClientComponentClient<Database>()));
  const googleLogin = async () => {
    setLoading(true);
    await authService.signUpWithGoogle();
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
  return <StyledButton {...props} $fill>
    <Image className="mr-2" width="24" height="24" src="/googleLogo.png" alt="google logo"/>
    {props.children}
  </StyledButton>;
};
const EmailButton = (props) => {

  return <StyledButton {...props}>{props.children}</StyledButton>;
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

const StyledButton = styled.button<{ $fill?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  height: 56px;
  border: 2px solid white;
  border-radius: 25px;
  color: ${({ $fill }) => $fill ? 'black' : 'white'};
  background-color: ${({ $fill }) => $fill ? 'white' : 'transparent'};
  &:hover {
    opacity: 0.85;
  }
  &:active {
    opacity: 0.7;
  }
`;

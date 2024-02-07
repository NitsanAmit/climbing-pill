import { EmailForm } from '@/app/auth/login/email/EmailForm';
import { PasswordForm } from '@/app/auth/login/email/PasswordForm';
import { getServerComponentClient } from '@/lib/supabase';

export default async function Page({ searchParams }) {
  const supabase = await getServerComponentClient();
  const email = searchParams?.email;
  const passwordError = searchParams?.passwordError;
  const emailError = searchParams?.emailError;
  const isLogin = searchParams?.login;
  if (email) {
    const { data } = await supabase.rpc('does_email_exist', { search_email: email.toLowerCase() });
    return <PasswordForm email={email} login={isLogin || !!data} serverError={{
      email: emailError,
      password: passwordError,
    }} />;
  }
  return <EmailForm serverError={emailError}/>;
}

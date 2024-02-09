'use client';

import { Field } from '@fluentui/react-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createNewUser, loginUser } from '@/app/auth/login/email/actions';
import { useState } from 'react';
import { Input } from '@/lib/components/input/Input';
import { Button } from '@/lib/components/Button';

export const PasswordForm = ({ serverError, email, login }) => {

  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<{ password: string; }> = async ({ password }) => {
    setLoading(true);
    if (login) {
      await loginUser(email, password);
    } else {
      await createNewUser(email, password);
    }
  };
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<Inputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex-1 p-8 m-auto flex flex-col justify-end">
      <Input className="mb-4" type="email" value={email} error={serverError?.email} disabled/>
      <Input className="mb-4" type="password" placeholder="Password"
             register={register('password', passwordOptions)}
             error={serverError?.password || (errors.password && '6 char minimum')}/>
      <Button className="w-full" type="submit" disabled={!isValid || loading} $outlined>
        {
          login ? 'Login' : 'Sign up'
        }
      </Button>
    </form>
  );
};


type Inputs = {
  password: string;
}

const passwordOptions = {
  required: true,
  minLength: 6,
};

'use client';

import { Button, Field, Input } from '@fluentui/react-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createNewUser, loginUser } from '@/app/auth/login/email/actions';
export const PasswordForm = ({ serverError, email, login }) => {

  const onSubmit: SubmitHandler<{ password: string; }> = async ({ password }) => {
    if (login) {
      await loginUser(email, password);
    } else {
      await createNewUser(email, password);
    }
  };
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<Inputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex-1 p-8 m-auto flex flex-col justify-end">
      <Field className="w-full mb-4" size="large" validationMessage={serverError?.email}>
        <Input type="email" value={email} disabled/>
      </Field>
      <Field className="w-full mb-4" size="large" validationMessage={serverError?.password || (errors.password && '6 char minimum')}>
        <Input type="password" placeholder="Password" {...register('password', passwordOptions)} />
      </Field>
      <Button className="w-full" shape="circular" size="large" appearance="primary" type="submit" disabled={!isValid}>
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

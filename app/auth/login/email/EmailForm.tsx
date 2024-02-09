'use client';

import { Field } from '@fluentui/react-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Input } from '@/lib/components/input/Input';
import { Button } from '@/lib/components/Button';

export const EmailForm = ({ email, serverError }) => {
  const router = useRouter();
  const onSubmit: SubmitHandler<{ email: string; }> = async ({ email }) => {
    router.push(`/auth/login/email?email=${email}`);
  };
  const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<Inputs>();
  useEffect(() => {
    email && setValue('email', email);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex-1 p-8 m-auto flex flex-col justify-end">
        <Field className="w-full mb-4" size="large" validationMessage={serverError || (errors.email && 'Missing email')}>
          <Input type="email" placeholder="Email" register={register('email', emailOptions)} />
        </Field>
      <Button className="w-full" type="submit" disabled={!isValid} $outlined>Continue</Button>
    </form>
  );
};


type Inputs = {
  email: string;
}

const emailOptions = {
  required: true,
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: 'Please enter a valid email address',
  },
};

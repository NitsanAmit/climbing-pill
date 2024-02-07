'use client';

import { Button, Field, Input } from '@fluentui/react-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { useEffect, useState } from 'react';

export const BioProfile = ({ user, onNext }) => {

  const [loading, setLoading] = useState(false);
  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BioProfile>({ mode: 'all' });

  const submitHandler: SubmitHandler<BioProfile> = async (data) => {
    setLoading(true);
    onNext(data);
  };

  useEffect(() => {
    register('birthDate', { required: true });
  }, [register]);

  return (
    <form className="w-full h-full flex flex-col px-6 py-8 justify-between" onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col flex-1 gap-y-4">
        <Field size="large">
          <Input type="email" placeholder="Email" value={user.email} disabled/>
        </Field>
        <Field size="large" validationMessage={errors.firstName?.message}>
          <Input type="text" placeholder="First Name" {...register('firstName', firstNameOptions)} />
        </Field>
        <Field size="large" validationMessage={errors.lastName?.message}>
          <Input type="text" placeholder="Last Name" {...register('lastName', lastNameOptions)} />
        </Field>
        <Field size="large" validationMessage={errors.phoneNumber?.message}>
          <Input type="tel" placeholder="Phone Number" {...register('phoneNumber', phoneNumberOptions)} />
        </Field>
        <Field size="large" required>
          <DatePicker maxDate={new Date()} value={getValues('birthDate')}
                      onSelectDate={date => setValue('birthDate', date, { shouldValidate: true })}/>
        </Field>

      </div>
      <Button shape="circular" size="large" appearance="primary" type="submit" disabled={!isValid || loading}>
        Continue
      </Button>
    </form>
  );
};

export type BioProfile = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: Date;
  image?: File;
}

const firstNameOptions = {
  required: true,
  minLength: {
    value: 2,
    message: 'First name must be at least 2 characters',
  },
};

const lastNameOptions = {
  required: true,
  minLength: {
    value: 2,
    message: 'Last name must be at least 2 characters',
  },
};

const phoneNumberOptions = {
  required: true,
  minLength: {
    value: 10,
    message: 'Phone number must be 10 digits',
  },
  maxLength: {
    value: 10,
    message: 'Phone number must be 10 digits',
  },
  pattern: {
    value: /[0-9]/,
    message: 'Only numbers allowed',
  },
};

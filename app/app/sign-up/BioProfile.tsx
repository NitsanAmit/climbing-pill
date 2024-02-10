'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Input } from '@/lib/components/Input';
import { DatePicker } from '@/lib/components/DatePicker';
import { StickyBottomButtonPage } from '@/lib/components/StickyButtonPage';

export const BioProfile = ({ user, onNext }) => {

  const [loading, setLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<File>();

  const {
    getValues,
    setValue,
    setError,
    register,
    handleSubmit,
    formState,
  } = useForm<BioProfile>({ mode: 'all' });
  const { errors, isValid } = formState;

  const submitHandler: SubmitHandler<BioProfile> = async (data) => {
    setLoading(true);

    const form = new FormData();
    form.append('image', selectedProfile);
    const response = await onNext({ ...data, image: form });
    if (response?.error) {
      setLoading(false);
      setError('phoneNumber', { message: response.error });
    }
  };

  useEffect(() => {
    register('birthDate', { required: true });
  }, [register]);

  const pickImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setSelectedProfile(files[0]);
      }
    };
    input.click();
  };

  return (
    <StickyBottomButtonPage buttonText="Continue" onButtonClick={handleSubmit(submitHandler)}
                            disabled={!isValid || loading}>
      <h2 className="mt-4 mb-2 text-center">Let's Start with the Basics</h2>
      <div className="w-full my-4 flex justify-center items-center relative rounded-full" onClick={pickImage}>
        <img className="cursor-pointer rounded-full w-[100px] h-[100px]" width="100" height="100"
             src={selectedProfile ? URL.createObjectURL(selectedProfile) : '/profile-placeholder.png'}
             alt="profile picture" />
        {
          !selectedProfile &&
          <div className="absolute bg-black bg-opacity-30 w-[100px] h-[100px] rounded-full flex justify-center items-center">
            <p className="text-white">Add Image</p>
          </div>
        }
      </div>
      <div className="flex flex-col gap-y-4">
        <Input type="email" label="Email" value={user.email} disabled/>
        <Input type="text"
               label="First name"
               error={errors.firstName?.message?.toString()}
               register={register('firstName', firstNameOptions)}/>
        <Input type="text"
               register={register('lastName', lastNameOptions)}
               label="Last Name"
               error={errors.lastName?.message?.toString()}/>
        <Input type="text"
               register={register('phoneNumber', phoneNumberOptions)}
               label="Phone Number"
               error={errors.phoneNumber?.message?.toString()}/>
        <DatePicker maxDate={new Date()} value={getValues('birthDate')} label="Birth Date"
                    onSelectDate={date => setValue('birthDate', date, birthDateOptions)}/>
      </div>
    </StickyBottomButtonPage>
  );
};

export type BioProfile = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: Date;
  image?: FormData;
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

const birthDateOptions = { shouldValidate: true };

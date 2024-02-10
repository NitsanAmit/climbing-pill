'use client';

import { Input } from '@/lib/components/Input';
import { ClimbingStyle, ClimbingStyles, GymName, GymNames } from '@/lib/types/climbing.types';
import { StickyBottomButtonPage } from '@/lib/components/StickyButtonPage';
import { Select } from '@/lib/components/Select';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BioProfile } from '@/app/app/sign-up/BioProfile';

export const ClimberProfile = ({ onNext }) => {

  const [loading, setLoading] = useState(false);
  const {
    getValues,
    setValue,
    setError,
    register,
    handleSubmit,
    formState,
  } = useForm<BioProfile>({ mode: 'all' });
  const { errors, isValid } = formState;

  const submitHandler = async (data) => {
    setLoading(true);
    const response = await onNext(data);
    if (response?.error) {
      setLoading(false);
      setError('phoneNumber', { message: response.error });
    }
  };

  return (
    <StickyBottomButtonPage buttonText="Continue" onButtonClick={handleSubmit(submitHandler)}
                            disabled={!isValid || loading}>
      <h2 className="mt-4 mb-2 text-center">{"Let's Start with the Basics"}</h2>
      <div className="flex flex-col gap-y-4">
        <Select label="Main Gym" register={register('mainGymName')}>
          {
            Object.values(GymNames).map((gymName) => (
              <option key={gymName} value={gymName}>{gymName}</option>
            ))
          }
        </Select>
        <Input label="Started Climbing Year" type="number" options={startedClimbingYearOptions} register={register('startedClimbingYear')} />
        <Select label="Climbing Style" options={climbingStyleOptions} register={register('climbingStyle')} >
          {
            Object.values(ClimbingStyles).map((style) => (
              <option key={style} value={style}>{style}</option>
            ))
          }
        </Select>
        <Input label="Weight" type="number" register={register('weight')} />
        <Input label="Height" type="number" register={register('height')} />
      </div>
    </StickyBottomButtonPage>
  );
};



export type ClimberProfile = {
  mainGymName: GymName;
  startedClimbingYear: string;
  climbingStyle: ClimbingStyle;
  weight: number;
  height: number;
}

const mainGymNameOptions = {
  required: true,
};

const startedClimbingYearOptions = {
  required: true,
};

const climbingStyleOptions = {
  required: true,
};

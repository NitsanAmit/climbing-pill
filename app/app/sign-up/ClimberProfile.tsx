'use client';

import { Input } from '@/lib/components/Input';
import { DatePicker } from '@/lib/components/DatePicker';
import { ClimbingStyles, GymName } from '@/lib/types/climbing.types';
import { StickyBottomButtonPage } from '@/lib/components/StickyButtonPage';

export const ClimberProfile = ({ onNext }) => {

  return (
    <StickyBottomButtonPage buttonText="Continue" onButtonClick={handleSubmit(submitHandler)}
                            disabled={!isValid || loading}>
      <h2 className="mt-4 mb-2 text-center">Let's Start with the Basics</h2>
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



export type ClimberProfile = {
  mainGymName: GymName;
  startedClimbingYear: string;
  climbingStyle: ClimbingStyles;
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

'use client';

import { Button, Field, Input, Select } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { ClimbingStyles, GymName } from '@/lib/types/climbing.types';

export const ClimberProfile = ({ onNext }) => {

  return (
    <div className="w-full h-full flex flex-col px-6 py-8 justify-between">
      <div className="flex flex-col flex-1 gap-y-4">
        <Field size="large" required>
          <Select>
            <option>Red</option>
            <option>Green</option>
            <option>Blue</option>
          </Select>
        </Field>
        <Field size="large" >
          <Input type="number" placeholder="Weight (kg)" min={0} />
        </Field>
        <Field size="large" >
          <Input type="number" placeholder="Height (cm)" min={0} />
        </Field>

      </div>
      <Button shape="circular" size="large" appearance="primary" type="submit">
        Continue
      </Button>
    </div>
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

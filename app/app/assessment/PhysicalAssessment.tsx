'use client';

import type { PhysicalAssessment } from '@/lib/types/physicalAssessment.types';
import { BoulderingGrades, LeadGrades, GripSizes } from '@/lib/types/physicalAssessment.types';
import { StickyBottomButtonPage } from '@/lib/components/StickyButtonPage';
import { useForm } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { Select } from '@/lib/components/Select';
import { useState } from 'react';
import { Divider } from '@fluentui/react-divider';
import { Input } from '@/lib/components/Input';
import { Slider } from '@/lib/components/Slider';

export const PhysicalAssessment = ({ saveAssessment }) => {

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PhysicalAssessment>({ mode: 'all' });

  const submitHandler = async (data) => {
    setLoading(true);
    const response = await saveAssessment(data);
    if (response?.error) {
      setLoading(false);
    }
  };

  return (
    <StickyBottomButtonPage buttonText="Save" onButtonClick={handleSubmit(submitHandler)}
                            disabled={!isValid || loading}>
      <h2 className="mt-4 mb-2 text-center">{'Physical Assessment'}</h2>
      <div className="whitespace-pre-wrap">
        {
          'The assessment includes physical measurements, it is practically a training session. It will take you about 40 minutes. ' +
          'We recommend you to do it in a climbing gym after a resting day. Make sure to properly warm up before taking the test.\n'
        }
        <span className="font-bold">{'In case you are currently suffering from an injury, please consult us before you starting the assessment.'}</span>
      </div>
      <ClimbingGrades register={register}/>
      <FingerStrength register={register}/>
    </StickyBottomButtonPage>
  );
};

export const Section = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <div className="flex flex-col gap-y-4 mt-4">
      <Divider />
      <h3>{title}</h3>
      <div className="flex flex-col gap-y-4">
        {children}
      </div>
    </div>
  );
};

export const ClimbingGrades = ({ register }: { register: UseFormRegister<PhysicalAssessment> }) => {
  return <Section title={'Climbing Grades'}>
    <Select label="Boulder Grade" type="text" register={register('climbingGrades.boulderingHighestGrade')}>
      {
        Object.values(BoulderingGrades).map((grade) => (
          <option key={grade} value={grade}>{grade}</option>
        ))
      }
    </Select>
    <Select label="Leade Grade" type="text" register={register('climbingGrades.leadHighestGrade')}>
      {
        Object.values(LeadGrades).map((grade) => (
          <option key={grade} value={grade}>{grade}</option>
        ))
      }
    </Select>
  </Section>;
};

export const FingerStrength = ({ register }: { register: UseFormRegister<PhysicalAssessment> }) => {
  return <Section title={'Finger Strength'}>
    <Select label="Grip Size" type="text" register={register('fingerStrength.gripSize')}>
      {
        Object.values(GripSizes).map((size) => (
          <option key={size} value={size}>{size}</option>
        ))
      }
    </Select>
    <Input label="Weight (kg)" type="number" min="-20" max="80" register={register('fingerStrength.weight')} />
    <Slider register={register('fingerStrength.difficulty')} label="Difficulty" min={1} max={10} step={1} showRangeLabels />
  </Section>;
};

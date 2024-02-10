import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';
import { Label } from '@/lib/components/Label';
import { Slider as FluentSlider } from '@fluentui/react-slider';
import styled from 'styled-components';

export const Slider: React.FC<SliderProps> = ({ label, min, max, step, showRangeLabels, register, ...props }) => {
  return (
    <div className="w-full flex flex-col">
      {
        label &&
        <StyledLabel>{label}</StyledLabel>
      }
      <div className="w-full flex flex-row justify-center items-center px-3 gap-x-2">
        {
          showRangeLabels &&
          <Label aria-hidden>{min}</Label>
        }
        <FluentSlider className="flex-1" label="Difficulty" min={min} max={max} step={1} {...register} />
        {
          showRangeLabels &&
          <Label aria-hidden>{max}</Label>
        }
      </div>
    </div>
  );
};

type SliderProps = {
  label?: string;
  register: UseFormRegisterReturn<any>;
};

const StyledLabel = styled(Label)`
  margin: 0 12px 2px;
`;

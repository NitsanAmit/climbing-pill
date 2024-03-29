import styled from 'styled-components';
import { Colors } from '@/lib/styles/Colors';
import { Select as FluentSelect } from '@fluentui/react-select';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';
import { PropsWithChildren } from 'react';
import { Label } from '@/lib/components/Label';

export const Select: React.FC<PropsWithChildren<SelectProps>> = ({ label, register, ...props }) => {
  return (
    <div>
      {
        label &&
        <StyledLabel>{label}</StyledLabel>
      }
      <StyledSelect {...props} />
    </div>
  );
};

type SelectProps = {
  label?: string;
  register: UseFormRegisterReturn<any>;
};

// styles that can't be applied through the style prop
const StyledSelect = styled(FluentSelect)`
          > select {
            height: 48px;
            width: 100%;
            padding: 0 16px;
            border-radius: 24px;
            border: 1px solid ${Colors.gray50};
            font-size: 16px;
            font-weight: 400;
            color: ${Colors.black};
            background-color: #FFFFFF;
            transition: border-color 0.2s;
            outline: none;
            box-sizing: border-box;
            &::placeholder {
              color: #A6A6A6;
            }
            &:disabled {
              color: ${Colors.gray60};
              cursor: not-allowed;
              background: ${Colors.gray30};
            }
            &:-webkit-autofill,
            &:-webkit-autofill:focus {
              transition: background-color 0s 600000s, color 0s 600000s !important;
            }
          }
          &:hover {
            > select {
              border: 1px solid ${Colors.gray50};
            }
          }
          &::after {
            display: none !important;
          }
          &:focus, &:active, &:focus-within {
            > select {
              border-color: ${Colors.primary} !important;
              border-width: 2px !important;
              box-sizing: border-box !important;
              padding: 0 15px !important;
            }
          }
  `,
  StyledLabel = styled(Label)`
    margin: 0 8px 2px;
  `;

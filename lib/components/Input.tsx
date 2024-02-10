import styled from 'styled-components';
import { Colors } from '@/lib/styles/Colors';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';

export const Input: React.FC<{ label?: string; hint?: string; error?: string; register?: UseFormRegisterReturn<any> }> = (props) => {
  const { label, hint, error, register = {}, ...rest } = props;

  return (
    <div>
      {
        label &&
        <Label>{label}</Label>
      }
      <StyledInput {...rest} {...register} $error={!!error} />
      {
        (hint || error) &&
        <Hint $error={!!error}>{error ?? hint}</Hint>
      }
    </div>
  );
};

const StyledInput = styled.input<{ $error?: boolean }>`
          height: 48px;
          width: 100%;
          padding: 0 16px;
          border-radius: 24px;
          border: 1px solid ${({ $error }) => $error ? Colors.red : Colors.gray50};
          font-size: 16px;
          font-weight: 400;
          color: ${Colors.black};
          background-color: #FFFFFF;
          transition: border-color 0.2s;
          outline: none;
          box-sizing: border-box;
          &:focus {
            border-color: ${({ $error }) => $error ? Colors.red : Colors.primary};
            border-width: 2px;
            box-sizing: border-box;
            padding: 0 15px;
          }
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
  `,
  Label = styled.div`
    font-size: 14px;
    color: ${Colors.gray90};
    margin: 0 12px 2px;
  `,
  Hint = styled.div<{ $error: boolean }>`
    font-size: 14px;
    color: ${({ $error }) => $error ? Colors.red : Colors.gray50};
    margin: 2px 12px 0;
  `;

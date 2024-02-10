import styled from 'styled-components';
import { Colors } from '@/lib/styles/Colors';
import { Select as FluentSelect } from '@fluentui/react-select';

export const Select = ({ label, ...props }) => {
  return (
    <div>
      {
        label &&
        <Label>{label}</Label>
      }
      <StyledSelect {...props} />
    </div>
  );
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
  Label = styled.div`
    font-size: 14px;
    color: ${Colors.gray90};
    margin: 0 12px 2px;
  `;

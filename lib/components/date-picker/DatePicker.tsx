import styled from 'styled-components';
import { Colors } from '@/lib/styles/Colors';
import { DatePicker as FluentDatePicker } from '@fluentui/react-datepicker-compat';

export const DatePicker = ({ label, ...props }) => {
  return (
    <div>
      {
        label &&
        <Label>{label}</Label>
      }
      <StyledDatePicker {...props} style={datePickerStyles}/>
    </div>
  );
};

const datePickerStyles = {
  height: 48,
  width: '100%',
  padding: '0 16px',
  borderRadius: 24,
  border: `1px solid ${Colors.gray50}`,
  fontSize: 16,
  fontWeight: 400,
  color: Colors.black,
  backgroundColor: '#FFFFFF',
  transition: 'border-color 0.2s',
  outline: 'none',
  boxSizing: 'border-box',
};

// styles that can't be applied through the style prop
const StyledDatePicker = styled(FluentDatePicker)`
          &::after {
            display: none !important;
          }
          &:focus, &:active {
            border-color: ${Colors.primary} !important;
            border-width: 2px !important;
            box-sizing: border-box !important;
            padding: 0 15px !important;
          }
  `,
  Label = styled.div`
    font-size: 14px;
    color: ${Colors.gray90};
    margin: 0 12px 2px;
  `;

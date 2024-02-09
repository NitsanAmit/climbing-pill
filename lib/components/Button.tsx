import styled from 'styled-components';
import { Colors } from '@/lib/styles/Colors';

export const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} />;
};

type ButtonProps = {
  $primary?: boolean;
  $outlined?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const StyledButton = styled.button<{ $outlined: boolean; $primary: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  height: 48px;
  border: ${({ $outlined }) => $outlined ? `2px solid ${Colors.white}` : 'none'};
  border-radius: 25px;
  color: ${({ $outlined, $primary }) => $outlined ? Colors.white : ($primary ? Colors.white : Colors.black)};
  background-color: ${({ $outlined, $primary }) => $outlined ? 'transparent' : ($primary ? Colors.primary : Colors.white)};
  &:hover {
    opacity: 0.85;
  }
  &:active {
    opacity: 0.7;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

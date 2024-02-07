import { Input as FluentInput, InputProps, makeStyles, shorthands } from '@fluentui/react-components';
import './Input.scss';

export const Input: React.FC<InputProps> = (props) => {
  return <FluentInput className="cp-input" {...props} />
}

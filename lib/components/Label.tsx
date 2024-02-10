import { Colors } from '@/lib/styles/Colors';
import { Label as FluentLabel } from '@fluentui/react-label';


export const Label: React.FC = ({ children, ...props }) => {
  return (
    <FluentLabel size="small" style={{ color: Colors.gray90 }} {...props}>
      {children}
    </FluentLabel>
  );
};

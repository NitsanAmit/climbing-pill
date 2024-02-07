import { tokens } from '@fluentui/tokens';
import { makeStyles, shorthands } from '@fluentui/react-components';

export const Separator: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.separator} />
  );
};

const useStyles = makeStyles({
  separator: {
    width: '100%',
    height: '1px',
    ...shorthands.margin('8px', 0),
    backgroundColor: tokens.colorNeutralStrokeAccessible,
  },
});

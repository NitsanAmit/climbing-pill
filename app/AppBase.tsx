'use client';

import {
  makeStyles,
  Card, shorthands,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  card: {
    width: '430px',
    minWidth: '330px',
    '@media screen and (max-width: 431px)': { width: '100%', height: '100%' },
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.flex(1),
    ...shorthands.padding('0'),
  },
});


export const AppBase = ({ children }) => {
  const styles = useStyles();
  return (
    <div className="flex flex-col items-center min-h-screen min-[431px]:p-6">
      <Card className={styles.card} size="large">
          {children}
      </Card>
    </div>
  );
};

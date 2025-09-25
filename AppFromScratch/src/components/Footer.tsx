import { makeStyles, shorthands, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    ...shorthands.padding('16px', '24px'),
    marginTop: 'auto',
  },
  content: {
    textAlign: 'center',
    color: '#6b7280',
  },
});

export const Footer = () => {
  const styles = useStyles();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Text>© {currentYear} Corporate Programming. All rights reserved.</Text>
      </div>
    </footer>
  );
};

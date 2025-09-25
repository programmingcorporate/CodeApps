import { makeStyles, shorthands, Persona } from '@fluentui/react-components';
import logoImage from '../assets/CompanyLogo.png';

// Mock user data until Office365Users connector is added
const mockUserData = {
  displayName: 'John Doe',
  jobTitle: 'Software Developer',
  mail: 'john.doe@company.com'
};

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    ...shorthands.padding('12px', '24px'),
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    height: '50px',
    width: '50px', // Make it square
    objectFit: 'cover', // Maintain aspect ratio while covering the area
    ...shorthands.borderRadius('50%'), // Make it circular
    backgroundColor: '#f3f4f6', // Light background color
    padding: '4px', // Add some padding
    border: '2px solid #e5e7eb', // Add a subtle border
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  welcomeText: {
    marginRight: '12px',
  },
});

export const Header = () => {
  const styles = useStyles();

  return (
    <header className={styles.header}>
      <img
        src={logoImage}
        alt="Company Logo"
        className={styles.logo}
      />
      <div className={styles.userInfo}>
        <Persona
          name={mockUserData.displayName}
          secondaryText={mockUserData.jobTitle}
          presence={{ status: 'available' }}
          size="extra-large"
        />
      </div>
    </header>
  );
};

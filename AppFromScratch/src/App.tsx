import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FluentProvider, webLightTheme, makeStyles } from '@fluentui/react-components';
import { Providers } from '@microsoft/mgt-element';
import { Msal2Provider } from '@microsoft/mgt-msal2-provider';
import { IssueList } from './components/IssueList';
import { IssueDetail } from './components/IssueDetail';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    width: '100%',
    margin: '0 auto',
    maxWidth: '100%',
    flex: '1 0 auto',
    '@media (min-width: 1024px)': {
      maxWidth: '1200px',
    },
  },
});

// Initialize the MSAL provider
Providers.globalProvider = new Msal2Provider({
  clientId: 'YOUR_CLIENT_ID', // Replace with your Azure AD app client ID
  scopes: ['user.read', 'user.read.all'],
});

export default function App() {
  const styles = useStyles();
  return (
    <FluentProvider theme={webLightTheme}>
      <Router>
        <div className={styles.root}>
          <Header />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<IssueList />} />
              <Route path="/issue/:id" element={<IssueDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </FluentProvider>
  );
}

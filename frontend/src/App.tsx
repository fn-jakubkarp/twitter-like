import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { blue, pink, grey } from '@mui/material/colors';

import Header from './components/Header';
import EditPostPage from './pages/EditPostPage';
import HomePage from './pages/HomePage';
import { store } from './redux/store';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
      light: blue[300],
      dark: blue[700],
    },
    secondary: {
      main: pink[500],
      light: pink[300],
      dark: pink[700],
    },
    background: {
      default: grey[100],
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: 'none',
          fontWeight: 700,
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: blue[600],
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 30,
          },
        },
      },
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div style={{ display: 'flex', minHeight: '100vh' }}>
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Header />
              <main style={{ flexGrow: 1, padding: theme.spacing(3) }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/edit/:id" element={<EditPostPage />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

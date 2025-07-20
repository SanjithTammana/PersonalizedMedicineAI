import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Blue
    },
    secondary: {
      main: '#20c997', // Teal/Green
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#000000',
      secondary: '#6c757d',
    },
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#007bff',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    body1: {
      fontSize: '1rem',
      fontStyle: 'normal',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #007bff, #20c997)',
          color: '#FFFFFF',
          borderRadius: '25px',
          padding: '10px 20px',
          transition: 'transform 0.3s ease, background 0.3s ease',
          '&:hover': {
            background: 'linear-gradient(135deg, #0056b3, #17a2b8)',
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          boxShadow: '0px 4px 6px rgba(0, 123, 255, 0.1)',
          borderRadius: '12px',
          '&:hover': {
            boxShadow: '0px 8px 12px rgba(0, 123, 255, 0.2)',
            transform: 'translateY(-5px)',
          },
        },
      },
    },
  },
});

export default theme;
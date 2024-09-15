import { createTheme } from '@mui/material';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const themeV1 = createTheme({
  palette: {
    primary: {
      main: '#3e71f8',
      light: '#D9ECF3',
      dark: '#004B66',
    },
    secondary: {
      main: '#00A766',
      light: '#DCF7EC',
      dark: '#00663A',
    },
    text: {
      primary: '#00131A',
    },
    error: {
      main: '#E64646',
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

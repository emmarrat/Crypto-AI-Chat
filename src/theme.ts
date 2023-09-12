import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#132D46',
      light: '#30699f',
    },
    secondary: {
      main: '#48FF9E',
      dark: '#3dbe7a',
    },
    info: {
      main: '#fff',
      dark: '#afaeae',
    },
    warning: {
      main: '#2a2a2a',
      light: '#343434',
      dark: '#444444',
    },
  },
  typography: {
    fontFamily: 'Gilroy, serif',
    fontWeightRegular: 400,
    fontWeightBold: 700,
  },
  components: {
    MuiGrid: {
      defaultProps: {
        borderRadius: '50px',
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
        fullWidth: true,
      },
    },
    MuiTypography: {
      defaultProps: {
        color: '#fff',
      },
    },
  },
});

export default theme;

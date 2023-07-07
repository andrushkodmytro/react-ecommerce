import { createTheme } from '@mui/material/styles';
import createBreakpoints from '@mui/system/createTheme/createBreakpoints'

const breakpoints = createBreakpoints({});

const theme = createTheme({
  palette: {
    primary: {
      light: '#0078CD',
      main: '#003459',
      dark: '#002A48',
    },
    secondary: {
      light: '#FCEED5',
      main: '#F7DBA7',
      dark: '#EEC77E',
    },
  },
  typography: {
    h1: {
      fontSize: '46px',
      lineHeight: '60px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '36px',
      lineHeight: '54px',
      fontWeight: 700,
    },
    h3: {
      fontSize: '28px',
      lineHeight: '38px',
      fontWeight: 700,
    },
    h4: {
      fontSize: '24px',
      lineHeight: '36px',
      fontWeight: 700,
    },
    h5: {
      fontSize: '24px',
      lineHeight: '36px',
      fontWeight: 700,
    },
    h6: {
      fontSize: '20px',
      lineHeight: '32px',
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'unset',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1440px !important',

          [breakpoints.up("md")]: {
            paddingLeft: '80px !important',
            paddingRight: '80px !important',
          },

          [breakpoints.up("lg")]: {
            paddingLeft: '130px !important',
            paddingRight: '130px !important',
          },

        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          padding: '20px',
          boxShadow: 'none',
          border: '1px solid  #EBEEEF',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#FDFDFD !important',
          borderRadius: '57px',
        },
        outlinedPrimary: {
          borderRadius: '57px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            padding: '13px 28px',
            height: '20px',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          paddingTop: '0px',
          paddingBottom: '0px',
        },
      },
    },
  },
});

export default theme;

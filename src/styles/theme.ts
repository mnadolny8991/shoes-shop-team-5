'use client';
import { Work_Sans } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const workSans = Work_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

let theme = createTheme();
theme = createTheme({
  typography: {
    fontFamily: workSans.style.fontFamily,
    fontSize: 15,
    h1: {
      fontWeight: '500',
      fontSize: 45,
      lineHeight: '52.79px',
      [theme.breakpoints.down('md')]: {
        fontSize: 30,
        lineHeight: '35.19px',
      },
    },
    h2: {
      fontWeight: '400',
      fontSize: 30,
      lineHeight: '35.19px',
      [theme.breakpoints.down('md')]: {
        fontSize: 20,
        lineHeight: '23.46px',
      },
    },
    h4: {
      fontSize: 20,
      lineHeight: '23.46px',
      fontWeight: '500',
      [theme.breakpoints.down('md')]: {
        fontSize: 16,
        lineHeight: '18.77px',
      },
    },
    h5: {
      fontSize: 20,
      lineHeight: '23.46px',
      fontWeight: '500',
      [theme.breakpoints.down('md')]: {
        fontSize: 14,
        lineHeight: '16.42px',
      },
    },
    body1: {
      fontSize: 25,
      lineHeight: '33.83px',
      fontWeight: '400',
    },
    body2: {
      fontSize: 15,
      lineHeight: '17.6px',
      fontWeight: '300',
      [theme.breakpoints.down('md')]: {
        fontSize: 10,
        lineHeight: '11.73px',
      },
    },
    caption: {
      fontSize: 15,
      lineHeight: '17.6px',
      fontWeight: '500',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        lineHeight: '14.08px',
      },
    },
    button: {
      lineHeight: '18.77px',
      fontWeight: '500',
      textTransform: 'none',
      [theme.breakpoints.down('md')]: {
        fontSize: '12.32px',
        lineHeight: '14.45px',
      },
    },
    subtitle2: {
      fontSize: 15,
      lineHeight: '17.6px',
      fontWeight: '300',
      textTransform: 'none',
      color: '#5C5C5C',
      [theme.breakpoints.down('md')]: {
        fontSize: '12px',
        lineHeight: '14.08px',
      },
    },
  },
  palette: {
    error: {
      main: '#FE645E',
    },
    text: {
      primary: '#000000',
      secondary: '#5C5C5C',
    },
    primary: {
      main: '#FE645E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#6E314A',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
  },
});

export default theme;

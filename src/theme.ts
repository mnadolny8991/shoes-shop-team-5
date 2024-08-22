"use client";
import { Work_Sans } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const workSans = Work_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
});

const theme = createTheme({
  typography: {
    fontFamily: workSans.style.fontFamily,
    fontSize: 15,
    h1: {
      fontWeight: '500',
      fontSize: 45,
      lineHeight: '52.79px',
    },
    body1: {
      fontSize: 25,
      lineHeight: '33.83px',
      fontWeight: '400'
    },
    body2: {
      fontSize: 15,
      lineHeight: '17.6px',
    },
    caption: {
      fontSize: 15,
      lineHeight: '17.6px',
      fontWeight: '500',
    },
    button: {
      fontSize: 16,
      lineHeight: '18.77px',
      fontWeight: '500',
    }
  }
});

export default theme;



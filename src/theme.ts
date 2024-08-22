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
    fontFamily: workSans.style.fontFamily
  }
});

export default theme;



'use client';
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavLeft from '@/components/header/NavLeft';
import NavRight from '@/components/header/NavRight';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar
          disableGutters={true}
          sx={{
            margin: 0,
            height: isMobile ? '59px' : '120px',
            px: isMobile ? '20px' : '40px',
            justifyContent: 'space-between',
          }}
        >
          <NavLeft />
          <NavRight />
        </Toolbar>
      </AppBar>
    </>
  );
}

'use client';
import { AppBar, Toolbar } from '@mui/material';
import NavLeft from '@/components/header/NavLeft';
import NavRight from '@/components/header/NavRight';

export default function Header() {
  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar
          disableGutters={true}
          sx={{
            margin: 0,
            height: { xs: '59px', md: '120px' },
            px: { xs: '20px', md: '40px' },
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

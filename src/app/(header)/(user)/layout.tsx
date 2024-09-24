'use client';

import UserPagesList from '@/components/nav/UserPagesList';
import useAvatarQuery from '@/hooks/useAvatarQuery';
import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
  Stack,
  Avatar,
} from '@mui/material';
import { useSession } from 'next-auth/react';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data: session, status } = useSession();

  const { data } = useAvatarQuery();

  return (
    <>
      {status === 'unauthenticated' && <></>}
      {status === 'loading' && <Typography variant="h1">Loading...</Typography>}
      {status === 'authenticated' && (
        <Stack
          {...(!isMobile && {
            direction: 'row',
            spacing: '40px',
            px: '40px',
            pt: '40px',
          })}
        >
          {!isMobile && (
            <Stack
              width="320"
              spacing={4}
              position="sticky"
              top="40"
              alignSelf="start"
            >
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Avatar
                  alt={data?.alt}
                  src={data?.src}
                  sx={{ width: 64, height: 64 }}
                />
                <Box>
                  <Typography
                    fontSize={12}
                    fontWeight={500}
                    lineHeight="18px"
                    color={'#98A2B3'}
                    mb="4px"
                  >
                    Welcome
                  </Typography>
                  <Typography
                    fontSize={16}
                    fontWeight={500}
                    lineHeight="18.77px"
                  >
                    {data?.name}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <UserPagesList />
            </Stack>
          )}
          <Box component={'main'} flex={'auto'}>
            {children}
          </Box>
        </Stack>
      )}
    </>
  );
}

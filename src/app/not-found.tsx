'use client';

import {
  Box,
  Container,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import HeaderLayout from '@/app/(header)/layout';
import Image from 'next/image';
import GoBackAndHomeButtonsStack from '@/components/buttons/GoBackAndHomeButtonsStack';

export default function NotFound() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <HeaderLayout>
      {isMobile ? (
        <Stack textAlign={'center'} alignItems={'center'}>
          <Container sx={{ paddingTop: '36px', backgroundColor: '#E5E5E7' }}>
            <MessageBox />
          </Container>
          <ImageBox />
          <GoBackAndHomeButtonsStack />
        </Stack>
      ) : (
        <Stack direction="row">
          <Box sx={{ flex: 1 }}>
            <Box margin={isMobile ? '0' : '30% calc((50vw - 436px) / 3)'}>
              <MessageBox />
              <GoBackAndHomeButtonsStack />
            </Box>
          </Box>
          <ImageBox />
        </Stack>
      )}
    </HeaderLayout>
  );
}

function ImageBox() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const StyledImageBox = styled('div')(() =>
    isMobile
      ? {
          width: '100%',
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
          overflow: 'hidden',
        }
      : {
          flex: 1,
        }
  );

  return (
    <StyledImageBox>
      <Image
        alt="pexels rodion kutsaiev"
        src="/pexels-rodion-kutsaiev-7911758-1.png"
        sizes={isMobile ? '100vw' : '50vw'}
        width={960}
        height={992}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </StyledImageBox>
  );
}

function MessageBox() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box maxWidth={'538px'} mx={isMobile ? 'auto' : 0}>
      <Typography variant="h1" mb={isMobile ? '12px' : '20px'}>
        Error 404
      </Typography>
      <Typography variant="subtitle2">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy nibh euismod tincidunt ut laoreet dolore magna
      </Typography>
    </Box>
  );
}

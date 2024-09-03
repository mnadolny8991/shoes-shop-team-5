'use client';

import TextField from '@/components/input/TextField';
import CustomButton from '@/components/buttons/CustomButton';
import DeleteModal from '@/components/modals/DeleteModal';
import { useState } from 'react';
import ShoeImageSlider from '@/components/sliders/ShoeImageSlider';
import { Box, Container, Stack, Typography } from '@mui/material';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Container sx={{ my: '100px' }}>
      <Stack direction="row" gap="102px">
        <ShoeImageSlider shoeId={params.id} />
        <Box>
          <Typography variant="h1">Nike Air Max 270</Typography>
        </Box>
      </Stack>
    </Container>
  );
}

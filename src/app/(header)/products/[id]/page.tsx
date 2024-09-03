'use client';

import TextField from '@/components/input/TextField';
import CustomButton from '@/components/buttons/CustomButton';
import DeleteModal from '@/components/modals/DeleteModal';
import { useState } from 'react';
import ShoeImageSlider from '@/components/sliders/ShoeImageSlider';
import { Box, Chip, Container, Grid, Stack, Typography, useTheme } from '@mui/material';

const colors = [
  {
    id: 1,
    color: 'white',
    avaliable: true,
  },
  {
    id: 2,
    color: 'red',
    avaliable: false,
  },
  {
    id: 3,
    color: 'blue',
    avaliable: true,
  },
];

const sizes = [
  {
    id: 1,
    value: 36,
  },
  {
    id: 2,
    value: 37,
  },
  {
    id: 3,
    value: 38,
  },
  {
    id: 4,
    value: 39,
  },
  {
    id: 5,
    value: 40,
  },
  {
    id: 6,
    value: 41,
  },
  {
    id: 7,
    value: 42,
  },
  {
    id: 8,
    value: 43,
  },
  {
    id: 9,
    value: 44,
  },
  {
    id: 10,
    value: 45,
  },
];

export default function Page({ params }: { params: { id: string } }) {
  const [color, setColor] = useState('');
  const theme = useTheme();
  const gender = 'woman';

  function handleChipClick() {}

  return (
    <Stack 
      direction={"row"} 
      gap="auto"
      sx={{
        width: '85%',
        justifyContent: 'space-between',
        margin: 'auto',
        my: '100px',
        [theme.breakpoints.down('lg')]: {
          flexDirection: 'column-reverse',
        },
      }}>
      <ShoeImageSlider shoeId={params.id} />
      <Box sx={{ width: '522px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <Typography variant="h1">Nike Air Max 270</Typography>
          <Typography
            sx={{
              fontSize: '22px',
              fontWeight: '500',
              lineHeight: '25.81px',
            }}
          >
            $160
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: '500',
            lineHeight: '23.46px',
            color: '#494949',
            marginTop: '15px',
          }}
        >
          {gender === 'woman' ? "Woman's" : "Men's"} shoes
        </Typography>
        <Stack gap="15px" direction="row" sx={{ marginTop: '19px' }}>
          {colors.map((c) => (
            <Chip
              key={c.id}
              label={c.color}
              variant={c.avaliable ? 'outlined' : 'filled'}
            />
          ))}
        </Stack>
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: '500',
            lineHeight: '23.46px',
            color: '#494949',
            marginTop: '37px',
          }}
        >
          Select Size
        </Typography>
        <Grid
          justifyContent="space-between"
          container
          width={522}
          columns={10}
          spacing={2}
          direction="row"
          sx={{
            mt: 0,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {sizes.map((s) => (
            <Grid item xs={2} key={s.id}>
              <Chip
                label={'EU-' + s.value}
                variant="outlined"
                sx={{
                  width: '85px',
                  height: '55px',
                  borderRadius: '8px',
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Stack direction="row" spacing="26px" width={522} mt="35px">
          <CustomButton size="xl" variant="outlined">
            Favorite
          </CustomButton>
          <CustomButton size="xl" variant="contained">
            Add to Bag
          </CustomButton>
        </Stack>
        <Stack gap="15px">
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: '500',
              lineHeight: '23.46px',
              color: '#494949',
              mt: '65px',
            }}
          >
            Description
          </Typography>
          <Typography variant="body2">
            Boasting the first-ever Max Air unit created specifically for Nike
            Sportswear, the Nike Air Max 270 delivers an Air unit that absorbs
            and gives back energy with every springy step. Updated for modern
            comfort, it nods to the original, 1991 Air Max 180 with its
            exaggerated tongue top and heritage tongue logo.
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}

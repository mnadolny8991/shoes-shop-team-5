'use client';

import TextField from '@/components/input/TextField';
import CustomButton from '@/components/buttons/CustomButton';
import DeleteModal from '@/components/modals/DeleteModal';
import { useState } from 'react';
import ShoeImageSlider from '@/components/sliders/ShoeImageSlider';
import { Box, Chip, Container, Grid, Stack, Typography } from '@mui/material';

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
    value: 36
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
]

export default function Page({ params }: { params: { id: string } }) {
  const [color, setColor] = useState('');
  const gender = 'woman';

  function handleChipClick() {

  }

  return (
    <Container sx={{ my: '100px' }}>
      <Stack direction="row" gap="50px">
        <ShoeImageSlider shoeId={params.id} />
        <Box sx={{ width: '522px' }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
            <Typography variant="h1">Nike Air Max 270</Typography>
            <Typography sx={{
              fontSize: '22px',
              fontWeight: '500',
              lineHeight: '25.81px',
            }}>$160</Typography>
          </Box>
          <Typography sx={{
              fontSize: '20px',
              fontWeight: '500',
              lineHeight: '23.46px',
              color: '#494949',
              marginTop: '15px',
            }}>{gender === 'woman' ? "Woman's" : "Men's"} shoes</Typography> 
          <Stack gap="15px" direction="row" sx={{ marginTop: '19px' }}>
            {
              colors.map(c => 
                <Chip key={c.id} label={c.color} variant={c.avaliable ? 'outlined' : 'filled'} />
              )
            }
          </Stack>
          <Typography sx={{
              fontSize: '20px',
              fontWeight: '500',
              lineHeight: '23.46px',
              color: '#494949',
              marginTop: '37px',
            }}>Select Size</Typography>
          <Grid container spacing="5px" columns={10} sx={{ marginTop: '23px' }}>
            {
              sizes.map(s => 
                <Grid item xs={2} key={s.id}>
                  <Chip 
                    label={'EU-' + s.value} 
                    variant="outlined" 
                    sx={{ 
                      width: '85px',
                      height: '55px',
                      borderRadius: '8px',
                    }} />
                </Grid>
              )
            }
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
}

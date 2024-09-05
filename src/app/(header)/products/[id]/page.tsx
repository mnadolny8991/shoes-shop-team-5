'use client';

import TextField from '@/components/input/TextField';
import CustomButton from '@/components/buttons/CustomButton';
import DeleteModal from '@/components/modals/DeleteModal';
import { useState } from 'react';
import ShoeImageSlider from '@/components/sliders/ShoeImageSlider';
import { Box, Chip, Container, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { products } from '@/mock/products';

export default function Page({ params }: { params: { id: string } }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [product, setProduct] = useState(products[parseInt(params.id)]);
  const [colorId, setColorId] = useState(1);
  const [sizeId, setSizeId] = useState(1);
  
  const gender = product.gender;
  let allSizes = [];
  for (let i = 36; i <= 45; i++) {
    allSizes.push({
      id: i - 36,
      name: 'EU-' + i,
    });
  }

  function handleChipClick() {}

  return (
    <Stack 
      direction="row"
      sx={{
        width: isMobile ? '320px' : '85%',
        gap: isMobile ? '20px' : '102px',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        my: isMobile ? '35px' : '100px',
        [theme.breakpoints.down(1300)]: {
          flexDirection: 'column-reverse',
        },
      }}>
      <ShoeImageSlider shoeId={params.id} />
      <Box sx={{ width: isMobile ? '320px' : '522px' }}>
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
          {gender === 'Female' ? "Woman's" : "Men's"} shoes
        </Typography>
        <Stack gap="15px" direction="row" sx={{ marginTop: '19px' }}>
          {product.color?.map((c) => (
            <Chip
              key={c.id}
              label={c.name}
              variant="outlined"
              onClick={() => setColorId(c.id)}
              sx={ (theme) => ({
                border: colorId === c.id ? `1px solid ${theme.palette.secondary.main}` : '',
              })}
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
        <Stack 
          direction="row"
          useFlexGap
          spacing={isMobile ? "5px" : "24px"}
          flexWrap="wrap"
          marginTop={isMobile ? "13px" : "23px"}
        >
          {allSizes.map((s) => (
            <Chip
              key={s.id}
              label={s.name}
              variant="outlined"
              disabled={!product.sizes?.find(si => si.id === s.id)}
              onClick={() => setSizeId(s.id)}
              sx={(theme) => ({
                width: isMobile ? '60px' : '85px',
                height: isMobile ? '50px' : '55px',
                border: sizeId === s.id ? `1 px solid ${theme.palette.secondary.main}` : '',
                borderRadius: '8px',
                fontSize: isMobile ? '10px' : '12px'
              })}
            />
          ))}
        </Stack>
        <Stack 
          direction={isMobile ? "column" : "row"} 
          spacing={isMobile ? "10px" : "26px"} 
          width={isMobile ? '320px' : '522px'} 
          mt="35px">
          <CustomButton size={isMobile ? "m" : "xl"} variant="outlined">
            Favorite
          </CustomButton>
          <CustomButton size={isMobile ? "m" : "xl"} variant="contained">
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
              mt: isMobile ? '25px' : '65px',
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

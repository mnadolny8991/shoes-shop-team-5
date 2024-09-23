'use client';
import { FC } from 'react';
import { useEffect, useState } from 'react';
import ShoeImageSlider from '@/components/sliders/ShoeImageSlider';
import {
  Box,
  Chip,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import allSizes from '@/data/allSizes';
import { useCartContext } from '@/context/CartContext';
import { useLastViewed } from '@/context/LastViewedContext';
import { fetchProductById } from '@/lib/fetching';
import CustomButton from '@/components/buttons/CustomButton';
import { Product } from '@/types/product';

type SingleProductPageProps = {
  id: number;
  initialData: Product,
};

const SingleProductPage: FC<SingleProductPageProps> = ({ id, initialData }) => {
  const [sizeId, setSizeId] = useState<null | number>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data, status, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    initialData,
  });
  const { onProductAdd } = useCartContext();
  const { onLastViewedAdd } = useLastViewed();

  useEffect(() => {
    onLastViewedAdd(id);
  }, [id, onLastViewedAdd]);

  return (
    <>
      {status === 'error' && (
        <Typography>Error occured: ${error.message}</Typography>
      )}
      {status === 'success' && (
        <Stack
          direction="row"
          sx={{
            width: { xs: '320px', md: '85%' },
            gap: { xs: '20px', md: '102px' },
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
            my: { xs: '35px', md: '100px' },
            [theme.breakpoints.down(1300)]: {
              flexDirection: 'column-reverse',
            },
          }}
        >
          {data?.images && <ShoeImageSlider images={data?.images} />}
          <Box sx={{ width: { xs: '320px', md: '522px' } }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <Typography variant="h1">{data?.name}</Typography>
              <Typography
                sx={{
                  fontSize: '22px',
                  fontWeight: '500',
                  lineHeight: '25.81px',
                }}
              >
                ${data?.price}
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
              {`${data?.gender.name}'s Shoes`}
            </Typography>
            <Stack gap="15px" direction="row" sx={{ marginTop: '19px' }}>
              <Chip label={data?.color?.name} variant="outlined" />
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
              flexWrap="wrap"
              sx={{
                gap: { xs: '5px', md: '24px' },
                mt: { xs: '13px', md: '23px' },
              }}
            >
              {allSizes.map((s) => (
                <Chip
                  key={s.id}
                  label={s.name}
                  variant={s.id === sizeId ? 'filled' : 'outlined'}
                  disabled={
                    data?.sizes?.find((si) => 'EU-' + si.name === s.name) !==
                    undefined
                  }
                  onClick={() => setSizeId(s.id)}
                  sx={{
                    width: { xs: '60px', md: '85px' },
                    height: { xs: '50px', md: '55px' },
                    borderRadius: '8px',
                    fontSize: { xs: '10px', md: '12px' },
                  }}
                />
              ))}
            </Stack>
            <Stack
              direction={isMobile ? 'column' : 'row'}
              spacing={isMobile ? '10px' : '26px'}
              width={isMobile ? '320px' : '522px'}
              mt="35px"
              sx={{
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: '10px', md: '26px' },
              }}
            >
              <CustomButton size={isMobile ? 'm' : 'xl'} variant="outlined">
                Favorite
              </CustomButton>
              <CustomButton
                size={isMobile ? 'm' : 'xl'}
                variant="contained"
                onClick={() => {
                  if (data) {
                    onProductAdd(data.id);
                  }
                }}
              >
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
                  mt: { xs: '25px', md: '65px' },
                }}
              >
                Description
              </Typography>
              <Typography variant="body2">{data?.description}</Typography>
            </Stack>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default SingleProductPage;
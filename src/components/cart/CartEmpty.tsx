import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import CustomButton from '@/components/buttons/CustomButton';
import ImageContainer from '../containers/ImageContainer';
import { useRouter } from 'next/navigation';

type CartEmptyProps = {
  sx?: object;
};

const CartEmpty: React.FC<CartEmptyProps> = ({ sx }) => {
  const router = useRouter();

  return (
    <Stack
      alignItems="center"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        gap: '40px',
        ...sx,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#F9FAFB',
          p: '26px',
          borderRadius: '50%',
        }}
      >
        <ImageContainer src="/bag.svg" width={20} height={20} alt="bag icon" />
      </Box>
      <Stack gap="10px">
        <Typography variant="h4" textAlign="center">
          You don&apos;t have any products yet
        </Typography>
        <Typography
          variant="body2"
          component="p"
          textAlign="center"
          sx={{
            color: 'text.secondary',
          }}
        >
          Post can contain video, images and text
        </Typography>
      </Stack>
      <CustomButton
        size="m"
        variant="contained"
        sx={{ width: '152px' }}
        onClick={() => router.push('catalog')}
      >
        Add Product
      </CustomButton>
    </Stack>
  );
};

export default CartEmpty;

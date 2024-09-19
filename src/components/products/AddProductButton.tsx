'use client';
import CustomButton from '@/components/buttons/CustomButton';

export default function AddProductButton() {
  return (
    <CustomButton
      href="/add-product"
      size={'m'}
      variant="contained"
      sx={{ width: '152px' }}
    >
      Add product
    </CustomButton>
  );
}

'use client';
import CustomButton from '@/components/buttons/CustomButton';

export default function AddProductButton() {
  return (
    <CustomButton size={'m'} variant="contained" sx={{ width: '152px' }}>
      Add product
    </CustomButton>
  );
}

import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import CustomButton from '@/components/buttons/CustomButton';

export default function GoBackAndHomeButtonsStack() {
  const router = useRouter();

  return (
    <Stack direction="row" spacing={2} width={320} mt={3}>
      <CustomButton size="m" variant="outlined" onClick={router.back}>
        Go back
      </CustomButton>
      <CustomButton
        size="m"
        variant="contained"
        onClick={() => router.push('/')}
      >
        Home
      </CustomButton>
    </Stack>
  );
}

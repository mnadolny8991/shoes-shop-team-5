'use-client'

import { FormControlLabel, Checkbox, Stack, useTheme, Typography } from '@mui/material';

export default function KidsFilter() {
  return (
    <Stack>
      <FormControlLabel
        control={<Checkbox size='small' />}
        label={<Typography variant='subtitle2'>Boys</Typography>}
      />
      <FormControlLabel
        control={<Checkbox size='small' />}
        label={<Typography variant='subtitle2'>Girls</Typography>}
      />
    </Stack>
  );
}

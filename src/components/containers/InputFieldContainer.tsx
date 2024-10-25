'use client';

import { Box, BoxProps, Typography } from '@mui/material';
import ErrorMessage from '@/components/products/ErrorMessage';

export type InputProps = {
  required?: boolean;
  label: string;
  id: string;
  error?: string;
  width?: BoxProps['width'];
};

type InputFieldContainerProps = InputProps & {
  children: React.ReactNode;
};

export default function InputFieldContainer({
  required,
  width,
  label,
  id,
  error,
  children,
}: InputFieldContainerProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: width ?? { xs: '320px', md: '436px' },
        gap: { xs: '4.92px', md: '8px' },
      }}
    >
      <Typography variant="caption" component="label" htmlFor={id}>
        {label}
        {required && (
          <Typography
            variant="caption"
            component="span"
            sx={{ color: 'primary.main' }}
          >
            *
          </Typography>
        )}
      </Typography>
      {children}
      <ErrorMessage message={error} />
    </Box>
  );
}

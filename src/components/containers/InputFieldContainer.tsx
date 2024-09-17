'use client';

import { Box, BoxProps, Typography } from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

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
      {error && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <WarningAmberRoundedIcon
            sx={{
              width: { xs: '12px', md: '16px' },
              height: { xs: '12px', md: '16px' },
              color: 'error.main',
            }}
          />
          <Typography
            component="small"
            sx={{
              fontSize: { xs: '10px', md: '12px' },
              color: 'error.main',
              lineHeight: '14px',
              fontWeight: '400',
            }}
          >
            {error}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

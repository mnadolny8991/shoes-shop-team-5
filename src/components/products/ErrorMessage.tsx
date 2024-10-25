import { Box, Typography } from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

export default function ErrorMessage({
  message,
}: {
  message: string | undefined;
}) {
  return (
    <>
      {message && (
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
            {message}
          </Typography>
        </Box>
      )}
    </>
  );
}

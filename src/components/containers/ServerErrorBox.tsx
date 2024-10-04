import { Box, Stack, Typography } from '@mui/material';
import { ReactNode, FC } from 'react';

type ServerErrorBoxProps = {
  message: string;
  submessages: string[];
  sx?: object;
};

const ServerErrorBox: FC<ServerErrorBoxProps> = ({ message, submessages, sx }) => {
  return (
    <>
    {message &&
      <Box
        sx={{
          backgroundColor: 'error.main',
          color: 'white',
          p: { xs: '10px', md: '15px' },
          borderRadius: '8px',
          ...sx,
        }}
      >
        <Typography variant="body2">{message}</Typography>
        <Stack>
          {submessages.map((submessage, index) => (
            <Typography variant="body2" key={index}>
              {submessage}
            </Typography>
          ))}
        </Stack>
      </Box>
    }
    </>
  );
};

export default ServerErrorBox;

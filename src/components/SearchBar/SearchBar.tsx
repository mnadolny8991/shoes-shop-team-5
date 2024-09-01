import { Box, styled, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';

const Outline = styled('div')(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
  width: '320px',
  padding: '15px 19px',
  px: '20px',
  borderRadius: '42px',
  border: '1px solid #494949',
  [theme.breakpoints.down('md')]: {
    padding: '6.92px 11px',
  },
}));

const Input = styled('input')(({ theme }) => ({
  all: 'unset',
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
}));

export default function SearchBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <form>
      <Outline>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <IconButton>
            <Image
              src="/search-normal.svg"
              width={isMobile ? 11.16 : 17}
              height={isMobile ? 11.16 : 17}
              alt="website logo"
            />
          </IconButton>
          <Input placeholder="Search"></Input>
        </Box>
      </Outline>
    </form>
  );
}

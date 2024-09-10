import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type CartProductBarProps = {
  amount: number;
  onAddClick?: () => void;
  onSubtractClick?: () => void;
  onDeleteClick?: () => void;
};

const CartProductBar: React.FC<CartProductBarProps> = ({
  amount,
  onAddClick,
  onSubtractClick,
  onDeleteClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        width: { md: 'fit-content', xs: '100%' },
      }}
    >
      {!isMobile && (
        <>
          <IconButton onClick={onSubtractClick}>
            <RemoveCircleRoundedIcon width="32px" height="32px" />
          </IconButton>
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: '400',
              lineHeight: '28.15px',
              color: '#494949',
            }}
          >
            {amount}
          </Typography>
          <IconButton onClick={onAddClick}>
            <AddCircleIcon color="primary" width="32px" height="32px" />
          </IconButton>
          <Stack
            direction="row"
            alignItems="center"
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Typography
              sx={{
                fontSize: '24px',
                fontWeight: '400',
                lineHeight: '28.15px',
                color: '#494949',
                mr: '13px',
              }}
            >
              Quantity
            </Typography>
            <Stack direction="row" alignItems="center">
              <IconButton onClick={onDeleteClick}>
                <DeleteOutlineRoundedIcon
                  width="32px"
                  height="32px"
                  sx={{ color: '#6E7278' }}
                />
              </IconButton>
              <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: '400',
                  lineHeight: '28.15px',
                  color: '#6E7278',
                }}
              >
                Delete
              </Typography>
            </Stack>
          </Stack>
        </>
      )}
      {isMobile && 
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Stack direction="row" alignItems="center">
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: '400',
                lineHeight: '14.08px',
                color: '#494949',
              }}
            >
              Quantity
            </Typography>
            <IconButton sx={{ p: 0 }}>
              <KeyboardArrowDownIcon fontSize="small" />
            </IconButton>
          </Stack>
          <Stack direction="row" alignItems="center">
              <IconButton onClick={onDeleteClick} sx={{ p: 0 }}>
                <DeleteOutlineRoundedIcon
                  fontSize="small"
                  sx={{ color: '#6E7278' }}
                />
              </IconButton>
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: '400',
                  lineHeight: '14.08px',
                  color: '#6E7278',
                }}
              >
                Delete
              </Typography>
            </Stack>
        </Stack>
      }
    </Stack>
  );
};

export default CartProductBar;

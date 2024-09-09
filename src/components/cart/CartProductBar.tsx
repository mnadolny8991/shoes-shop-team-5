import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

type CartProductBarProps = {
  amount: number;
  onAddClick?: () => void;
  onSubtractClick?: () => void;
};

const CartProductBar: React.FC<CartProductBarProps> = ({
  amount,
  onAddClick,
  onSubtractClick,
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        width: 'fit-content',
      }}
    >
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
      <Stack direction="row" alignItems="center" divider={<Divider orientation="vertical" flexItem />}>
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
          <IconButton>
            <DeleteOutlineRoundedIcon width="32px" height="32px" sx={{ color: '#6E7278' }}/>
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
    </Stack>
  );
};

export default CartProductBar;

'use client';

import {
  Box,
  Divider,
  IconButton,
  Input,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';

type CartProductBarProps = {
  amount: number;
  onAddClick: () => void;
  onSubtractClick: () => void;
  onDeleteClick: () => void;
  onAmountChange: (newValue: number) => void;
};

const CartProductBar: React.FC<CartProductBarProps> = ({
  amount,
  onAddClick,
  onSubtractClick,
  onDeleteClick,
  onAmountChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openQuantityInput, setOpenQuantityInput] = useState<boolean>(false);
  const [amountMobile, setAmountMobile] = useState<number>(amount);

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
          <IconButton onClick={onSubtractClick} data-testid="subtract-btn">
            <RemoveCircleRoundedIcon width="32px" height="32px" />
          </IconButton>
          <Typography
            data-testid="amount"
            sx={{
              fontSize: '24px',
              fontWeight: '400',
              lineHeight: '28.15px',
              color: '#494949',
            }}
          >
            {amount}
          </Typography>
          <IconButton onClick={onAddClick} data-testid="add-btn">
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
              <IconButton onClick={onDeleteClick} data-testid="delete-btn">
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
      {isMobile && (
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Stack direction="column">
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
              <IconButton
                sx={{ p: 0 }}
                data-testid="down-btn"
                onClick={() => {
                  if (openQuantityInput) {
                    Number.isNaN(amountMobile)
                      ? onAmountChange(amount)
                      : onAmountChange(amountMobile);
                  }
                  setOpenQuantityInput(!openQuantityInput);
                }}
              >
                <KeyboardArrowDownIcon fontSize="small" />
              </IconButton>
            </Stack>
            {openQuantityInput && (
              <Input
                data-testid="qty-input"
                type="number"
                value={amountMobile}
                placeholder="Quantity"
                onChange={(e) => setAmountMobile(parseInt(e.target.value))}
                sx={{
                  fontSize: '12px',
                }}
              />
            )}
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
      )}
    </Stack>
  );
};

export default CartProductBar;

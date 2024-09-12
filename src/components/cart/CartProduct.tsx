import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import ImageContainer from '@/components/containers/ImageContainer';
import CartProductBar from '@/components/cart/CartProductBar';
import { useCartContext } from '@/context/CartContext';

type CartProductProps = {
  id: number;
  name: string;
  price: number;
  gender: 'Men' | 'Women';
  inStock: boolean;
  onDelete: () => void;
};

const CartProduct: React.FC<CartProductProps> = ({
  id,
  name,
  price,
  gender,
  inStock,
  onDelete,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { amount, onAmountIncrement, onAmountChange } = useCartContext();

  return (
    <Stack
      direction="row"
      sx={{
        width: {
          xs: '320px',
          md: '100%',
        },
        height: {
          xs: '100px',
          md: '214px',
        },
        gap: {
          xs: '15px',
          md: '46px',
        },
      }}
    >
      <ImageContainer
        src="https://placehold.co/200x200"
        alt="product image"
        width={isMobile ? '104px' : '223px'}
        height={isMobile ? '100px' : '214px'}
      />
      <Stack justifyContent="space-between" flexGrow="1" height="100%">
        <Box sx={{ height: 'fit-content' }}>
          <Stack direction="row" justifyContent="space-between" width="100%">
            <Typography
              component="h3"
              sx={{
                fontSize: { md: '30px', xs: '12px' },
                fontWeight: '500',
                lineHeight: { md: '35.19px', xs: '14.8px' },
              }}
            >
              {name}
            </Typography>
            <Typography
              component="h3"
              sx={{
                fontSize: { md: '30px', xs: '12px' },
                fontWeight: '500',
                lineHeight: { md: '35.19px', xs: '14.8px' },
              }}
            >
              ${price}
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontSize: { md: '20px', xs: '8px' },
              fontWeight: '500',
              lineHeight: { md: '23.46px', xs: '9.38px' },
              color: '#5C5C5C',
            }}
          >
            {gender === 'Women' ? "Woman's" : "Men's"} shoes
          </Typography>
          {!isMobile && inStock && (
            <Typography
              color="primary.main"
              sx={{
                fontSize: '25px',
                fontWeight: '600',
                lineHeight: '29.33px',
                mt: '12px',
              }}
            >
              In Stock
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: { md: 'fit-content', xs: '100%' },
            marginLeft: 'auto',
          }}
        >
          <CartProductBar
            amount={amount[id].value}
            onAddClick={() => {
              if (amount[id].value >= 0) onAmountIncrement(id, '+');
            }}
            onSubtractClick={() => {
              if (amount[id].value > 0) onAmountIncrement(id, '-');
            }}
            onDeleteClick={onDelete}
            onAmountChange={(newValue: number) => onAmountChange(id, newValue)}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default CartProduct;

'use client';
import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';
import RemoveFromWishlistIconButton from '@/components/products/RemoveFromWishlistIconButton';
import AdminMenu from '@/components/products/AdminMenu';

interface ProductCardProps {
  product: Product;
  isInWishlist?: boolean;
  isAdmin?: boolean;
}

export default function ProductCard({
  product,
  isAdmin = true,
  isInWishlist = false,
}: ProductCardProps) {
  const router = useRouter();

  const { id, name, price, images, gender } = product;

  const handleCardClick = () => {
    if (!isAdmin && id) {
      router.push(`/products/${id}`);
    }
  };

  const CardName = styled(Typography)(({ theme }) => ({
    fontSize: 10,
    fontWeight: 500,
    lineHeight: '11.7px',
    [theme.breakpoints.up('md')]: {
      fontSize: 16,
      lineHeight: '18px',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 22,
      lineHeight: '25.81px',
    },
  }));

  return (
    <Card
      square
      elevation={0}
      sx={{ position: 'relative', cursor: !isAdmin ? 'pointer' : 'default' }}
      onClick={handleCardClick}
    >
      {isInWishlist ? (
        <RemoveFromWishlistIconButton id={id} />
      ) : (
        isAdmin && <AdminMenu product={product} />
      )}
      <CardMedia
        title={images[0].name}
        image={images[0].url}
        sx={{ height: { xs: '170px', md: '275px', xl: '380px' } }}
      />
      <CardContent sx={{ px: 0 }}>
        <Stack direction="row" justifyContent="space-between" mb="2px">
          <CardName>{name}</CardName>
          <CardName>${price}</CardName>
        </Stack>
        <Typography variant="subtitle2">{gender.name}&apos;s Shoes</Typography>
      </CardContent>
    </Card>
  );
}

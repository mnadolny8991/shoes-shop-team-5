import { IconButton } from '@mui/material';
import HeartSlash from '@/components/svgIcons/HeartSlash';
import { useWishlist } from '@/context/WishlistContext';

export default function RemoveFromWishlistIconButton({ id }: { id: number }) {
  const { onProductRemove } = useWishlist();

  return (
    <IconButton
      onClick={(event) => {
        event.stopPropagation();
        onProductRemove(id);
      }}
      sx={{
        position: 'absolute',
        right: 10,
        top: 10,
        width: 44,
        height: 44,
        borderRadius: '12px',
        color: '#292D32',
        backgroundColor: '#FFFFFF3D',
        '&:hover': {
          color: 'primary.main',
          backgroundColor: '#FFFFFF7F',
        },
      }}
    >
      <HeartSlash />
    </IconButton>
  );
}

import { Box } from '@mui/material';

interface ArrowButtonProps {
  direction: 'left' | 'right';
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({ direction }) => {
  const backgroundImageUrl = `/signup-review-${direction}-arrow.png`;

  return (
    <Box
      sx={{
        cursor: 'pointer',
        width: '38px',
        height: '38px',
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundPosition: 'center',
        backgroundSize: '8px',
        backgroundRepeat: 'no-repeat',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2px solid #d7d2d5',
      }}
    />
  );
};
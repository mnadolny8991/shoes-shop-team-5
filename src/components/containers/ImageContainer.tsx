'use client';

import { Box } from '@mui/material';
import Image from 'next/image';

interface ImageContainerProps {
  src: string;
  alt: string;
  width: number | string;
  height: number | string;
  onClick?: () => void;
  sx?: object;
}

const ImageContainer: React.FC<ImageContainerProps> = ({
  src,
  alt,
  width,
  height,
  onClick,
  sx,
}) => {
  return (
    <Box
      width={width}
      height={height}
      position="relative"
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        overflow: 'hidden',
        ...sx,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        }} // ensures the image covers the container
      />
    </Box>
  );
};

export default ImageContainer;

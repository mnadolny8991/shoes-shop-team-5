'use client';
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import ImageContainer from '@/components/containers/ImageContainer';
import SliderButtons from '@/components/buttons/SliderButtons';
import { ProductImage } from '@/types/product';

type ShoeImageSliderProps = {
  images: ProductImage[];
};

export default function ShoeImageSlider({ images }: ShoeImageSliderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [choosenImageId, setChoosenImageId] = useState<number>(images[0].id);

  const [smallImageSize, setSmallImageSize] = useState({
    width: 76,
    height: 76,
  });
  const [bigImageSize, setBigImageSize] = useState({ width: 588, height: 628 });

  useEffect(() => {
    if (isMobile) {
      setSmallImageSize({ width: 40, height: 40 });
      setBigImageSize({ width: 275, height: 320 });
    } else {
      setSmallImageSize({ width: 76, height: 76 });
      setBigImageSize({ width: 588, height: 628 });
    }
  }, [isMobile]);

  function handleRightClick() {
    const imageIdx = images.findIndex((i) => i.id === choosenImageId)!;
    setChoosenImageId(images[(imageIdx + 1) % images.length].id);
  }

  function handleLeftClick() {
    const imageIdx = images.findIndex((i) => i.id === choosenImageId)!;
    if (imageIdx === 0) setChoosenImageId(images[images.length - 1].id);
    else setChoosenImageId(images[(imageIdx - 1) % images.length].id);
  }

  return (
    <Stack
      direction="row"
      gap={{ xs: '5px', md: '14px' }}
      sx={{
        height: { xs: 320, md: 628 },
        width: { xs: 320, md: 678 },
      }}
    >
      <Stack
        sx={{
          width: 'fit-content',
          height: { xs: 320, md: 628 },
        }}
        justifyContent="flex-start"
        direction="column"
      >
        {images.map((img) => (
          <ImageContainer
            key={img?.id}
            src={img?.url}
            alt={img?.alternativeText || ''}
            width={smallImageSize.width}
            height={smallImageSize.height}
            onClick={() => setChoosenImageId(img.id)}
          />
        ))}
      </Stack>
      <Box
        sx={{
          position: 'relative',
          width: 'fit-content',
          height: 'fit-content',
        }}
      >
        <ImageContainer
          src={images.find((i) => i.id === choosenImageId)!.url}
          alt="shoe image"
          width={bigImageSize.width}
          height={bigImageSize.height}
        />
        <SliderButtons
          sx={{
            position: 'absolute',
            right: 24,
            bottom: 24,
          }}
          onLeftClick={handleLeftClick}
          onRightClick={handleRightClick}
        />
      </Box>
    </Stack>
  );
}

'use client';
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import ImageContainer from '@/components/containers/ImageContainer';
import { products } from '@/mock/products';
import SliderButtons from '../buttons/SliderButtons';

type ShoeImageSliderProps = {
  shoeId: string;
};

export default function ShoeImageSlider({ shoeId }: ShoeImageSliderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [images, setImages] = useState(products[parseInt(shoeId)].images);
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
    setChoosenImageId(images[(imageIdx - 1) % images.length].id);
  }

  return (
    <Stack
      direction="row"
      gap={isMobile ? '5px' : '14px'}
      sx={{
        height: isMobile ? 320 : 628,
        width: isMobile ? 320 : 678,
      }}
    >
      <Stack
        sx={{
          width: 'fit-content',
          height: isMobile ? 320 : 628,
        }}
        justifyContent="space-between"
        direction="column"
      >
        {images.map((img) => (
          <ImageContainer
            key={img.id}
            src={img.url}
            alt={img.alternativeText}
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

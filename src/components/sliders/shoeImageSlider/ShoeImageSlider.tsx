import { Box, IconButton, ImageList, ImageListItem, Stack, styled } from '@mui/material';
import Image from 'next/image';
import { SyntheticEvent, useState } from 'react';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

// To be fetched
const images = [
  {
    id: '1223',
    url: '/abba.svg',
    alt: 'shoe image',
  },
  {
    id: '1224',
    url: '/abba.svg',
    alt: 'shoe image',
  },
  {
    id: '1225',
    url: '/abba.svg',
    alt: 'shoe image',
  },
  {
    id: '1226',
    url: '/abba.svg',
    alt: 'shoe image',
  },
  {
    id: '1227',
    url: '/abba.svg',
    alt: 'shoe image',
  },
  {
    id: '1228',
    url: '/abba.svg',
    alt: 'shoe image',
  },
  {
    id: '1229',
    url: '/abba.svg',
    alt: 'shoe image',
  },
];

type ShoeImageSliderProps = {
  shoeId: string;
};

export default function ShoeImageSlider({ shoeId }: ShoeImageSliderProps) {
  const [choosenImageId, setChoosenImageId] = useState<string>(images[0].id);

  function placeholder(width: number, height: number) {
    return (e: SyntheticEvent<HTMLImageElement, Event>) => {
      (e.target as HTMLImageElement).src =
        `https://placehold.co/${width}x${height}`;
    };
  }

  function handleRightClick() {
    const imageIdx = images.findIndex((i) => i.id === choosenImageId)!;
    setChoosenImageId(images[(imageIdx + 1) % images.length].id);
  }

  function handleLeftClick() {
    const imageIdx = images.findIndex((i) => i.id === choosenImageId)!;
    setChoosenImageId(images[(imageIdx - 1) % images.length].id);
  }

  return (
    <Stack direction="row" gap="14px" sx={{ height: 628 }}>
      <ImageList 
        sx={{
          width: 76,
          height: 628,
        }}
        gap={16}
        cols={1}
        rowHeight={76}>
        {images.map((img) => (
          <ImageListItem 
            sx={{
              cursor: 'pointer',
              backgroundColor: 'red',
            }}
            key={img.id}
            onClick={() => setChoosenImageId(img.id)}>
            <Image
              width={76}
              height={76}
              src={img.url}
              alt={img.alt}
              placeholder="blur"
              blurDataURL="https://placehold.co/76x76"
              onError={placeholder(76, 76)}
            />
          </ImageListItem>))}
      </ImageList>
      {/* <Stack gap="16px" sx={{ overflowY: 'scroll' }}>
        {images.map((img) => (
          <Image
            onClick={() => setChoosenImageId(img.id)}
            key={img.id}
            style={{
            }}
            width={76}
            height={76}
            src={img.url}
            alt={img.alt}
            placeholder="blur"
            blurDataURL="https://placehold.co/76x76"
            onError={placeholder(76, 76)}
          />))}
      </Stack> */}
      <Box
        sx={{
          position: 'relative',
          width: 'fit-content',
          height: 'fit-content',
        }}
      >
        <Image
          src={images.find((i) => i.id === choosenImageId)!.url}
          alt="shoe image"
          width={588}
          height={628}
          placeholder="blur"
          blurDataURL="https://placehold.co/588x628"
          onError={placeholder(588, 628)}
        />
        <Slider
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

type SliderProps = {
  onRightClick?: () => void;
  onLeftClick?: () => void;
  sx?: object;
};

function Slider({ sx, onRightClick, onLeftClick }: SliderProps) {
  return (
    <Stack direction="row" width="fit-content" sx={sx} gap="16px">
      <IconButton
        onClick={onLeftClick}
        sx={(theme) => ({
          p: 0,
          height: 'fit-content',
          backgroundColor: theme.palette.common.white,
          '&:hover': {
            backgroundColor: theme.palette.common.white, // Maintain white background on hover
          },
          '&:active': {
            backgroundColor: theme.palette.common.white, // Maintain white background on active state (clicked)
          },
          '&:focus': {
            backgroundColor: theme.palette.common.white, // Maintain white background on focus state
          },
        })}
      >
        <ChevronLeftOutlinedIcon sx={{ width: 24, height: 24 }} />
      </IconButton>
      <IconButton
        onClick={onRightClick}
        sx={(theme) => ({
          p: 0,
          height: 'fit-content',
          backgroundColor: theme.palette.common.white,
          '&:hover': {
            backgroundColor: theme.palette.common.white, // Maintain white background on hover
          },
          '&:active': {
            backgroundColor: theme.palette.common.white, // Maintain white background on active state (clicked)
          },
          '&:focus': {
            backgroundColor: theme.palette.common.white, // Maintain white background on focus state
          },
        })}
      >
        <ChevronRightOutlinedIcon sx={{ width: 24, height: 24 }} />
      </IconButton>
    </Stack>
  );
}

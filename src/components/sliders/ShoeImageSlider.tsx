'use client';

import {
    Box,
    IconButton,
    ImageList,
    ImageListItem,
    Stack,
    styled,
    useMediaQuery,
    useTheme,
  } from '@mui/material';
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
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
      <Stack 
        direction="row" 
        gap={isMobile ? "5px" : "14px"} 
        sx={{ 
          height: isMobile ? 320 : 628,
          width: isMobile ? 320 : '100%',
        }}>
        <ImageList
          sx={{
            width: isMobile ? 40 : 76,
            height: isMobile ? 320 : 628,
          }}
          gap={isMobile ? 3 : 16}
          cols={1}
          rowHeight={isMobile ? 40 : 76}
        >
          {images.map((img) => (
            <ImageListItem
              sx={{
                cursor: 'pointer',
              }}
              key={img.id}
              onClick={() => setChoosenImageId(img.id)}
            >
              <Image
                width={isMobile ? 40 : 76}
                height={isMobile ? 40 : 76}
                src={img.url}
                alt={img.alt}
                placeholder="blur"
                blurDataURL={`https://placehold.co/${isMobile ? 40 : 76}x${isMobile ? 40 : 76}`}
                onError={placeholder(isMobile ? 40 : 76, isMobile ? 40 : 76)}
              />
            </ImageListItem>
          ))}
        </ImageList>
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
            width={isMobile ? 275 : 588}
            height={isMobile ? 320 : 628}
            placeholder="blur"
            blurDataURL={`https://placehold.co/${isMobile ? 275 : 588}x${isMobile ? 320 : 628}`}
            onError={placeholder(isMobile ? 275 : 588, isMobile ? 320 : 628)}
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
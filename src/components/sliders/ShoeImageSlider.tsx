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
  import { SyntheticEvent, useEffect, useState } from 'react';
  import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
  import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ImageContainer from '../containers/ImageContainer';
  
  // To be fetched
  const images = [
    {
      id: '1223',
      url: 'https://placehold.co/300x300',
      alt: 'shoe image',
    },
    {
      id: '1224',
      url: 'https://placehold.co/300x300',
      alt: 'shoe image',
    },
    {
      id: '1225',
      url: 'https://placehold.co/300x300',
      alt: 'shoe image',
    },
    {
      id: '1226',
      url: 'https://placehold.co/300x300',
      alt: 'shoe image',
    },
    {
      id: '1227',
      url: 'https://placehold.co/300x300',
      alt: 'shoe image',
    },
    {
      id: '1228',
      url: 'https://placehold.co/300x300',
      alt: 'shoe image',
    },
    {
      id: '1229',
      url: 'https://placehold.co/300x300',
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

    const [smallImageSize, setSmallImageSize] = useState({ width: 76, height: 76 });
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
  
    function onError(e: SyntheticEvent<HTMLImageElement, Event>, w: number, h: number) {
        (e.target as HTMLImageElement).src =
          `https://placehold.co/${w}x${h}`;
        console.log('working');
    };
  
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
          width: isMobile ? 320 : 678,
        }}>
        <Stack
          sx={{
            width: isMobile ? 40 : 76,
            height: isMobile ? 320 : 628,
          }}
          justifyContent="space-between"
          direction="column"
        >
          {images.map((img) => (
            <ImageContainer
              key={img.id}
              src={img.url}
              alt={img.alt}
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
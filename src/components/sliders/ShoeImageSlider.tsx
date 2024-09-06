'use client';

import {
    Box,
    IconButton,
    Stack,
    useMediaQuery,
    useTheme,
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
  import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ImageContainer from '@/components/containers/ImageContainer'
import { products } from '@/mock/products';
  
  type ShoeImageSliderProps = {
    shoeId: string;
  };
  
  export default function ShoeImageSlider({ shoeId }: ShoeImageSliderProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [images, setImages] = useState(products[parseInt(shoeId)].images);
    const [choosenImageId, setChoosenImageId] = useState<number>(images[0].id);

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
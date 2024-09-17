'use client';

import { IconButton, Stack } from '@mui/material';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

type SliderButtonsProps = {
  onRightClick?: () => void;
  onLeftClick?: () => void;
  sx?: object;
};

export default function SliderButtons({
  sx,
  onRightClick,
  onLeftClick,
}: SliderButtonsProps) {
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

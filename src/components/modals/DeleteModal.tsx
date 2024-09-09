'use client';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from '../buttons/CustomButton';
import theme from '@/styles/theme';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title: string;
  bodyText: string;
};

export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
  title,
  bodyText,
}: Props) {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: isMobile ? '320px' : '656px',
          },
        },
      }}
    >
      <DialogTitle>
        <Typography
          fontWeight="500"
          fontSize={isMobile ? '30px' : '45px'}
          lineHeight={isMobile ? '35px' : '53px'}
        >
          {title}
        </Typography>
      </DialogTitle>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: '#2F2E2D',
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Typography variant="body2" color={theme.palette.text.secondary}>
          {bodyText}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: '20px 24px' }}>
        <CustomButton
          size={isMobile ? 'm' : 'xl'}
          variant="outlined"
          onClick={onClose}
        >
          Cancel
        </CustomButton>
        <CustomButton
          size={isMobile ? 'm' : 'xl'}
          variant="contained"
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          Delete
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}

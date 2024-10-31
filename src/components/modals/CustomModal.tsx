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
import CustomButton from '@/components/buttons/CustomButton';
import theme from '@/styles/theme';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title: string;
  bodyText: string;
};

export default function CustomModal({
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
            maxWidth: { xs: '320px', md: '656px' },
          },
        },
      }}
    >
      <DialogTitle>
        <Typography
          fontWeight="500"
          fontSize={{ xs: '30px', md: '45px' }}
          lineHeight={{ xs: '35px', md: '53px' }}
        >
          {title}
        </Typography>
      </DialogTitle>
      <IconButton
        onClick={onClose}
        data-testid="close-button"
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
          data-testid="delete-btn-modal"
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

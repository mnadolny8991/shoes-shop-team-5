'use client';
import { Dialog } from '@mui/material';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function EditProductModal({ isOpen, onClose, children }: Props) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          mx: { xs: 1, md: 4, lg: 10 },
          px: { md: 4, lg: 10 },
          pt: { md: '53px' },
          width: 1,
          maxWidth: 1,
        },
      }}
    >
      {children}
    </Dialog>
  );
}

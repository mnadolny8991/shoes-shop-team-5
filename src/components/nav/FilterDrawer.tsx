import {
  Drawer,
  IconButton,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Filters from '@/components/filters/Filters';

type FilterDrawerProps = {
  showFilterDrawer: boolean;
  onDrawerClose: () => void;
};

export default function FilterDrawer({
  showFilterDrawer,
  onDrawerClose,
}: FilterDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={showFilterDrawer}
      onClose={onDrawerClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: '320px',
          padding: '16px',
        },
      }}
    >
      <IconButton
        onClick={onDrawerClose}
        sx={{
          position: 'absolute',
          right: 24,
          top: 24,
          color: '#494949',
        }}
      >
        <CloseIcon sx={{ width: '20px', height: '20px' }} />
      </IconButton>
      <Stack sx={{ paddingTop: '56px' }}></Stack>

      {/* Filters Component */}
      <Filters />
    </Drawer>
  );
}
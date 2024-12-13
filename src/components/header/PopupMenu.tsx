import { Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UserPagesList from '@/components/nav/UserPagesList';

type PopupMenuProps = {
  showMenu: boolean;
  onMenuClose: () => void;
};

export default function PopupMenu({ showMenu, onMenuClose }: PopupMenuProps) {
  return (
    <Drawer
      anchor="right"
      data-testid="menuPopup"
      open={showMenu}
      sx={{
        '& .MuiDrawer-paper': {
          width: '260px',
        },
      }}
    >
      <IconButton
        data-testid="close-btn"
        onClick={() => onMenuClose()}
        sx={{
          zIndex: 10,
          position: 'absolute',
          right: 24,
          top: 24,
          color: '#494949',
        }}
      >
        <CloseIcon sx={{ width: '20px', height: '20px' }} />
      </IconButton>
      <UserPagesList sx={{ position: 'absolute', left: 32, top: 80 }} />
    </Drawer>
  );
}

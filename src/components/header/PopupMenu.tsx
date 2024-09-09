import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import getMenuItems from '@/data/menuItems';

type PopupMenuProps = {
  signedIn: boolean;
  showMenu: boolean;
  onMenuClose: () => void;
};

export default function PopupMenu({
  signedIn,
  showMenu,
  onMenuClose,
}: PopupMenuProps) {
  const menuItems = getMenuItems(signedIn);

  return (
    <Drawer
      anchor="right"
      open={showMenu}
      sx={{
        '& .MuiDrawer-paper': {
          width: '260px',
        },
      }}
    >
      <IconButton
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
      <List
        sx={{
          position: 'absolute',
          left: 32,
          top: 80,
        }}
      >
        {menuItems.map((menuItem) => (
          <ListItemButton sx={{ px: 0 }} key={menuItem.id}>
            <ListItemIcon sx={{ minWidth: '35px' }}>
              {menuItem.icon}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: '500',
                    lineHeight: '18.77px',
                  }}
                >
                  {menuItem.name}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

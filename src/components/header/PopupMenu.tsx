'use client';

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
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

type PopupMenuProps = {
  showMenu: boolean;
  onMenuClose: () => void;
};

export default function PopupMenu({ showMenu, onMenuClose }: PopupMenuProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const menuItems = getMenuItems(status === 'authenticated');

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
          <ListItemButton
            sx={{ px: 0 }}
            key={menuItem.id}
            onClick={() => {
              if (status === 'authenticated') router.push(menuItem.href);
              else signIn();
              onMenuClose();
            }}
          >
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

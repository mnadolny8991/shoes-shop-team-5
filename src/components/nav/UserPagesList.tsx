'use client';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListProps,
  styled,
  Typography,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import getMenuItems from '@/data/menuItems';

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: 0,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    backgroundColor: 'inherit',
    '& .MuiListItemIcon-root': {
      color: 'inherit',
    },
  },
  '& .MuiListItemIcon-root': {
    minWidth: 35,
    color: '#6E7378',
  },
  '& .MuiSvgIcon-root': {
    width: 20,
    height: 20,
  },
}));

export default function UserPagesList({ ...props }: ListProps) {
  const { status } = useSession();
  const menuItems = getMenuItems(status === 'authenticated');

  return (
    <List disablePadding {...props}>
      {menuItems.map((menuItem) => (
        <StyledListItem
          key={menuItem.id}
          {...(menuItem?.href
            ? {
                href: menuItem.href,
                selected: location.pathname === menuItem.href,
              }
            : { onClick: () => signOut() })}
        >
          <ListItemIcon>{menuItem.icon}</ListItemIcon>
          <ListItemText
            primary={
              <Typography
                sx={{ fontSize: 16, fontWeight: '500', lineHeight: '18.77px' }}
              >
                {menuItem.name}
              </Typography>
            }
          />
        </StyledListItem>
      ))}
    </List>
  );
}

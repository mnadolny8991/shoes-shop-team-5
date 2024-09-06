import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from '@mui/material';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const MY_PRODUCTS_PATH = '/my-products';
const SETTINGS_PATH = '/settings';

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: 0,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    backgroundColor: 'inherit',
  },
  '& .MuiListItemIcon-root': {
    minWidth: 35,
    color: 'inherit',
  },
  '& .MuiSvgIcon-root': {
    width: 20,
    height: 20,
  },
}));

export default function UserPagesList() {
  return (
    <List disablePadding>
      <StyledListItem
        href={MY_PRODUCTS_PATH}
        selected={location.pathname === MY_PRODUCTS_PATH}
      >
        <ListItemIcon>
          <ShoppingBasketOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              sx={{ fontSize: 16, fontWeight: '500', lineHeight: '18.77px' }}
            >
              My Products
            </Typography>
          }
        />
      </StyledListItem>
      <StyledListItem
        href={SETTINGS_PATH}
        selected={location.pathname === SETTINGS_PATH}
      >
        <ListItemIcon>
          <SettingsOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              sx={{ fontSize: 16, fontWeight: '500', lineHeight: '18.77px' }}
            >
              Settings
            </Typography>
          }
        />
      </StyledListItem>
      <StyledListItem>
        <ListItemIcon>
          <LogoutOutlinedIcon />
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
              Log Out
            </Typography>
          }
        />
      </StyledListItem>
    </List>
  );
}
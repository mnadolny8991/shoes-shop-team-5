import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { LoginOutlined } from '@mui/icons-material';

const getMenuItems = (signedIn: boolean) => [
  {
    id: 0,
    name: 'My Products',
    icon: <ShoppingBasketOutlinedIcon sx={{ width: '20px', height: '20px' }} />,
    href: '/my-products',
  },
  {
    id: 1,
    name: 'Settings',
    icon: <SettingsOutlinedIcon sx={{ width: '20px', height: '20px' }} />,
    href: '/settings',
  },
  signedIn
    ? {
        id: 2,
        name: 'Log Out',
        icon: <LogoutOutlinedIcon sx={{ width: '20px', height: '20px' }} />,
      }
    : {
        id: 2,
        name: 'Log In',
        icon: <LoginOutlined sx={{ width: '20px', height: '20px' }} />,
        href: '/sign-in',
      },
];

export default getMenuItems;

import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

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
  {
    id: 2,
    name: signedIn ? 'Log Out' : 'Log In',
    icon: <LogoutOutlinedIcon sx={{ width: '20px', height: '20px' }} />,
    href: '/',
  },
];

export default getMenuItems;

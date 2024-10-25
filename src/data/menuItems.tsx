import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { LoginOutlined } from '@mui/icons-material';
import SearchFavorite from '@/components/svgIcons/SearchFavorite';
import HeartSearch from '@/components/svgIcons/HeartSearch';
import Cube3dScan from '@/components/svgIcons/Cube3dScan';

const getMenuItems = (signedIn: boolean) => [
  {
    id: 0,
    name: 'My Products',
    icon: <ShoppingBasketOutlinedIcon />,
    href: '/my-products',
  },
  {
    id: 1,
    name: 'Order history',
    icon: <Cube3dScan />,
    href: '/order-history',
  },
  {
    id: 2,
    name: 'My Wishlist',
    icon: <HeartSearch />,
    href: '/my-wishlist',
  },
  {
    id: 3,
    name: 'Recently viewed',
    icon: <SearchFavorite />,
    href: '/recently-viewed',
  },
  {
    id: 4,
    name: 'Settings',
    icon: <SettingsOutlinedIcon />,
    href: '/settings',
  },
  signedIn
    ? {
        id: 5,
        name: 'Log Out',
        icon: <LogoutOutlinedIcon />,
      }
    : {
        id: 5,
        name: 'Log In',
        icon: <LoginOutlined />,
        href: '/auth/sign-in',
      },
];

export default getMenuItems;

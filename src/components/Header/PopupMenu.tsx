import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

type PopupMenuProps = {
  signedIn: boolean;
  showMenu: boolean;
  onMenuClose: () => void;
}

export default function PopupMenu({ signedIn, showMenu, onMenuClose } : PopupMenuProps) {
  return (
    <Drawer
      anchor="right"
      open={showMenu}
      sx={{
        "& .MuiDrawer-paper": {
          width: "260px",
        }
      }}>
      <IconButton
        onClick={() => onMenuClose()}
        sx={{
          zIndex: 10,
          position: "absolute",
          right: 24,
          top: 24,
          color: "#494949",
        }}>
        <CloseIcon sx={{ width: "20px", height: "20px" }}/>
      </IconButton>
      <List sx={{
        position: "absolute",
        left: 32,
        top: 80,
      }}>
        <ListItemButton sx={{ px: 0 }}>
          <ListItemIcon sx={{ minWidth: '35px' }}>
            <ShoppingBasketOutlinedIcon sx={{ width: "20px", height: "20px" }}/>
          </ListItemIcon>
          <ListItemText primary={
            <Typography sx={{ fontSize: 16, fontWeight: "500", lineHeight: "18.77px" }}>My Products</Typography>
          } />
        </ListItemButton>
        <ListItemButton sx={{ px: 0 }}>
          <ListItemIcon sx={{ minWidth: '35px' }}>
            <SettingsOutlinedIcon sx={{ width: "20px", height: "20px" }}/>
          </ListItemIcon>
          <ListItemText primary={
            <Typography sx={{ fontSize: 16, fontWeight: "500", lineHeight: "18.77px" }}>Settings</Typography>
          } />
        </ListItemButton>
        {
          signedIn ?
          <ListItemButton sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: '35px' }}>
              <LogoutOutlinedIcon sx={{ width: "20px", height: "20px" }}/>
            </ListItemIcon>
            <ListItemText primary={
              <Typography sx={{ fontSize: 16, fontWeight: "500", lineHeight: "18.77px" }}>Log Out</Typography>
            } />
          </ListItemButton>
          :
          <ListItemButton sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: '35px' }}>
              <LogoutOutlinedIcon sx={{ width: "20px", height: "20px" }}/>
            </ListItemIcon>
            <ListItemText primary={
              <Typography sx={{ fontSize: 16, fontWeight: "500", lineHeight: "18.77px" }}>Log In</Typography>
            } />
          </ListItemButton>
        }
        
      </List>
    </Drawer>
  );
}
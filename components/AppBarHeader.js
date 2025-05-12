import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { signIn, signOut } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useState } from "react";

const AppBarHeader = ({
  session,
  toggleDrawer,
  toggleDarkMode,
  darkMode,
  showSnackbar,
  isMobile,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut();
    handleClose();
    showSnackbar("Successfully signed out");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Next.js with Google Auth
        </Typography>

        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Toggle Dark Mode">
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        )}

        {session ? (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                alt={session.user.name}
                src={session.user.image}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  showSnackbar("Account settings clicked");
                }}
              >
                Account Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </div>
        ) : (
          <Button
            color="inherit"
            onClick={() => signIn("google")}
            startIcon={<Avatar sx={{ width: 24, height: 24 }}>G</Avatar>}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default AppBarHeader;

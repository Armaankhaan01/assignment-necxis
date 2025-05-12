import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const UserDrawer = ({
  open,
  session,
  darkMode,
  toggleDarkMode,
  showSnackbar,
  toggleDrawer,
}) => {
  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "primary.main",
          color: "white",
        }}
      >
        {session ? (
          <>
            <Avatar
              alt={session.user.name}
              src={session.user.image}
              sx={{ width: 64, height: 64, mb: 1, border: "2px solid white" }}
            />
            <Typography variant="h6">{session.user.name}</Typography>
            <Typography variant="body2">{session.user.email}</Typography>
          </>
        ) : (
          <>
            <Avatar sx={{ width: 64, height: 64, mb: 1 }}>G</Avatar>
            <Typography variant="h6">Guest</Typography>
            <Button
              variant="outlined"
              size="small"
              sx={{ mt: 1, color: "white", borderColor: "white" }}
              onClick={() => signIn("google")}
            >
              Sign In
            </Button>
          </>
        )}
      </Box>
      <Divider />
      <List>
        <ListItem onClick={() => showSnackbar("Home clicked")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem onClick={() => showSnackbar("Dashboard clicked")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem onClick={() => showSnackbar("Settings clicked")}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
      <Divider />
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>Dark Mode</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LightModeIcon
            sx={{ color: darkMode ? "text.disabled" : "warning.main" }}
          />
          <Switch checked={darkMode} onChange={toggleDarkMode} />
          <DarkModeIcon
            sx={{ color: darkMode ? "info.main" : "text.disabled" }}
          />
        </Box>
      </Box>
    </Box>
  );

  return (
    <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
      {drawerContent}
    </Drawer>
  );
};

export default UserDrawer;

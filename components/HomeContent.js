"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Snackbar,
} from "@mui/material";
import AppBarHeader from "./AppBarHeader";
import UserDrawer from "./UserDrawer";
import WelcomeBanner from "./WelcomeBanner";
import Footer from "./Footer";

// icons
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import CloudIcon from "@mui/icons-material/Cloud";

export function HomeContent() {
  const { data: session, status } = useSession();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Mock data for cards
  const cardData = [
    {
      title: "Frontend Development",
      description:
        "React, Next.js, Material UI, and more frontend technologies.",
      image: "/frontend.jpg",
      icon: <CodeIcon />,
    },
    {
      title: "Backend Development",
      description: "Node.js, Express, MongoDB, and other backend technologies.",
      image: "/backend.jpg",
      icon: <StorageIcon />,
    },
    {
      title: "Cloud Services",
      description:
        "AWS, Azure, Google Cloud Platform, and more cloud services.",
      image: "/cloud.jpg",
      icon: <CloudIcon />,
    },
  ];

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    showSnackbar(`Theme switched to ${!darkMode ? "dark" : "light"} mode`);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <AppBarHeader
        session={session}
        toggleDrawer={() => setDrawerOpen(true)}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        darkMode={darkMode}
        showSnackbar={showSnackbar}
      />

      <UserDrawer
        open={drawerOpen}
        session={session}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        showSnackbar={showSnackbar}
        toggleDrawer={toggleDrawer}
      ></UserDrawer>

      <WelcomeBanner
        session={session}
        darkMode={darkMode}
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        isMobile={isMobile}
        cardData={cardData}
        showSnackbar={showSnackbar}
      />

      <Footer showSnackbar={showSnackbar} darkMode={darkMode} />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
}

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { signIn } from "next-auth/react";
import useFcmToken from "@/hooks/useFcmToken";

const WelcomeBanner = ({
  session,
  darkMode,
  tabValue,
  handleTabChange,
  isMobile,
  cardData,
  showSnackbar,
}) => {
  const {
    token,
    notificationPermissionStatus,
    isWebView,
    sendTestNotification,
  } = useFcmToken();

  const handleTestNotification = async () => {
    const success = await sendTestNotification();
    if (success) {
      showSnackbar("Test notification sent!");
    } else {
      showSnackbar("Failed to send notification", "error");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          textAlign: "center",
          mb: 4,
          borderRadius: 2,
          backgroundColor: darkMode ? "primary.dark" : "primary.light",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
        elevation={3}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.8) 10%, transparent 10.5%)",
            backgroundSize: "20px 20px",
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          {session ? (
            <>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
                Welcome, {session.user.name}!
              </Typography>
              <Typography variant="h6">
                You are signed in with Google.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Avatar
                  alt={session.user.name}
                  src={session.user.image}
                  sx={{
                    width: { xs: 80, sm: 96 },
                    height: { xs: 80, sm: 96 },
                    border: "4px solid rgba(255,255,255,0.5)",
                  }}
                />
                <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Name:</strong> {session.user.name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Email:</strong> {session.user.email}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip
                      icon={<FavoriteIcon />}
                      label="Pro User"
                      color="secondary"
                      sx={{ mr: 1, mb: { xs: 1, sm: 0 } }}
                    />
                    <Chip
                      label="Google Account"
                      variant="outlined"
                      sx={{ borderColor: "white", color: "white" }}
                    />
                    {isWebView && (
                      <Chip label="Mobile App" color="success" sx={{ ml: 1 }} />
                    )}
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
                Welcome Guest
              </Typography>
              <Typography variant="h6">
                Please sign in to access all features.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => signIn("google")}
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 8,
                  fontWeight: "bold",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                  },
                  transition: "all 0.2s ease-in-out",
                }}
                startIcon={<Avatar sx={{ width: 24, height: 24 }}>G</Avatar>}
              >
                Sign In with Google
              </Button>
            </>
          )}

          {isWebView ? (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                Running in mobile app with native notifications
              </Typography>
            </Box>
          ) : (
            <>
              {notificationPermissionStatus === "granted" ? (
                <Typography variant="body2" sx={{ pt: 2 }}>
                  Permission to receive notifications has been granted.
                </Typography>
              ) : notificationPermissionStatus !== null ? (
                <Typography variant="body2" sx={{ pt: 2 }}>
                  You have not granted permission to receive notifications.
                  Please enable notifications in your browser settings.
                </Typography>
              ) : null}
            </>
          )}

          <Button
            variant="contained"
            color="secondary"
            disabled={!token}
            sx={{ mt: 3 }}
            onClick={handleTestNotification}
          >
            Send Test Notification
          </Button>
        </Box>
      </Paper>

      {/* Tabs Section */}
      <Box sx={{ width: "100%", mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons={isMobile ? "auto" : false}
            centered={!isMobile}
          >
            <Tab label="Features" />
            <Tab label="Technologies" />
            <Tab label="About" />
          </Tabs>
        </Box>
        <Box sx={{ p: 3 }}>
          {tabValue === 0 && (
            <Grid container spacing={3}>
              {cardData.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 6,
                      },
                    }}
                    elevation={2}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={card.image}
                      alt={card.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Avatar sx={{ bgcolor: "primary.main", mr: 1 }}>
                          {card.icon}
                        </Avatar>
                        <Typography variant="h6" component="div">
                          {card.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {card.description}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        size="small"
                        onClick={() =>
                          showSnackbar(`Learn more about ${card.title}`)
                        }
                        sx={{
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "rgba(25, 118, 210, 0.08)",
                          },
                        }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          {tabValue === 1 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Technologies Used
              </Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                {[
                  "Next.js",
                  "React",
                  "Material UI",
                  "Google Auth",
                  "Responsive Design",
                  "Dark Mode",
                  "Firebase FCM",
                  ...(isWebView ? ["React Native WebView"] : []),
                ].map((tech) => (
                  <Grid item key={tech}>
                    <Chip
                      label={tech}
                      color="primary"
                      variant="outlined"
                      onClick={() => showSnackbar(`${tech} clicked`)}
                    />
                  </Grid>
                ))}
              </Grid>
              <Alert severity="info" sx={{ mb: 2 }}>
                This demo showcases a responsive UI with authentication and
                modern design principles.
              </Alert>
              <Typography variant="body1">
                This project demonstrates the integration of several modern web
                technologies to create a responsive and user-friendly interface.
                The application leverages Next.js for server-side rendering and
                routing, Material UI for component styling, and Google
                Authentication for user management.
              </Typography>
              <Typography variant="body1">
                Additional features include responsive design for all device
                sizes, dark mode toggle, interactive components, and more.
              </Typography>
            </Box>
          )}
          {tabValue === 2 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                About This Project
              </Typography>
              <Typography variant="body1">
                This project serves as a demonstration of frontend development
                skills, showcasing the ability to create modern, responsive
                interfaces with authentication capabilities.
              </Typography>
              <Typography variant="body1">Key highlights include:</Typography>
              <ul>
                {[
                  "Responsive design principles for all device sizes",
                  "Google Authentication integration",
                  "Modern UI components with Material UI",
                  "Interactive elements with state management",
                  "Dark/Light mode theming",
                  "Firebase Cloud Messaging for notifications",
                  ...(isWebView ? ["WebView integration with native app"] : []),
                  "Clean, maintainable code structure",
                ].map((item, i) => (
                  <li key={i}>
                    <Typography variant="body1">{item}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};
export default WelcomeBanner;

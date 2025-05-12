import { Box, Container, Grid, Paper, Typography } from "@mui/material";

const footerLinks = [
  {
    title: "Resources",
    links: [
      { label: "Documentation", snackbarMessage: "Documentation clicked" },
      { label: "API References", snackbarMessage: "API References clicked" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", snackbarMessage: "GitHub clicked" },
      { label: "Discord", snackbarMessage: "Discord clicked" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Support", snackbarMessage: "Support clicked" },
      { label: "Feedback", snackbarMessage: "Feedback clicked" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", snackbarMessage: "Privacy Policy clicked" },
      {
        label: "Terms of Service",
        snackbarMessage: "Terms of Service clicked",
      },
    ],
  },
];

const Footer = ({ showSnackbar, darkMode }) => {
  return (
    <Paper
      component="footer"
      square
      variant="outlined"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: darkMode ? "grey.900" : "grey.100",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {footerLinks.map((section, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Typography variant="h6" gutterBottom>
                {section.title}
              </Typography>
              {section.links.map((link, i) => (
                <Typography
                  key={i}
                  variant="body2"
                  component="a"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    showSnackbar(link.snackbarMessage);
                  }}
                  sx={{
                    display: "block",
                    mb: 1,
                    color: "primary.main",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Necxis assignment with Google Auth. All
            rights reserved.
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};

export default Footer;

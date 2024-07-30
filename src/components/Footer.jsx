import { Typography, Link, Box } from "@mui/material";

const NASAFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "black",
        color: "#ffffff",
        marginTop: "auto",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Explore the Universe with NASA
      </Typography>
      <Typography variant="body1" gutterBottom>
        Connect with NASA:
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: '10px', marginBottom: '10px' }}>
        <Link href="https://www.nasa.gov" color="inherit" underline="hover" target="_blank" rel="noopener noreferrer" sx={{ flexBasis: "auto" }}>
          Official Website
        </Link>
        <Link href="https://www.facebook.com/NASA" color="inherit" underline="hover" target="_blank" rel="noopener noreferrer" sx={{ flexBasis: "auto" }}>
          Facebook
        </Link>
        <Link href="https://twitter.com/NASA" color="inherit" underline="hover" target="_blank" rel="noopener noreferrer" sx={{ flexBasis: "auto" }}>
          Twitter
        </Link>
        <Link href="https://www.instagram.com/nasa/" color="inherit" underline="hover" target="_blank" rel="noopener noreferrer" sx={{ flexBasis: "auto" }}>
          Instagram
        </Link>
      </Box>
      <Typography variant="body2" gutterBottom>
        © {new Date().getFullYear()} NASA. All rights reserved.
      </Typography>
    </Box>
  );
};

export default NASAFooter;

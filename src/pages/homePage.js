import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import HomeApod from "../components/homeApodCard";

const HomePage = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(https://www.nasa.gov/wp-content/uploads/2023/01/webb-tarantula-neb.png?resize=2000,1561)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Center vertically
          textAlign: "center", // Center horizontally
        }}
      >
        <Container>
          <Typography
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.8rem", md: "4.5rem" },
              lineHeight: { xs: "1.2", sm: "1.4", md: "1.6" },
              fontWeight: "bold",
              color: "white",
            }}
          >
            Welcome to NASA
          </Typography>
        </Container>
      </Box>

      <Container sx={{ mt: "50px" }}>
        <Typography
          sx={{
            fontSize: { xs: "1.0rem", sm: "1.8rem", md: "2.0rem" },
            mb: "45px",
          }}
        >
          Astronomy Picture of the Day
        </Typography>
        <Grid container spacing={2}>
          {/* content */}
        </Grid>
      <HomeApod />
      </Container>
    </>
  );
};

export default HomePage;

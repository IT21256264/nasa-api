import { Container, Grid } from "@mui/material";
import React from "react";
import MarsCardData from "../components/MarsCard";

const marsRoverPage = () => {
  return (
    <Container sx={{ mt: "100px" }}>
      <MarsCardData />
    </Container>
  );
};

export default marsRoverPage;

import React, { useEffect, useState } from "react";
import { marsAPI } from "../service/mars";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import BasicDatePicker from "./DatePicker";
import dayjs from "dayjs";

const MarsCardData = () => {
  const [marsData, setMarsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [earthDate, setEarthDate] = useState("2021-08-15");
  const [categorizedImages, setCategorizedImages] = useState({});

  useEffect(() => {
    fetchData(earthDate);
  }, []);

  const fetchData = async (earthDate) => {
    setLoading(true); // Set loading to true when fetching new data
    let date = dayjs(earthDate)
      .add(1, "day")
      .toDate()
      .toISOString()
      .split("T")[0];
    console.log(date);
    try {
      const data = await marsAPI({ date });
      setMarsData(data);
      categorizeImages(data);
    } catch (error) {
      console.error("Error fetching APOD data:", error);
      setError(error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const handleDate = async () => {
    fetchData(earthDate);
  };

  // Function to categorize images based on camera type
  const categorizeImages = (data) => {
    if (!data || !data.photos) {
      setCategorizedImages({}); // Reset categorized images if no data
      return;
    }

    const categorizedImages = {};
    data.photos.forEach((photo) => {
      const cameraName = photo.camera.name;
      if (!categorizedImages[cameraName]) {
        categorizedImages[cameraName] = [];
      }
      categorizedImages[cameraName].push(photo);
    });
    setCategorizedImages(categorizedImages);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          mb: "50px",
        }}
      >
        <Typography variant="h4">Mars Rover Images</Typography>
      </Box>

      {/* add date picker */}
      <Box sx={{ mb: "20px" }}>
        <BasicDatePicker label={"Earth Date"} setDate={setEarthDate} />
      </Box>

      <Button onClick={handleDate} variant="contained" sx={{ mb: "20px" }}>
        Search
      </Button>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error message */}
      {error && <Typography>Error: {error}</Typography>}

      {/* Display categorized images */}
      {Object.keys(categorizedImages).length === 0 ? (
        <Typography variant="body1" align="center" sx={{ mt: 2, color: "red" }}>
          No images found
        </Typography>
      ) : (
        <>
          {Object.keys(categorizedImages).map((cameraName) => (
            <div key={cameraName}>
              <Typography variant="h5">{cameraName} Images</Typography>
              <div style={{ overflowX: "auto" }}>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    display: "grid",
                    gridAutoFlow: "column",
                    gridGap: "16px",
                    padding: "16px",
                  }}
                >
                  {categorizedImages[cameraName].map((photo) => (
                    <Grid item key={photo.id} sx={{ minWidth: "280px" }}>
                      <Card sx={{ height: "100%" }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            sx={{ height: "300px" }}
                            image={photo.img_src}
                            alt={photo.camera.full_name}
                          />
                          <CardContent>
                            <Typography variant="body2" color="text.secondary">
                              Martian solar day (sol): {photo.sol}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Earth Date: {photo.earth_date}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Rover: {photo.rover.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Landing Date: {photo.rover.landing_date}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Rover Status: {photo.rover.status}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MarsCardData;

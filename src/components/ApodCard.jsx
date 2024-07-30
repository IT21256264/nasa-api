import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { apodAPI } from "../service/apod";
import BasicDatePicker from "./DatePicker";
import dayjs from "dayjs";

export default function ApodCardData() {
  const [apodData, setApodData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(
    dayjs().subtract(6, "day").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    dayjs().subtract(1, "day").format("YYYY-MM-DD")
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedApod, setSelectedApod] = useState(null);

  useEffect(() => {
    // Fetch APOD data when component mounts
    fetchData(startDate, endDate);
    console.log(startDate, endDate);
  }, []); // Update data when start or end date changes

  const fetchData = async (startDate, endDate) => {
    setLoading(true); // Set loading to true when fetching new data
    let start = dayjs(startDate)
      .add(1, "day")
      .toDate()
      .toISOString()
      .split("T")[0];
    let end = dayjs(endDate).add(1, "day").toDate().toISOString().split("T")[0];
    try {
      const data = await apodAPI({ start, end });
      setApodData(data);
    } catch (error) {
      console.error("Error fetching APOD data:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter APOD data based on search query
  const filteredApodData =
    apodData && apodData.length > 0
      ? apodData.filter((apod) =>
          apod.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  const handleDate = () => {
    fetchData(startDate, endDate);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = (apod) => {
    setSelectedApod(apod);
    setOpenDialog(true);
  };

  return (
    <div>
      {/* add description */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h4" align="center">
          Astronomy Picture of the Day
        </Typography>
      </Box>

      {/* Date pickers for start and end dates */}
      <Grid container spacing={2} sx={{ mt: 2, justifyContent: "center" }}>
        <Grid item xs={12} sm={6}>
          <BasicDatePicker label={"Start Date"} setDate={setStartDate} />
          <BasicDatePicker label={"End Date"} setDate={setEndDate} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleDate}
            size="large"
            sx={{ mt: "15px", mb: "20px" }}
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              with: "100%",
              display: "grid",
              placeItems: "end",
            }}
          >
            <TextField
              label="Filter by name"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ width: "50%" }}
              margin="normal"
            />
          </Box>
        </Grid>
      </Grid>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Display filtered APOD data */}
      {apodData && apodData.length > 0 ? (
        <Grid container spacing={4}>
          {filteredApodData.map((apod) => (
            <Grid item xs={12} sm={12} md={12} key={apod.date}>
              {apod.media_type === "image" && (
                <Card sx={{ height: "100%" }}>
                  <CardActionArea onClick={() => handleOpenDialog(apod)}>
                    <CardMedia
                      component="img"
                      sx={{ height: 400, objectFit: "cover" }}
                      image={apod.url}
                      alt={apod.title}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: "right" }}
                      >
                        {apod.date}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {apod.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {apod.explanation}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              )}

              {apod.media_type === "video" && (
                <Card sx={{ height: "100%" }}>
                  <CardActionArea>
                    <CardMedia
                      component="iframe"
                      sx={{ height: 400, objectFit: "cover" }}
                      image={apod.url}
                      title={apod.title}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: "right" }}
                      >
                        {apod.date}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {apod.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {apod.explanation}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              )}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" align="center" sx={{ mt: 2, color: "red" }}>
          No APOD data available.
        </Typography>
      )}
      {/* Dialog to display HD image */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedApod && selectedApod.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedApod && selectedApod.explanation}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              window.open(selectedApod && selectedApod.hdurl, "_blank")
            }
          >
            Open HD Image
          </Button>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

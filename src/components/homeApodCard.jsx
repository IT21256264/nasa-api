import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  CardActionArea,
  CircularProgress,
  Grid,
} from "@mui/material";
import { apodAPI } from "../service/apod";
import dayjs from "dayjs";

export default function HomeApod() {
  const [apodData, setApodData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(
    dayjs().subtract(8, "day").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    dayjs().subtract(1, "day").format("YYYY-MM-DD")
  );

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


  // Filter APOD data based on search query
  const filteredApodData =
    apodData && apodData.length > 0
      ? apodData.filter((apod) =>
          apod.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];



  return (
    <div>
    

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Display filtered APOD data */}
      {apodData && apodData.length > 0 ? (
        <div style={{overflowX:'auto',marginBottom:'20px'}}>
             <Grid container spacing={4}
             sx={{
                display: "grid",
                gridAutoFlow: "column",
               
              
             }}
              
             >
          {filteredApodData.map((apod) => (
            <Grid item xs={12} sm={12} md={3} key={apod.date}>
              {apod.media_type === "image" && (
                <Card sx={{ width:"400px",height:'100%'}}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      sx={{ height: 400, objectFit: "cover" }}
                      image={apod.url}
                      alt={apod.title}
                    />
                    <CardContent>
                    
                      <Typography gutterBottom variant="h5" component="div">
                        {apod.title}
                      </Typography>
                      
                    </CardContent>
                  </CardActionArea>
                </Card>
              )}

            </Grid>
          ))}
        </Grid>
        </div>
          
     
      ) : (
        <Typography variant="body1" align="center" sx={{ mt: 2, color: "red" }}>
          No APOD data available.
        </Typography>
      )}
    </div>
  );
}

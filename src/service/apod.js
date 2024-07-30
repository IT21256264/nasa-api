import axios from "axios";

export const apodAPI = async ({ start, end }) => {
  try {
    const response = await axios.get("https://api.nasa.gov/planetary/apod", {
      params: {
        api_key: process.env.REACT_APP_NASA_API_KEY,
        start_date: start,
        end_date: end,
      },
    });
    console.log("APOD data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching APOD data:", error);
  }
};

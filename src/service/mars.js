import axios from "axios";

export const marsAPI = async ({date}) => {
    try {
        const response = await axios.get(
        "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
        {
            params: {
            api_key: process.env.REACT_APP_NASA_API_KEY,
            earth_date: date
            },
        }
        );
        console.log("mars data:", response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching mars data:", error);
    }
};
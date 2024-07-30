# NASA Frontend

## Description

This project is a frontend application for accessing NASA data and resources. It utilizes React.js along with various libraries and tools to provide a user-friendly interface for accessing NASA's data.

1. **APOD (Astronomy Picture of the Day) API**

   - Description: Retrieves the astronomy picture of the day along with a brief explanation written by a professional astronomer.
   - Base URL: `https://api.nasa.gov/planetary/apod`
   - Parameters:
     - `date`: (Optional) The date of the APOD image in YYYY-MM-DD format.
     - `api_key`: Your API key obtained from NASA. Required for authentication.
   - Example Request: `GET https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`

2. **Mars Rover Photos API**

   - Description: Retrieves photos taken by various Mars rovers on their missions.
   - Base URL: `https://api.nasa.gov/mars-photos/api/v1/rovers`
   - Parameters:
     - `rover`: The name of the rover (e.g., `curiosity`, `opportunity`, `spirit`).
     - `sol`: (Optional) The Martian sol (a Martian day) for which to retrieve photos.
     - `camera`: (Optional) The name of the camera (e.g., `FHAZ`, `RHAZ`, `MAST`, `CHEMCAM`, `NAVCAM`).
     - `api_key`: Your API key obtained from NASA. Required for authentication.
   - Example Request: `GET https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY`

## Installation

Before running the application, ensure you have Node.js and npm (Node Package Manager) installed on your machine.

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the necessary dependencies.

   
## Usage

To start the development server, use the following command:

```
npm start
```

This will start the development server and open the application in your default web browser.

To test the application, use the following command:

```
npm test
```

To build the application for production, use the following command:

```
npm run build
```


This will create a production-ready build of the application in the `build` directory.

## Technologies Used

- React.js
- Material-UI
- Axios
- Day.js
- Firebase
- React Router
- dotenv


## Acknowledgements

- Thanks to NASA for providing the data and resources used in this project.
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Website Link
https://nasa-api-1d77b.web.app/
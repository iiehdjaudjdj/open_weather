# Weather Application

## Project Description

This is a modern weather app made with HTML, CSS, and JavaScript. The app uses OpenWeatherMap API to get real-time weather data. You can search for weather of any city in the world. It has dark mode and light mode toggle for better user experience. The design works on all screen sizes including mobile phones. It has loading animations and error handling for smooth user experience.

## API Details Used

### Base URL

https://api.openweathermap.org/data/2.5/weather

### Endpoints

GET /weather - Current weather data endpoint used to get weather information of a city

GET /weather?q={city name} - Search weather by city name

GET /weather?q={city name}&appid={API key}&units=metric - Get weather data with metric units

### Required Parameters

q - Query parameter that is required, must have city name (required)

appid - API key that is required to authenticate the request (required)

units - Optional parameter for temperature units, we use metric for Celsius

### Authentication

API key - You need a valid API key from OpenWeatherMap. Store the API key in config.js file. Do not commit the actual API key to GitHub, use YOUR_API_KEY_HERE as placeholder.

### Sample JSON Response

{
  "coord": {
    "lon": 120.9822,
    "lat": 14.6042
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 32.5,
    "feels_like": 38.2,
    "temp_min": 30.1,
    "temp_max": 34.8,
    "pressure": 1013,
    "humidity": 65
  },
  "visibility": 10000,
  "wind": {
    "speed": 3.5,
    "deg": 180
  },
  "sys": {
    "type": 1,
    "id": 8179,
    "country": "PH",
    "sunrise": 1609459200,
    "sunset": 1609502400
  },
  "name": "Manila",
  "dt": 1609459200
}

### Fetch the Data (JavaScript)

We use the fetch() function with async/await for API calls. We build a URL with query parameters for city name, API key, and units. There is error handling for different HTTP status codes.


### API Key

The API key is stored in config.js file. The config.js file is imported in HTML. There is a placeholder YOUR_API_KEY_HERE for sample. Do not commit the actual API key to GitHub.

## Instructions to Run the Project

First, you need to get an API key from OpenWeatherMap. Go to https://openweathermap.org/api and sign up to get a free API key. Then, open the config.js file and replace YOUR_API_KEY_HERE with your actual API key.

To run the project, just open the index.html file in your web browser. You can double click the index.html file or open it with your web browser. You do not need a server or to install anything. You can also open it using a local server like XAMPP, WAMP, or Live Server extension in VS Code.

For best experience, use modern web browsers like Chrome, Firefox, Edge, or Safari. The weather app works on all screen sizes so you can use it on desktop, tablet, or mobile phone. You can also bookmark it in mobile browser to make it like an app.

## Screenshots Included

<img width="1705" height="986" alt="image" src="https://github.com/user-attachments/assets/15b0054a-b1ba-47f6-89c9-0efc423f24ef" />

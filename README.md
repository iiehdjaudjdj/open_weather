# Weather Application

## Project Description

Ito ay isang modern at propesyonal na weather application na ginawa gamit ang HTML, CSS, at JavaScript. Ang application na ito ay gumagamit ng OpenWeatherMap API para makakuha ng real-time weather data. Mayroon itong search functionality para makita ang weather ng kahit anong city sa buong mundo. May dark mode at light mode toggle din para sa better user experience. Responsive ang design sa lahat ng screen sizes kabilang ang mobile devices. May loading animations at error handling din para sa smooth user experience.

## API Details Used

### Base URL

https://api.openweathermap.org/data/2.5/weather

### Endpoints

GET /weather - Current weather data endpoint na ginagamit para makakuha ng weather information ng isang city

GET /weather?q={city name} - Search weather by city name

GET /weather?q={city name}&appid={API key}&units=metric - Get weather data with metric units

### Required Parameters

q - Query parameter na kailangan, dapat may city name (required)

appid - API key na kailangan para ma-authenticate ang request (required)

units - Optional parameter para sa temperature units, ginagamit namin ang metric para sa Celsius

### Authentication

API key - Kailangan ng valid API key mula sa OpenWeatherMap. I-store ang API key sa config.js file. Hindi dapat i-commit ang actual API key sa GitHub, gamitin ang YOUR_API_KEY_HERE bilang placeholder.

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

Ginagamit namin ang fetch() function na may async/await para sa API calls. Nag-construct kami ng URL na may query parameters para sa city name, API key, at units. May error handling din para sa different HTTP status codes.

### Display in HTML (DOM)

Ginagamit namin ang card layout para sa main weather information. May grid layout din para sa weather details tulad ng humidity, wind speed, at visibility. May icons din mula sa Bootstrap Icons para sa visual representation. May weather icon din na galing sa OpenWeatherMap API.

### Error Handling

May comprehensive error handling para sa different scenarios. Kapag 404 ang status, nagpapakita ng City not found message. Kapag 401, nagpapakita ng Invalid API key message. May network error handling din para sa connection issues. May input validation din para sa empty fields at invalid characters.

### Input Validation

May input validation na chine-check kung empty ang field. Chine-check din kung valid ang characters at kung may minimum length. Auto-trim ng whitespace para sa clean input. Disable ang button habang naglo-load para maiwasan ang multiple requests.

### Loading State

May loading spinner na nagpapakita habang nagfe-fetch ng data mula sa API. May Loading text din para sa user feedback. Disable ang search button habang nagpo-process para maiwasan ang double-clicks.

### Responsive Design

Responsive ang design sa lahat ng screen sizes. May media queries para sa mobile, tablet, at desktop. Flexible grid layout na nag-a-adjust base sa screen size. Responsive typography at spacing din.

### Comments in Code

May 5 Tagalog comments sa most important functions. May explanations para sa API calls, DOM manipulation, at utility functions. Simple at easy to understand ang comments.

### File Requirements

May exactly 4 files ang project. index.html para sa HTML structure, style.css para sa styling, script.js para sa JavaScript functionality, at config.js para sa API key storage. Walang inline CSS o JavaScript.

### Code Organization

Ginagamit lang namin ang functions, walang constructors o classes. Separate functions para sa API calls, DOM manipulation, at utility functions. Walang duplicated code, may reusable functions.

### UI Requirements

May search bar para sa city input. May search button para trigger ang API call. May results container para sa weather data display. May error container para sa error messages. May footer na may API source credits. May theme toggle button para sa dark/light mode.

### API Key Security

Naka-store ang API key sa config.js file. Imported ang config.js file sa HTML. May placeholder na YOUR_API_KEY_HERE para sa sample. Hindi dapat i-commit ang actual API key sa GitHub.

## Instructions to Run the Project

Una, kailangan mong kumuha ng API key mula sa OpenWeatherMap. Pumunta sa https://openweathermap.org/api at mag-sign up para makakuha ng free API key. Pagkatapos, buksan ang config.js file at palitan ang YOUR_API_KEY_HERE ng actual API key mo.

Para ma-run ang project, buksan lang ang index.html file sa web browser. Pwede mong i-double click ang index.html file o i-open gamit ang web browser. Hindi na kailangan ng server o installation ng dependencies. Pwede mo ring i-open gamit ang local server tulad ng XAMPP, WAMP, o Live Server extension sa VS Code.

Para sa best experience, gamitin ang modern web browsers tulad ng Chrome, Firefox, Edge, o Safari. Responsive ang weather app sa lahat ng screen sizes kaya pwede mo itong gamitin sa desktop, tablet, o mobile phone. Pwede mo ring i-bookmark sa mobile browser para maging parang app.

## Screenshots Included

Ang weather application ay may modern dark theme na may blue at green accent colors. May light mode din na may white background. May search bar sa taas na may search button. May large weather display card na nagpapakita ng city name, temperature, weather icon, at description. May grid layout ng weather details tulad ng feels like, humidity, wind speed, visibility, min temp, at max temp. May loading spinner kapag nagfe-fetch ng data. May error messages kapag may problema sa API call o invalid input. Responsive ang design sa lahat ng screen sizes. May theme toggle button sa header para sa dark/light mode switching.


const weatherSearchInput = document.getElementById('weatherSearchInput');
const weatherSearchBtn = document.getElementById('weatherSearchBtn');
const weatherLoading = document.getElementById('weatherLoading');
const weatherError = document.getElementById('weatherError');
const weatherErrorMessage = document.getElementById('weatherErrorMessage');
const weatherResults = document.getElementById('weatherResults');
const weatherThemeToggle = document.getElementById('weatherThemeToggle');
const weatherThemeIcon = document.getElementById('weatherThemeIcon');
const weatherBody = document.body;
const weatherSuggestions = document.getElementById('weatherSuggestions');

const weatherCityName = document.getElementById('weatherCityName');
const weatherCountry = document.getElementById('weatherCountry');
const weatherDate = document.getElementById('weatherDate');
const weatherIcon = document.getElementById('weatherIcon');
const weatherTemp = document.getElementById('weatherTemp');
const weatherDescription = document.getElementById('weatherDescription');
const weatherFeelsLike = document.getElementById('weatherFeelsLike');
const weatherHumidity = document.getElementById('weatherHumidity');
const weatherWindSpeed = document.getElementById('weatherWindSpeed');
const weatherVisibility = document.getElementById('weatherVisibility');
const weatherMinTemp = document.getElementById('weatherMinTemp');
const weatherMaxTemp = document.getElementById('weatherMaxTemp');

let weatherCurrentTheme = localStorage.getItem('weatherTheme') || 'dark';
let weatherSuggestionTimeout = null;
let weatherCurrentSuggestions = [];

// apply the dark mode or light mode, change the colors of the whole page
function weatherApplyTheme(theme) {
    if (theme === 'light') {
        weatherBody.classList.remove('weather-dark');
        weatherBody.classList.add('weather-light');
        weatherThemeIcon.className = 'bi bi-sun-fill';
        weatherCurrentTheme = 'light';
    } else {
        weatherBody.classList.remove('weather-light');
        weatherBody.classList.add('weather-dark');
        weatherThemeIcon.className = 'bi bi-moon-fill';
        weatherCurrentTheme = 'dark';
    }
    localStorage.setItem('weatherTheme', weatherCurrentTheme);
}

function weatherToggleTheme() {
    if (weatherCurrentTheme === 'dark') {
        weatherApplyTheme('light');
    } else {
        weatherApplyTheme('dark');
    }
}

// check if the input is valid, remove the spaces and check if there are invalid characters
function weatherValidateInput(input) {
    const trimmedInput = input.trim();
    
    if (trimmedInput === '') {
        return {
            valid: false,
            message: 'Please enter a city name'
        };
    }
    
    if (trimmedInput.length < 2) {
        return {
            valid: false,
            message: 'City name must be at least 2 characters'
        };
    }
    
    const invalidChars = /[<>{}[\]\\\/]/;
    if (invalidChars.test(trimmedInput)) {
        return {
            valid: false,
            message: 'Invalid characters in city name'
        };
    }
    
    return {
        valid: true,
        value: trimmedInput
    };
}

function weatherShowLoading() {
    weatherLoading.style.display = 'block';
    weatherError.style.display = 'none';
    weatherResults.style.display = 'none';
}

function weatherHideLoading() {
    weatherLoading.style.display = 'none';
}

function weatherShowError(message) {
    weatherErrorMessage.textContent = message;
    weatherError.style.display = 'flex';
    weatherResults.style.display = 'none';
    weatherHideLoading();
}

function weatherShowResults() {
    weatherError.style.display = 'none';
    weatherResults.style.display = 'block';
    weatherHideLoading();
}

function weatherAddLoadingState(button) {
    button.classList.add('loading');
    button.disabled = true;
}

function weatherRemoveLoadingState(button) {
    setTimeout(function() {
        button.classList.remove('loading');
        button.disabled = false;
    }, 300);
}

// get the city suggestions
async function weatherFetchSuggestions(query) {
    if (query.length < 2) {
        weatherHideSuggestions();
        return;
    }
    
    const apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + encodeURIComponent(query) + '&limit=5&appid=' + WEATHER_API_KEY;
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            return [];
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        return [];
    }
}

// get the weather data from the api 
async function weatherFetchData(cityName) {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(cityName) + '&appid=' + WEATHER_API_KEY + '&units=metric';
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the city name and try again.');
            } else if (response.status === 401) {
                throw new Error('Invalid API key. Please check your configuration.');
            } else {
                throw new Error('Failed to fetch weather data. Please try again later.');
            }
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        if (error.message) {
            throw error;
        } else {
            throw new Error('Network error. Please check your internet connection.');
        }
    }
}

function weatherFormatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    return dayName + ', ' + monthName + ' ' + day + ', ' + year;
}

// display the weather data on the screen
function weatherDisplayData(data) {
    weatherCityName.textContent = data.name;
    weatherCountry.textContent = data.sys.country;
    weatherDate.textContent = weatherFormatDate(data.dt);
    
    const iconCode = data.weather[0].icon;
    weatherIcon.src = 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png';
    weatherIcon.alt = data.weather[0].description;
    
    weatherTemp.textContent = Math.round(data.main.temp);
    weatherDescription.textContent = data.weather[0].description;
    weatherFeelsLike.textContent = Math.round(data.main.feels_like) + '°C';
    weatherHumidity.textContent = data.main.humidity + '%';
    weatherWindSpeed.textContent = data.wind.speed + ' m/s';
    
    const visibilityKm = (data.visibility / 1000).toFixed(1);
    weatherVisibility.textContent = visibilityKm + ' km';
    
    weatherMinTemp.textContent = Math.round(data.main.temp_min) + '°C';
    weatherMaxTemp.textContent = Math.round(data.main.temp_max) + '°C';
    
    weatherShowResults();
}

// main function , check the input and call the api
async function weatherHandleSearch() {
    const inputValue = weatherSearchInput.value;
    const validation = weatherValidateInput(inputValue);
    
    if (!validation.valid) {
        weatherShowError(validation.message);
        return;
    }
    
    weatherShowLoading();
    weatherAddLoadingState(weatherSearchBtn);
    
    try {
        const data = await weatherFetchData(validation.value);
        weatherDisplayData(data);
    } catch (error) {
        weatherShowError(error.message);
    } finally {
        weatherRemoveLoadingState(weatherSearchBtn);
    }
}

function weatherDisplaySuggestions(suggestions) {
    if (suggestions.length === 0) {
        weatherHideSuggestions();
        return;
    }
    
    weatherCurrentSuggestions = suggestions;
    weatherSuggestions.innerHTML = '';
    
    suggestions.forEach(function(suggestion) {
        const item = document.createElement('div');
        item.className = 'weather-suggestion-item';
        
        const icon = document.createElement('i');
        icon.className = 'bi bi-geo-alt-fill';
        
        const content = document.createElement('div');
        content.className = 'weather-suggestion-content';
        
        const name = document.createElement('div');
        name.className = 'weather-suggestion-name';
        name.textContent = suggestion.name;
        
        const location = document.createElement('div');
        location.className = 'weather-suggestion-location';
        let locationText = '';
        if (suggestion.state) {
            locationText = suggestion.state + ', ' + suggestion.country;
        } else {
            locationText = suggestion.country;
        }
        location.textContent = locationText;
        
        content.appendChild(name);
        content.appendChild(location);
        
        item.appendChild(icon);
        item.appendChild(content);
        
        item.addEventListener('click', function() {
            weatherSearchInput.value = suggestion.name + ', ' + suggestion.country;
            weatherHideSuggestions();
            weatherHandleSearch();
        });
        
        weatherSuggestions.appendChild(item);
    });
    
    weatherSuggestions.classList.add('show');
}

function weatherHideSuggestions() {
    weatherSuggestions.classList.remove('show');
    weatherCurrentSuggestions = [];
}

function weatherHandleInputChange() {
    const query = weatherSearchInput.value.trim();
    
    clearTimeout(weatherSuggestionTimeout);
    
    if (query.length < 2) {
        weatherHideSuggestions();
        return;
    }
    
    weatherSuggestionTimeout = setTimeout(async function() {
        const suggestions = await weatherFetchSuggestions(query);
        weatherDisplaySuggestions(suggestions);
    }, 300);
}

function weatherHandleSearchKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        weatherHideSuggestions();
        weatherHandleSearch();
    } else if (event.key === 'Escape') {
        weatherHideSuggestions();
    }
}

weatherSearchBtn.addEventListener('click', function() {
    weatherHideSuggestions();
    weatherHandleSearch();
});

weatherSearchInput.addEventListener('input', weatherHandleInputChange);
weatherSearchInput.addEventListener('keypress', weatherHandleSearchKeyPress);
weatherSearchInput.addEventListener('focus', function() {
    if (weatherCurrentSuggestions.length > 0) {
        weatherSuggestions.classList.add('show');
    }
});

document.addEventListener('click', function(event) {
    const target = event.target;
    const isClickInside = weatherSearchInput.contains(target) || 
                         weatherSuggestions.contains(target) || 
                         weatherSearchBtn.contains(target);
    
    if (!isClickInside) {
        weatherHideSuggestions();
    }
});

weatherThemeToggle.addEventListener('click', weatherToggleTheme);

weatherApplyTheme(weatherCurrentTheme);


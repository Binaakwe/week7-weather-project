function refreshWeather(response){
    let currentTemperatureElement = document.querySelector("#current-temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#current-humidity");
    let windSpeedElement = document.querySelector("#current-windspeed");
    let timeElement = document.querySelector("#current-time");
    let date = new Date;
    let iconElement = document.querySelector("#icon");

    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temperature-icon" />`;
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML =formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity + "%";
    windSpeedElement.innerHTML = response.data.wind.speed + "km/h";
    currentTemperatureElement.innerHTML = Math.round(temperature);

    getForecast(response.data.city);
}

function formatDate(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
if (minutes < 10) {
    minutes = "0"+minutes;
}

return day + ", " + hours + ":" + minutes;
}

function searchCity(city) {
    let apiKey = "bao9daft74843030f3c02398ec6e1d64";
    let apiUrl = "https://api.shecodes.io/weather/v1/current?query="+city+"&key="+apiKey;
    axios.get(apiUrl).then(refreshWeather);
}


function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    
    searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey ="bao9daft74843030f3c02398ec6e1d64";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    console.log(response.data);

    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) { 
        forecastHtml =
            forecastHtml + 
            ` <div class="weather-forecast-day">
                <div class="weather-forecast-date">${formatDay(day.time)}</div>
                <div ><img src="${day.condition.icon_url}" class="weather-forecast-icon"></div>
                <div class="weather-forecast-temperatures">
                    <div class="weather-forecast-temperature-max">${Math.round(day.temperature.maximum)}°</div>
                    <div class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</div>
                </div>
            </div>` ;
        }
} ) ;

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}



let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Toronto");

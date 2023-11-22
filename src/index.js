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

let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Toronto");
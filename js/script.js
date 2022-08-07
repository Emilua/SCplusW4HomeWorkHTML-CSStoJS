function formatDate(date) {
   let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   let day = days[date.getDay()];
   let hours = date.getHours();
   if (hours < 10) {
      hours = `0${hours}`;
   }
   let minutes = date.getMinutes();
   if (minutes < 10) {
      minutes = `0${minutes}`;
   }
   return `${day} ${hours}:${minutes}`;
}

function displayFahrenhitTemperature(event) {
   event.preventDefault();
   celsiumLink.classList.remove('active');
   fahrenhitlink.classList.add('active');
   let temperatureElement = document.querySelector('#temperature');
   let temperature = Math.round((celsiusTemperature * 9) / 5 + 32);
   temperatureElement.innerHTML = temperature;

}
function showCelsium(event) {
   event.preventDefault();
   celsiumLink.classList.add('active');
   fahrenhitlink.classList.remove('active');
   let temperature = document.querySelector('#temperature');
   temperature.innerHTML = celsiusTemperature;
}
function search(event) {
   event.preventDefault();
   let inputSearch = document.querySelector('#inputSearch');

   let city = inputSearch.value;
   let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
   axios.get(urlApi).then(showTemperature);
}

function getForecast(coordinates) {
   let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;
   axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
   console.log(response.data.weather[0].icon);
   let temperatureEliment = document.querySelector('#temperature');
   temperatureEliment.innerHTML = Math.round(response.data.main.temp);
   let descriptionElement = document.querySelector('#description');
   descriptionElement.innerHTML = response.data.weather[0].description;
   let humidityElement = document.querySelector('#humidity');
   humidityElement.innerHTML = response.data.main.humidity;
   let windSpeedElement = document.querySelector('#wind-speed');
   windSpeedElement.innerHTML = response.data.wind.speed;
   let cityElement = document.querySelector('#current-city');
   cityElement.innerHTML = response.data.name;
   celsiusTemperature = Math.round(response.data.main.temp);
   let weatherIcon = document.querySelector("#weather-icon");
   let iconCode = response.data.weather[0].icon;
   let iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
   weatherIcon.innerHTML = `<img src="${iconUrl}" alt="cloudy"
   class="weather-icon float-left" id="weather-icon">`;

   getForecast(response.data.coord);

}



function showPosition(position) {
   let lat = position.coords.latitude;
   let lon = position.coords.longitude;
   let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
   axios.get(urlApi).then(showTemperature);
}
function getCurrentPosition(event) {
   event.preventDefault();
   navigator.geolocation.getCurrentPosition(showPosition);

}

function firstPage() {
   let city = "dnipro";
   let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
   axios.get(urlApi).then(showTemperature);
}

function formatDay(timeStamp) {
   let date = new Date(timeStamp * 1000);
   let day = date.getDay();
   let days = ["Sun", "Man", "Tue", "Wed", "Thu", "Fri", "Sat"]

   return days[day];
}

function displayForecast(response) {
   let forecastElement = document.querySelector('#forecast');
   let forecast = response.data.daily;
   let forecastHTML = `<div class="row">`;
   forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
         forecastHTML = forecastHTML + `<div class="col-2">
   <div class="wether-forecast-day">${formatDay(forecastDay.dt)}</div>
   <img src="http://openweathermap.org/img/w/${forecastDay.weather[0].icon}.png" alt="weather icon">
   <div class="weather-farecast-temp">
      <span class="weather-farecast-temp-max">${Math.round(forecastDay.temp.max)}</span>°</span>
      <span class="weather-farecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
   </div>
</div>`;
      }

   });


   forecastHTML = forecastHTML + `</div>`;
   forecastElement.innerHTML = forecastHTML;
}

let dataElement = document.querySelector('#data');
let currentTime = new Date();

dataElement.innerHTML = formatDate(currentTime);
let searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', search);


let fahrenhitlink = document.querySelector('#fahrenheit-link');
fahrenhitlink.addEventListener('click', displayFahrenhitTemperature)
let celsiumLink = document.querySelector('#celsium-link');
celsiumLink.addEventListener('click', showCelsium);

let button = document.querySelector('#butn-position');
button.addEventListener('click', getCurrentPosition);

let key = '9b81de7ae752c035dcdf31ce35d734cc';


let celsiusTemperature = null;

firstPage();
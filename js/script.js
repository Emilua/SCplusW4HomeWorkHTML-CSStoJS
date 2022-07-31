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

function search(event) {
   event.preventDefault();
   let inputSearch = document.querySelector('#inputSearch');

   let city = inputSearch.value;
   let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
   axios.get(urlApi).then(showTemperature);

}
function tempConvert(event) {
   event.preventDefault();
   let temperatureElement = document.querySelector('.temperature');
   celsiusTemperature.classlost.remove('active');
   tempFahrenheit.classList.add('active');
   let temperature = temperatureElement.innerHTML;
   temperature = Number(temperature);
   temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32)

}
function showCelsium(event) {
   event.preventDefault();
   let temperature = document.querySelector('.temperature');
   temperature.innerHTML = celsiusTemperature;
}

function showTemperature(response) {
   console.log(response.data);
   let temperatureEliment = document.querySelector('.temperature');
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

let dataElement = document.querySelector('#data');
let currentTime = new Date();

dataElement.innerHTML = formatDate(currentTime);
let searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', search);


let tempFahrenheit = document.querySelector('#tempFahrenheit');
tempFahrenheit.addEventListener('click', tempConvert)
let celsium = document.querySelector('#celsium-link');
celsium.addEventListener('click', showCelsium);

let button = document.querySelector('#butn-position');
button.addEventListener('click', getCurrentPosition);

let key = '6605fc03f7aea0369923c76b4eb46d07';

let celsiusTemperature = null;
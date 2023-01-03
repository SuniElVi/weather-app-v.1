function currentDate(now) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  return `${day}, ${month} ${date}, ${hour}:${minute}`;
}
let dateElement = document.querySelector("#date");
let now = new Date();
dateElement.innerHTML = currentDate(now);

function showCurrentWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector(".humidity-percent").innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
}

function defaultSearch(city) {
  let apiKey = "6709a8dfdfde0df72069f4471556d893";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function searchForCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  defaultSearch(city);
}

function searchForLocation(position) {
  let apiKey = "6709a8dfdfde0df72069f4471556d893";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showCurrentWeather);
}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchForLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchForCity);

let locationButtonElemet = document.querySelector("#location-button");
locationButtonElemet.addEventListener("click", showLocation);

defaultSearch("Tehran");
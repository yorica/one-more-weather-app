let apiKey = "9ebbcc5f37304a3ed740e8af90680e70";

function showDate() {
  let now = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let day = days[now.getDay()].toUpperCase();
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];
  let month = months[now.getMonth()];

  let h1 = document.querySelector("h1");

  h1.innerHTML = `${day} ${now.getDate()}.${month}.${now.getFullYear()}`;
}

function showTime() {
  let now = new Date();
  let hour = now.getHours();
  if (hour > 12) {
    hour = hour - 12;
  }

  let time = document.querySelector("#tm");
  time.innerHTML = `${hour}:${now.getMinutes()}`;
}

function changeAmPm() {
  let dp = document.querySelector("#day-part");
  let now = new Date();
  let hour = now.getHours();
  if (hour >= 12) {
    dp.innerHTML = "PM";
  } else {
    dp.innerHTML = "AM";
  }
}

function changeCity(event) {
  event.preventDefault();
  let cityname = document.querySelector("#city");
  let myCity = cityname.value.toLowerCase();
  let weUrl = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${apiKey}&units=metric`;
  axios.get(weUrl).then(showTemp);
}

function showTemp(response) {
  console.log(response);
  let h3 = document.querySelector("h3");
  let myCity = response.data.name;
  h3.innerHTML = myCity.toUpperCase();
  let curTemp = Math.floor(response.data.main.temp);
  let temp = document.querySelector("#deg");
  temp.innerHTML = `${curTemp}°C`;
  let curHum = response.data.main.humidity;
  let hum = document.querySelector("#hum");
  hum.innerHTML = `${curHum}%`;
  let curWind = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${curWind}m/s`;
}

function goHome(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findMe);
}

function findMe(position) {
  let curLat = position.coords.latitude;
  let curLon = position.coords.longitude;
  let weUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${curLat}&lon=${curLon}&appid=${apiKey}&units=metric`;
  axios.get(weUrl).then(showTemp);
}

function convertDeg(event) {
  alert("Sorry, this function currently unavailable 😢");
  //event.preventDefault();
  //let temp = document.querySelector("#deg");
  //if (temp.className == "deg cel") {
  //temp.className = "deg fah";
  //let fTemp = Math.floor(23 * 1.8 + 32);
  //temp.innerHTML = `${fTemp} °F`;
  // btn.innerHTML = `<strong>°C</strong>`;
  //} else {
  //temp.className = "deg cel";
  //temp.innerHTML = "23°C";
  //btn.innerHTML = `<strong>°F</strong>`;
  //}
}

showDate();
showTime();
changeAmPm();

let cityForm = document.querySelector("#search-city");
cityForm.addEventListener("submit", changeCity);

let btn = document.querySelector("#temp");
btn.addEventListener("click", convertDeg);

let homeButton = document.querySelector("#home");
homeButton.addEventListener("click", goHome);

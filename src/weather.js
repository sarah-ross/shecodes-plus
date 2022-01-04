let now = new Date();

let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let day = days[now.getDay()];

let hours = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
	17, 18, 19, 20, 21, 22, 23, 24,
];
let hour = hours[now.getHours()];

let minutes = now.getMinutes();
if (minutes < 10) {
	minutes = `0${minutes}`;
}
let dayAndTime = document.querySelector("#day-time");
dayAndTime.innerHTML = `Last updated: ${day}, ${hour}:${minutes}`;

function displayForecast() {
	let forecastElement = document.querySelector(
		"#weather-forecast"
	);
	let forecastHTML = `<div class="row">`;
	let days = ["Thu", "Fri", "Sat", "Sun"];
	days.forEach(function (day) {

	forecastHTML =
		forecastHTML +
		`
						<div class="col">
							<div class="forecast">
								<img src="https://ssl.gstatic.com/onebox/weather/64/sunny.png" class="forecast-icon"/>
									<p class="high-low" id="forecast-temp">
									<strong">55º</strong> 22º
								</p>
								<p class="day">${day}</p>
							</div>
						</div>`;
	});

	forecastHTML = forecastHTML + `</div`;
	forecastElement.innerHTML = forecastHTML;

function handleForecastCoordinates(coordinates) {
	let apiKey = "44123fc256cee17034c82aa49630bbea";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

	axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
	document.querySelector("h3").innerHTML =
		response.data.name;
	document.querySelector("#temp").innerHTML = Math.round(
		response.data.main.temp
	);
	document.querySelector(
		"#humidity"
	).innerHTML = `Humidity: ${response.data.main.humidity}%`;
	let windSpeed = Math.round(response.data.wind.speed);
	document.querySelector(
		"#wind"
	).innerHTML = `Windspeed: ${windSpeed} km/hr`;
	document.querySelector("#description").innerHTML =
		response.data.weather[0].main;
	let iconElement = document.querySelector("#display-icon");
	iconElement.setAttribute(
		"src",
		`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);

	celsiusTemperature = response.data.main.temp;

	handleForecastCoordinates(response.data.coord);
}

function captureCity(event) {
	event.preventDefault();
	let apiKey = "44123fc256cee17034c82aa49630bbea";
	let city = document.querySelector("#search-form").value;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

	axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", captureCity);

function showCurrentLocationWeather(response) {
	document.querySelector("#searched-city").innerHTML =
		response.data.name;
	document.querySelector("#temp").innerHTML = Math.round(
		response.data.main.temp
	);
	document.querySelector("#description").innerHTML =
		response.data.weather[0].main;
	document.querySelector("#humidity").innerHTML = `Humidity:
		${response.data.main.humidity}%`;
	let windSpeed = Math.round(response.data.wind.speed);
	document.querySelector(
		"#wind"
	).innerHTML = `Windspeed: ${windSpeed} km/hr`;
	document.querySelector("#description").innerHTML =
		response.data.weather[0].main;
	let iconElement = document.querySelector("#display-icon");
	iconElement.setAttribute(
		"src",
		`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
}

function handlePosition(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiKey = "44123fc256cee17034c82aa49630bbea";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

	axios.get(apiUrl).then(showCurrentLocationWeather);
}

function handleClick(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(handlePosition);
}

let locationButton = document.querySelector(
	"#location-button"
);
locationButton.addEventListener("click", handleClick);

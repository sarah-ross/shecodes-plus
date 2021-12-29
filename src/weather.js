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
}

function captureCity(event) {
	event.preventDefault();
	let apiKey = "44123fc256cee17034c82aa49630bbea";
	let city = document.querySelector("#search-form").value;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
	let long = position.coords.longitude;
	let apiKey = "44123fc256cee17034c82aa49630bbea";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

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

function displayCelsiusTemp(event) {
	event.preventDefault();
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active");
	let temperatureElement = document.querySelector("#temp");
	temperatureElement.innerHTML = Math.round(
		celsiusTemperature
	);
}

function displayFahrenheitTemp(event) {
	event.preventDefault();
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	let fahrenheitTemperature =
		(celsiusTemperature * 9) / 5 + 32;
	let temperatureElement = document.querySelector("#temp");
	temperatureElement.innerHTML = Math.round(
		fahrenheitTemperature
	);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector(
	"#fahrenheit-link"
);
fahrenheitLink.addEventListener(
	"click",
	displayFahrenheitTemp
);

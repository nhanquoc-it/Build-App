const apiKey = "d78fd1588e1b7c0c2813576ba183a667";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`;
const searchInput = document.querySelector(".search-value");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error");
const weatherData = document.querySelector(".weather");

// Call API
async function checkWeather(city) {
	const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

	if (response.status == 404) {
		errorMessage.style.display = "block";
		weatherData.style.display = "none";
	} else {
		var data = await response.json();

		console.log(data);

		document.querySelector(".city").innerHTML = data.name;
		document.querySelector(".temp").innerHTML =
			Math.round(data.main.temp) + "°C";
		document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
		document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

		if (data.weather[0].main == "Clouds") {
			weatherIcon.src = "images/clouds.png";
		} else if (data.weather[0].main == "Rain") {
			weatherIcon.src = "images/rain.png";
		} else if (data.weather[0].main == "Clear") {
			weatherIcon.src = "images/clear-sky.png";
		} else if (data.weather[0].main == "Drizzle") {
			weatherIcon.src = "images/drizzle.png";
		} else if (data.weather[0].main == "Mist") {
			weatherIcon.src = "images/mist.png";
		}

		weatherData.style.display = "block";
		errorMessage.style.display = "none";
	}
}

// Button Search
searchBtn.addEventListener("click", () => {
	checkWeather(searchInput.value);
});

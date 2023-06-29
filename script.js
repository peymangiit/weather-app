const apikey = "8a88e6b4547a0995769d8f34b290d782";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    let cityValue = cityInputEl.value;
    console.log(cityValue);
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
        );
        console.log(response);
        console.log(cityValue);
        if (!response.ok) {
            throw new Error("It seems the network response was not ok ");
        }
        const data = await response.json();
        console.log(data);
        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;

        const icon = data.weather[0].icon;

        const details = [
            `Feels like : ${Math.round(data.main.feels_like)} °C`,
            `Humidity : ${data.main.humidity}%`,
            `Wind Speed : ${data.wind.speed} m/s`,
        ];

        weatherDataEl.querySelector(
            ".icon"
        ).innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`;

        weatherDataEl.querySelector(
            ".temperature"
        ).textContent = `${temperature} °C`;

        weatherDataEl.querySelector(
            ".description"
        ).textContent = `${description}`;

        weatherDataEl.querySelector(".details").innerHTML = details.map(
            (detail) => `<div>${detail}</div>`
        ).join("");
    } catch (error) {
        weatherDataEl.querySelector(
            ".icon"
        ).innerHTML = "";

        weatherDataEl.querySelector(
            ".temperature"
        ).textContent = "";

        weatherDataEl.querySelector(
            ".description"
        ).textContent = "An error happend, Please try again.";

        weatherDataEl.querySelector(".details").innerHTML = "";
    };
}

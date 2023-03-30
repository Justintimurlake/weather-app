class WeatherApp {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.weatherDataEl = document.getElementById("weather-data");
    this.cityInputEl = document.getElementById("city-input");
    this.formEl = document.querySelector("form");

    this.formEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const cityValue = this.cityInputEl.value;
      this.getWeatherData(cityValue);
    });
  }

  async getWeatherData(cityValue) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${this.apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const temperature = Math.round(data.main.temp);

      const description = data.weather[0].description;

      const icon = data.weather[0].icon;

      const details = [
        `Feels like: ${Math.round(data.main.feels_like)}`,
        `Humidity: ${data.main.humidity}%`,
        `Wind speed: ${data.wind.speed} m/s`,
      ];

      this.weatherDataEl.querySelector(
        ".icon"
      ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
      this.weatherDataEl.querySelector(
        ".temperature"
      ).textContent = `${temperature}°C`;
      this.weatherDataEl.querySelector(".description").textContent =
        description;

      this.weatherDataEl.querySelector(".details").innerHTML = details
        .map((detail) => `<div>${detail}</div>`)
        .join("");
    } catch (error) {
      this.weatherDataEl.querySelector(".icon").innerHTML = "";
      this.weatherDataEl.querySelector(".temperature").textContent =
        "";
      this.weatherDataEl.querySelector(".description").textContent =
        "An error happened, please try again later";

      this.weatherDataEl.querySelector(".details").innerHTML = "";
    }
  }
}

const apiKey = "46f80a02ecae410460d59960ded6e1c6";
const weatherApp = new WeatherApp(apiKey);

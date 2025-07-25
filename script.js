import { apiKey , url} from'./config.js';

document.getElementById('weatherForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const city = document.getElementById('cityInput').value.trim();
  if (city !== '') {
    getWeather(city);
  }
});

async function getWeather(city) {
  const fullUrl = `${url}?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(fullUrl);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();
    showWeather(data);
  } catch (error) {
    document.getElementById('weatherResult').innerHTML = `<p>${error.message}</p>`;
    console.error(error);
  }
}

function showWeather(data) {
  document.getElementById('weatherResult').innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>${data.weather[0].description}</p>
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon" />
  `;
}

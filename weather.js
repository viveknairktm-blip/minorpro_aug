// OpenWeather current weather API integration.
// 1. Create a free key at https://openweathermap.org/api
// 2. Replace the text below with your API key.
const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
const form = document.querySelector('#weather-form');
const cityInput = document.querySelector('#city-input');
const message = document.querySelector('#weather-message');
const result = document.querySelector('#weather-result');

const showMessage = (text) => { message.textContent = text; };
const weatherEmoji = (main = '') => {
  const conditions = { Clear: '☀️', Clouds: '☁️', Rain: '🌧️', Drizzle: '🌦️', Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Fog: '🌫️', Haze: '🌫️' };
  return conditions[main] ?? '🌤️';
};

async function getWeather(city) {
  if (API_KEY === 'YOUR_OPENWEATHER_API_KEY') {
    throw new Error('Add your OpenWeather API key in weather.js before searching.');
  }
  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.search = new URLSearchParams({ q: city, appid: API_KEY, units: 'metric' });
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Unable to retrieve weather.');
  return data;
}

function renderWeather(data) {
  const { name, sys, main, weather, wind } = data;
  const [condition] = weather;
  document.querySelector('#weather-city').textContent = `${name}, ${sys.country}`;
  document.querySelector('#weather-description').textContent = condition.description;
  document.querySelector('#temperature').textContent = `${Math.round(main.temp)}°C`;
  document.querySelector('#weather-icon').textContent = weatherEmoji(condition.main);
  document.querySelector('#humidity').textContent = `${main.humidity}%`;
  document.querySelector('#wind').textContent = `${wind.speed} m/s`;
  document.querySelector('#feels').textContent = `${Math.round(main.feels_like)}°C`;
  result.classList.remove('hidden');
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;
  result.classList.add('hidden');
  showMessage('Fetching weather…');
  try {
    const data = await getWeather(city);
    renderWeather(data);
    showMessage(`Current weather for ${data.name}`);
  } catch (error) {
    showMessage(error.message === 'city not found' ? 'City not found. Check the spelling and try again.' : error.message);
  }
});

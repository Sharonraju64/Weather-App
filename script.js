const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');

const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const location = locationInput.value;

  if (!location) {
    weatherInfo.textContent = 'Please enter a location.';
    return;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === '404') {
      weatherInfo.textContent = 'Location not found.';
    } else {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      const city = data.name;
      weatherInfo.textContent = `Weather in ${city}: ${weatherDescription}, Temperature: ${temperature}°C`;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherInfo.textContent = 'An error occurred while fetching weather data.';
  }
});

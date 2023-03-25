// Select the necessary DOM elements (Document Object Model)
const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Select the DOM elements for real-time weather updates
const dateTimeElement = document.querySelector('.date-time');
const humidityElement = document.querySelector('.weather-details .humidity span');
const windElement = document.querySelector('.weather-details .wind span');

// const lowTempElement = document.querySelector('.weather-details .temperature-low span');
// const highTempElement = document.querySelector('.weather-details .high-temp span');

// Listen for clicks on the search button
searchButton.addEventListener('click', performSearch);

// Listen for keypress events on the search input
searchInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    performSearch();
  }
});

// Function that performs the weather search
function performSearch() {
  // Define the API key and city
  const APIKey = '0191af42d718d9a632e4ac68676e2090';
  const city = searchInput.value;

  // If the city input is empty, pop-up a message 
  if (city == '') return alert('Please input a city');

  // Use fetch to get the weather data from the OpenWeatherMap API
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then((response) => response.json())
    .then((json) => { // Handle 404 errors
      if (json.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }
      // If the request was successful, hide the error message and display the weather data
      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      // Select the necessary DOM elements for displaying the weather data
      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');

      // Determine which weather image to display based on the weather data
      if (json.weather[0].main === 'Clear') {
        image.src = 'images/clear.png';
      } else if (json.weather[0].main === 'Rain') {
        image.src = 'images/rain.png';
      } else if (json.weather[0].main === 'Snow') {
        image.src = 'images/snow.png';
      } else if (json.weather[0].main === 'Clouds') {
        image.src = 'images/cloud.png';
      } else if (json.weather[0].main === 'Haze') {
        image.src = 'images/mist.png';
      } else if (json.weather[0].main === 'Drizzle') {
        image.src = 'images/drizzle.png';
      } else {
        image.src = '';
      }

      // Display the weather data
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidityElement.innerHTML = `${json.main.humidity}%`;
      windElement.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    //   lowTempElement.innerHTML = `${Math.round(json.main.temp_min)}<span>°C</span>`;
    //   highTempElement.innerHTML = `${Math.round(json.main.temp_max)}<span>°C</span>`;

      // Add the date and time
      const dateTime = new Date();
      dateTimeElement.innerHTML = dateTime.toLocaleString();

      // Update the weather data every second
      setInterval(() => {
        const dateTime = new Date()

        // Update the date and time element with formatted string
        dateTimeElement.innerHTML = dateTime.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,});

        // Update the humidity and wind elements with the latest values
        humidityElement.innerHTML = `${json.main.humidity}%`;
        windElement.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        // lowTempElement.innerHTML = `${Math.round(json.main.temp_min)}<span>°C</span>`;
        // highTempElement.innerHTML = `${Math.round(json.main.temp_max)}<span>°C</span>`;
      }, 1000);

      // Display weather box and details after successful API call
      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      
      // Adjust the height of the container element to fit the weather box and details
      container.style.height = '590px';
    });
}
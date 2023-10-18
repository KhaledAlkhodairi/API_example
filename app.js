document.getElementById('getWeather').addEventListener('click', () => {
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    getWeather(latitude, longitude, 'all');
  });
  
  document.getElementById('getWeatherXMLHttpRequest').addEventListener('click', () => {
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    getWeather(latitude, longitude, 'XMLHttpRequest');
  });
  
  document.getElementById('getWeatherFetchPromises').addEventListener('click', () => {
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    getWeather(latitude, longitude, 'FetchPromises');
  });
  
  document.getElementById('getWeatherFetchAsyncAwait').addEventListener('click', () => {
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    getWeather(latitude, longitude, 'FetchAsyncAwait');
  });
  
  function getWeather(latitude, longitude, method) {
    if (method === 'all' || method === 'XMLHttpRequest') {
      getWeatherXMLHttpRequest(latitude, longitude);
    }
    if (method === 'all' || method === 'FetchPromises') {
      getWeatherWithFetchPromises(latitude, longitude);
    }
    if (method === 'all' || method === 'FetchAsyncAwait') {
      getWeatherWithFetchAsyncAwait(latitude, longitude);
    }
  }
  
  
  function getWeatherXMLHttpRequest(latitude, longitude) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
  
    xhr.onload = function () {
      if (xhr.status === 200) {
        const weatherData = JSON.parse(xhr.responseText);
        displayWeatherData('XMLHttpRequest', weatherData);
      } else {
        console.error('XMLHttpRequest failed.');
      }
    };
  
    xhr.send();
  }
  
  function getWeatherWithFetchPromises(latitude, longitude) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
      .then((response) => response.json())
      .then((weatherData) => {
        displayWeatherData('Fetch with Promises', weatherData);
      })
      .catch((error) => {
        console.error('Fetch with Promises failed.', error);
      });
  }
  
  async function getWeatherWithFetchAsyncAwait(latitude, longitude) {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      const weatherData = await response.json();
      displayWeatherData('Fetch with Async/Await', weatherData);
    } catch (error) {
      console.error('Fetch with Async/Await failed.', error);
    }
  }
  
  function displayWeatherData(method, data) {
    const weatherDataContainer = document.getElementById('weatherData');
    weatherDataContainer.innerHTML = `<strong>${method}:</strong><br>`;
  
    if (data.current_weather) {
      const currentWeather = data.current_weather;
      weatherDataContainer.innerHTML += `
        Temperature: ${currentWeather.temperature}°C<br>
        Description: ${currentWeather.description}<br>
        Humidity: ${currentWeather.humidity}%<br>
        Wind Speed: ${currentWeather.wind_speed} km/h
      `;
    } else {
      weatherDataContainer.innerHTML += 'No data available.';
    }
  }
  
const searchbar = document.querySelector('.locinput');
const searchbtn = document.getElementById('searchbtn');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const weather_img = document.querySelector('.weather-img');
const temp = document.querySelector('.temp');
const humidity_pr = document.querySelector('.humidity-pr');
const wind_speed = document.querySelector('.wind-speed');
const description = document.querySelector('.description');
const visibility = document.querySelector('.visibility-data');
const pressure = document.querySelector('.pressure-data');
const container = document.querySelector('.container');
const animate = document.querySelector('.animate');

// search button event
searchbtn.addEventListener('click', () => {
  checkWeather(searchbar.value);
});

async function checkWeather(city) {
  const apiKey = 'be1a522f100a41bdc73ab07b5e3018d7';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  // api call
  const weather_data = await fetch(`${apiUrl}`).then((response) =>
    response.json()
  );

  // location not found error message
  if (weather_data.cod === '404') {
    location_not_found.style.display = 'flex';
    weather_body.style.display = 'none';
    console.log('error');
    return;
  }
  location_not_found.style.display = 'none';
  weather_body.style.display = 'flex';

  // measurements
  temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}` + '<sup>°C</sup>';
  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity_pr.innerHTML = `${weather_data.main.humidity}
  %`;
  wind_speed.innerHTML = `${weather_data.wind.speed}
  km/hr`
  visibility.innerHTML = `${weather_data.visibility}
  metre`
  pressure.innerHTML = `${weather_data.main.pressure}
  hPa`
  console.log(weather_data);

  // day-night time
  const sunriseTimestamp = weather_data.sys.sunrise * 1000;
  const sunsetTimestamp = weather_data.sys.sunset * 1000;
  const currentTimestamp = Date.now();

  switch (weather_data.weather[0].main) {
    case 'Clouds':
      weather_img.src = "img/cloud.png";

      if (currentTimestamp < sunriseTimestamp || currentTimestamp > sunsetTimestamp) {
        console.log("It's nighttime.");

        // remove animate child nodes
        while (animate.firstChild) {
          animate.removeChild(animate.firstChild);
        }

        // adding stars
        for (let i = 1; i < 12; i++) {
          const span = document.createElement('span');
          const iTag = document.createElement('i');
          iTag.className = 'fa fa-star';
          span.appendChild(iTag);
          animate.appendChild(span);
        }

        // removing previously linked css
        var linkElements = document.querySelectorAll('link[rel="stylesheet"]');
        linkElements.forEach(link => {
          link.parentNode.removeChild(link);
        });

        // linking star css
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'css/star.css';
        var head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(cssLink);
      }
      else {
        console.log("It's daytime.");

        // remove animate child nodes
        while (animate.firstChild) {
          animate.removeChild(animate.firstChild);
        }

        // removing previously linked css
        var linkElements = document.querySelectorAll('link[rel="stylesheet"]');
        linkElements.forEach(link => {
          link.parentNode.removeChild(link);
        });

        // linking cloud css
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'css/cloud.css';
        var head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(cssLink);
      }

      break;

    case 'Clear':
      weather_img.src = "img/clear-sky.png";

      if (currentTimestamp < sunriseTimestamp || currentTimestamp > sunsetTimestamp) {
        console.log("It's nighttime.");

        // remove animate child nodes
        while (animate.firstChild) {
          animate.removeChild(animate.firstChild);
        }

        // adding stars
        for (let i = 1; i < 12; i++) {
          const span = document.createElement('span');
          const iTag = document.createElement('i');
          iTag.className = 'fa fa-star';
          span.appendChild(iTag);
          animate.appendChild(span);
        }

        // removing previously linked css
        var linkElements = document.querySelectorAll('link[rel="stylesheet"]');
        linkElements.forEach(link => {
          link.parentNode.removeChild(link);
        });

        // linking star css
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'css/star.css';
        var head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(cssLink);
      } else {
        console.log("It's daytime.");

        // remove animate child nodes
        while (animate.firstChild) {
          animate.removeChild(animate.firstChild);
        }

        // adding sun image
        let img = document.createElement('img');
        img.src = 'img/sun.png';
        img.alt = '';
        img.srcset = '';
        animate.appendChild(img);

        // removing previously linked css
        var linkElements = document.querySelectorAll('link[rel="stylesheet"]');
        linkElements.forEach(link => {
          link.parentNode.removeChild(link);
        });

        // linking sun css
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'css/sun.css';
        var head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(cssLink);
      }

      break;

    case 'Rain':
      weather_img.src = "img/storm.png";

      // remove animate child nodes
      while (animate.firstChild) {
        animate.removeChild(animate.firstChild);
      }

      // removing previously linked css
      var linkElements = document.querySelectorAll('link[rel="stylesheet"]');
      linkElements.forEach(link => {
        link.parentNode.removeChild(link);
      });

      // linking rain css
      var cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'css/rain.css';
      var head = document.head || document.getElementsByTagName('head')[0];
      head.appendChild(cssLink);

      break;

    case 'Mist':
      weather_img.src = "img/haze.png";

      // remove animate child nodes
      while (animate.firstChild) {
        animate.removeChild(animate.firstChild);
      }

      // removing previously linked css
      var linkElements = document.querySelectorAll('link[rel="stylesheet"]');
      linkElements.forEach(link => {
        link.parentNode.removeChild(link);
      });

      // linking mist css
      var cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'css/mist.css';
      var head = document.head || document.getElementsByTagName('head')[0];
      head.appendChild(cssLink);

      break;
      
    case 'Snow':
      weather_img.src = "img/snowflake.png";

      // remove animate child nodes
      while (animate.firstChild) {
        animate.removeChild(animate.firstChild);
      }

      // removing previously linked css
      var linkElements = document.querySelectorAll('link[rel="stylesheet"]');
      linkElements.forEach(link => {
        link.parentNode.removeChild(link);
      });

      // linking snow css
      var cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'css/snow.css';
      var head = document.head || document.getElementsByTagName('head')[0];
      head.appendChild(cssLink);

      break;

    default:
      weather_img.src = "img/cloud.png";

  }

}


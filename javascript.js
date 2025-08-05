const SearchBtn = document.getElementById('searchBtn');
const In = document.getElementById('in');
const Temp = document.getElementById('Temperature');
const Condition = document.getElementById('Condition');
const Humidity = document.getElementById('Humidity');
const Pressure = document.getElementById('Pressure');
const WindSpeed = document.getElementById('WindSpeed');
const Visibility = document.getElementById('Visibility');
const FeelsLike = document.getElementById('FeelsLike');
const SeaLevel = document.getElementById('Sea-Level');
const pic = document.getElementById('pic');
const Location = document.getElementById('Location'); // Added: You reference this in the code

async function checkWeather(city) {
    const apiKey = '781e741fbc8d4e08041a1d877b5d7270';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found");
            return;
        }

        Temp.innerHTML = `Temperature: ${Math.round(data.main.temp)}°C`;
        Pressure.innerHTML = `Pressure: ${data.main.pressure} hPa`; // Corrected: lowercase 'pressure'
        FeelsLike.innerHTML = `Feels Like: ${Math.round(data.main.feels_like)}°C`; // Corrected: lowercase 'feels_like'
        Humidity.innerHTML = `Humidity: ${data.main.humidity}%`; // Corrected: lowercase 'humidity'
        Condition.innerHTML = `Condition: ${data.weather[0].main}`;
        Location.innerHTML = `Location: ${data.name}`;
        WindSpeed.innerHTML = `Wind Speed: ${data.wind.speed} m/s`; // Corrected: data.wind.speed
        Visibility.innerHTML = `Visibility: ${data.visibility / 1000} km`; // Corrected: data.visibility
        SeaLevel.innerHTML = data.main.sea_level ? `Sea Level: ${data.main.sea_level} hPa` : ''; // Corrected: sea_level

        document.getElementById('weatherCard').style.display = 'block';

        const weatherCondition = data.weather[0].main;
        const weatherImages = {
            'Clear': "https://openweathermap.org/img/wn/01d.png",
            'Clouds': "https://openweathermap.org/img/wn/03d.png",
            'Rain': "https://openweathermap.org/img/wn/10d.png",
            'Snow': "https://openweathermap.org/img/wn/13d.png",
            'Drizzle': "https://openweathermap.org/img/wn/09d.png",
            'Haze': "https://openweathermap.org/img/wn/50d.png"
        };

        pic.src = weatherImages[weatherCondition] || "https://openweathermap.org/img/wn/01d.png";

    } catch (error) {
        alert("Error fetching weather data");
        console.error(error);
    }
}

SearchBtn.addEventListener('click', () => {
    const city = In.value.trim(); // Fixed: access `.value` from input element
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

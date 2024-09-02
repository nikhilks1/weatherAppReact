import React, { useEffect, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null); // Initialize state as null
  const [city, setCity] = useState('kakkanad'); // Initialize with a default city
  const [searchTerm, setSearchTerm] = useState(''); // State to store user input

  const allIcons = {
    '03d': cloud_icon,
    '03n': cloud_icon,
    '01d': clear_icon,
    // Add more icons based on the weather API icon codes
  };

  const search = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (data.weather && data.weather.length > 0 && data.main) {
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon
        });
      } else {
        setWeatherData(null); // Clear previous data if no valid response
        alert('City not found!');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data. Please try again.');
    }
  };

  const handleSearchClick = () => {
    if (searchTerm.trim() !== '') {
      setCity(searchTerm); // Set the city to search for
    } else {
      alert('Please enter a city name!');
    }
  };

  useEffect(() => {
    search(); // Call search function whenever city state changes
  }, [city]);

  return (
    <div className='weather'>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder='Search' 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <img src={search_icon} alt="Search Icon" onClick={handleSearchClick} />
      </div>
      {weatherData && (
        <>
          <img className='weather-icon' src={weatherData.icon} alt="Weather Icon" />
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity Icon" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Icon" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;

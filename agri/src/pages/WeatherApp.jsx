import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";

import Banner from "../components/Banner";

function WeatherApp() {
  const [city, setCity] = useState("Bangalore");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  // Fetch weather data when the component mounts or when city changes
  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(` http://127.0.0.1:5000/weather?city=${city}`);
      const data = await response.json();
      setWeatherData(data);
      setLoading(false); // Set loading to false once data is fetched
    };
    fetchWeather();
  }, [city]);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
    <NavBar/>
    <Banner items={["Home", "services" ,"Weather Prediction"]} />
    <div className="bg-blue-50 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl  shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Weather App</h1>

        {/* Search Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCity(e.target.city.value);
          }}
          className="flex justify-center gap-4 mb-6"
        >
          <input
            type="text"
            name="city"
            placeholder="Enter city name"
            required
            className="p-2 w-64 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Get Weather
          </button>
        </form>

        {/* Weather Data */}
        {weatherData && (
          <div>
            <h2 className="text-2xl font-medium text-center text-gray-800">{weatherData.city}</h2>
            <p className="text-center text-gray-600">{weatherData.current_date}</p>
            <p className="text-center text-4xl font-bold text-gray-800">{weatherData.current_weather.main.temp}°C</p>
            <p className="text-center text-gray-600">Feels like {weatherData.current_weather.main.feels_like}°C</p>
            <p className="text-center text-gray-500">{weatherData.current_weather.weather[0].description}</p>

            {/* Weather Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-green-50 p-4 rounded-lg shadow-md">
                <h4 className="text-sm font-medium text-gray-600">Wind Speed</h4>
                <p className="text-xl font-bold text-gray-800">{weatherData.current_weather.wind.speed} m/s</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg shadow-md">
                <h4 className="text-sm font-medium text-gray-600">Humidity</h4>
                <p className="text-xl font-bold text-gray-800">{weatherData.current_weather.main.humidity}%</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg shadow-md">
                <h4 className="text-sm font-medium text-gray-600">Visibility</h4>
                <p className="text-xl font-bold text-gray-800">{weatherData.current_weather.visibility / 1000} km</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg shadow-md">
                <h4 className="text-sm font-medium text-gray-600">Sunrise</h4>
                <p className="text-xl font-bold text-gray-800">{weatherData.current_weather.sys.sunrise}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg shadow-md">
                <h4 className="text-sm font-medium text-gray-600">Sunset</h4>
                <p className="text-xl font-bold text-gray-800">{weatherData.current_weather.sys.sunset}</p>
              </div>
            </div>

            {/* Hourly Forecast */}
            <h3 className="text-xl font-medium text-gray-800 mt-6">Hourly Forecast</h3>
            {weatherData.hourly_forecast && weatherData.hourly_forecast.map((hour, index) => (
              <div key={index} className="p-4 border-b border-gray-200">
                <p className="text-gray-600">{hour.dt_txt}</p>
                <p className="text-xl font-bold text-gray-800">{hour.main.temp}°C</p>
                <p className="text-gray-500">{hour.weather[0].description}</p>
              </div>
            ))}

            {/* 5-Day Forecast */}
            <h3 className="text-xl font-medium text-gray-800 mt-6">5-Day Forecast</h3>
            {weatherData.daily_forecast && Object.keys(weatherData.daily_forecast).map((date, index) => (
              <div key={index} className="p-4 border-b border-gray-200">
                <p className="text-gray-600">{date}</p>
                <p className="text-xl font-bold text-gray-800">
                  {weatherData.daily_forecast[date].temp_min}°C - {weatherData.daily_forecast[date].temp_max}°C
                </p>
                <p className="text-gray-500">{weatherData.daily_forecast[date].weather}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default WeatherApp;

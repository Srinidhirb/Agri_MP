import React, { useState, useEffect } from "react";

import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import SunRise from "../assets/images/SunRise.svg";
import SunSet from "../assets/images/SunSet.svg";
import Wind from "../assets/images/wind.svg";
import Humi from "../assets/images/humidity.svg";
import UV from "../assets/images/uv.svg";
import Visi from "../assets/images/visi.svg";
import Rain from "../assets/images/Rain.png";
import Psunny from "../assets/images/Psunny.png";
import Strom from "../assets/images/storm.png";
import Sunny from "../assets/images/Sunny.png";
import Cloudy from "../assets/images/cloudy.png";
import Location from "../assets/icons/Location"
function WeatherApp() {
  const [city, setCity] = useState("Bangalore");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [unit, setUnit] = useState("C"); // Default unit is Celsius
  const [topCitiesData, setTopCitiesData] = useState([]);

  useEffect(() => {
    const topCities = ["Delhi", "Mumbai", "Chennai", "Kolkata", "Mysore"]; // Add top cities
    const fetchWeatherDataForCities = async () => {
      setLoading(true);
      const cityWeatherPromises = topCities.map(async (city) => {
        const response = await fetch(
          ` http://127.0.0.1:5000/weather?city=${city}`
        );
        const data = await response.json();
        return data;
      });

      const citiesData = await Promise.all(cityWeatherPromises);
      setTopCitiesData(citiesData);
      setLoading(false);
    };

    fetchWeatherDataForCities();
  }, []); // Fetch data when component mounts
  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        ` http://127.0.0.1:5000/weather?city=${city}`
      );
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    };
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString(); // Get the current time
      setCurrentTime(time);
    }, 10000); // Update time every minute (60,000 milliseconds)

    fetchWeather();
    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [city]);
  const convertTemperature = (tempInCelsius) => {
    if (unit === "C") {
      return tempInCelsius;
    } else {
      return (tempInCelsius * 9) / 5 + 32; // Celsius to Fahrenheit formula
    }
  };

  // Handle unit change (Celsius to Fahrenheit or vice versa)
  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };
  if (loading) {
    return <Loader />;
  }

  // Function to get the weather icon based on weather conditions
  const getWeatherIcon = (description) => {
    const currentHour = new Date().getHours(); // Get the current hour

    // If it's after 6 PM, display cloud image for clear or cloudy weather
    if (currentHour >= 18) {
      if (description.includes("clear") || description.includes("cloud")) {
        return <img src={Cloudy} alt="Cloudy" className="w-24 h-24" />;
      }
    }
    if (description.includes("clear"))
      return <img src={Sunny} alt="Sunny" className="text-6xl" />;
    if (description.includes("cloud"))
      return <img src={Cloudy} alt="Cloudy" className="w-24 h-24" />;
    if (description.includes("rain"))
      return <img src={Rain} alt="Rain" className="text-6xl" />;
    if (description.includes("snow"))
      return <img src={Rain} alt="Snow" className="text-6xl" />; // Update to snow image if available
    if (description.includes("thunderstorm"))
      return <img src={Strom} alt="Thunderstorm" className="text-6xl" />;
    return <img src={Psunny} alt="Cloudy" className="text-6xl" />; // Default to partly sunny
  };
  const getWeatherIconDays = (description) => {
    const currentHour = new Date().getHours(); // Get the current hour

    if (description.includes("clear"))
      return <img src={Sunny} alt="Sunny" className="text-6xl" />;
    if (description.includes("cloud"))
      return <img src={Cloudy} alt="Cloudy" className="w-24 h-24" />;
    if (description.includes("rain"))
      return <img src={Rain} alt="Rain" className="text-6xl" />;
    if (description.includes("snow"))
      return <img src={Rain} alt="Snow" className="text-6xl" />; // Update to snow image if available
    if (description.includes("thunderstorm"))
      return <img src={Strom} alt="Thunderstorm" className="text-6xl" />;
    return <img src={Psunny} alt="Cloudy" className="text-6xl" />; // Default to partly sunny
  };
  const getWeatherIconfirst = (description) => {
    const currentHour = new Date().getHours(); // Get the current hour

    // If it's after 6 PM, display cloud image for clear or cloudy weather
    if (currentHour >= 18) {
      return <img src={Cloudy} alt="Cloudy" className="w-32 h-32" />;
    }

    // Default behavior for daytime
    if (description.includes("clear"))
      return <img src={Sunny} alt="Sunny" className="w-24 h-24" />;
    if (description.includes("cloud"))
      return <img src={Cloudy} alt="Cloudy" className="w-24 h-24" />;
    if (description.includes("rain"))
      return <img src={Rain} alt="Rain" className="w-24 h-24" />;
    if (description.includes("snow"))
      return <img src={Rain} alt="Snow" className="w-24 h-24" />; // Update to snow image if available
    if (description.includes("thunderstorm"))
      return <img src={Strom} alt="Thunderstorm" className="w-24 h-24" />;
    return <img src={Psunny} alt="Cloudy" className="w-24 h-24" />; // Default to partly sunny
  };
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12; // Convert to 12-hour format
    const formattedTime = `${hour12}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${ampm}`;

    return formattedTime;
  };

  const getCurrentTemp = (hour) => {
    const currentTime = new Date();
    const hourTime = new Date(hour.dt_txt);

    // Check if it's the current time
    if (currentTime.getHours() === hourTime.getHours()) {
      return "Now";
    }
    return formatTime(hour.dt_txt); // Else return formatted time
  };
  return (
    <>
      <NavBar />
      <Banner items={["Home", "Services", "Weather Prediction"]} />
      <div className="flex justify-center my-6">
        <div className="min-h-screen w-4/5 flex flex-col justify-center items-center p-6">
          {/* Header */}
          <div className="flex justify-between px-3 items-center mb-6 w-full">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Hi, Srinidhi</h2>
              <p className="text-gray-500">Good Morning</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCity(e.target.city.value);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                name="city"
                placeholder="Search location"
                required
                className="p-2 w-96 border border-gray-300 rounded-full text-sm "
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-full text-sm hover:bg-blue-600"
              >
                Search
              </button>
            </form>
          </div>

          {/* Main Weather Section */}
          <div className="flex flex-wrap justify-between  items-start gap-3  w-full">
            {/* Current Weather */}
            <div className="bg-[#FDF9F4] p-6 rounded-lg  w-1/3 shadow-lg flex flex-col">
              {/* Location */}
              <div className="flex items-center justify-between w-full">
                <p className="text-gray-700 text-sm font-medium flex gap-3">

                <Location/> {weatherData.city}, {weatherData.country}
                </p>
                {/* Dropdown for temperature unit */}
                <select
                  className="bg-black text-white py-1 px-3 rounded-full text-xs font-semibold"
                  value={unit}
                  onChange={handleUnitChange}
                >
                  <option value="C">°C</option>
                  <option value="F">°F</option>
                </select>
              </div>

              {/* Day and Date */}
              <div className=" mt-4">
                <p className="text-lg font-medium text-black mt-1">
                  {weatherData.current_date}
                </p>
              </div>

              {/* Weather Information */}
              <div className="flex justify-between h-36 flex-wrap items-center  mt-6">
                {/* Dynamic Weather Icon */}
                <div className="mb-4 ">
                  {getWeatherIconfirst(
                    weatherData.current_weather.weather[0].description
                  )}
                </div>
                <div >
                  {/* Temperature */}
                  <p className="text-4xl mb-10 font-extrabold text-gray-900">
                    {convertTemperature(weatherData.current_weather.main.temp)}°
                    {unit}
                  </p>

                  {/* Description */}
                  <p className="text-gray-700 text-lg capitalize mt-2">
                    {weatherData.current_weather.weather[0].description}
                  </p>

                  {/* Feels Like */}
                  <p className="text-gray-500 text-sm mt-1">
                    Feels like{" "}
                    {convertTemperature(
                      weatherData.current_weather.main.feels_like
                    )}
                    °{unit}
                  </p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white p-6 border mb-3 rounded-xl shadow-md w-3/5">
              <h4 className="text-lg font-medium text-gray-800 mb-4">
                Today's Highlights
              </h4>
              <div className="flex flex-wrap justify-between gap-4">
                <div className="bg-[#E9F1EE] p-4 rounded-lg flex flex-col gap-4 h-32  items-end shadow w-48">
                  <div className="flex w-[95%] justify-between  items-center">
                    <img src={Wind} alt="" />
                    <p className="text-xm text-gray-500">Wind Speed</p>
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    {weatherData.current_weather.wind.speed} m/s
                  </p>
                  <p className="text-xm  text-gray-800">{currentTime}</p>
                </div>
                <div className="bg-[#E9F1EE] p-4 rounded-lg flex flex-col gap-4 h-32 items-end shadow w-48">
                  <div className="flex   w-[95%] justify-between items-center">
                    <img src={Humi} alt="" />
                    <p className="text-xm text-black">Humidity</p>
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    {weatherData.current_weather.main.humidity}%
                  </p>

                  {/* Humidity condition */}
                  <p className="text-sm text-gray-600">
                    {weatherData.current_weather.main.humidity < 40
                      ? "Humidity is low "
                      : weatherData.current_weather.main.humidity > 60
                      ? "Humidity is high "
                      : "Humidity is good "}
                  </p>
                </div>

                <div className="bg-[#E9F1EE] p-3 rounded-lg flex  gap-4 items-center shadow w-48">
                  <img src={SunRise} alt="" />
                  <div className="flex flex-col gap-2">
                    <p className="text-xm text-black">Sunrise</p>
                    <p className="text-xm  text-gray-800">
                      {new Date(
                        weatherData.current_weather.sys.sunrise * 1000
                      ).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="bg-[#E9F1EE] p-4 rounded-lg flex flex-col gap-4 h-32 items-end shadow w-48">
                  <div className="flex  w-[95%] justify-between items-center">
                    <img src={Visi} alt="" />
                    <p className="text-xm text-black">Visibility</p>
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    {weatherData.current_weather.visibility / 1000} km
                  </p>
                  <p className="text-xm  text-gray-800">{currentTime}</p>
                </div>
                <div className="bg-[#E9F1EE] p-4 rounded-lg flex flex-col gap-4 h-32 items-end shadow w-48">
                  <div className="flex  w-[95%] justify-between items-center">
                    <img src={UV} alt="" />
                    <p className="text-xm text-black">UV Index</p>
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    {weatherData.current_weather.uv_index}
                  </p>
                </div>

                <div className="bg-[#E9F1EE] p-3 rounded-lg flex  gap-4 items-center shadow w-48">
                  <img src={SunSet} alt="" />
                  <div className="flex flex-col gap-2">
                    <p className="text-xm text-black">Sunset</p>
                    <p className="text-xm  text-gray-800">
                      {new Date(
                        weatherData.current_weather.sys.sunset * 1000
                      ).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4 justify-between w-full">
            {/* Daily Forecast */}
            <div className="bg-white p-3 border rounded-xl shadow-md mb-2">
              <h4 className="text-lg font-medium text-gray-800 mb-4">
                Top 5 Popular Cities
              </h4>
              <div className="overflow-y-auto max-h-60">
                {topCitiesData.map((cityData, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-[#E9F1EE] p-4 rounded-2xl shadow-md mb-4"
                  >
                    <div className="flex items-center flex-col">
                      <p className="text-gray-700 font-medium">
                        {cityData.city}
                      </p>
                      <span className="text-sm text-gray-500">
                        {cityData.country}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        {cityData.current_weather.weather[0].description}
                      </p>{" "}
                      {/* Weather description */}
                    </div>
                    <div className="flex justify-evenly items-center">
                      {/* Weather Icon */}
                      {getWeatherIcon(
                        cityData.current_weather.weather[0].description
                      )}
                      <p className="text-xs font-bold text-gray-800">
                        {convertTemperature(
                          cityData.current_weather.main.temp_max
                        )}
                        °/
                        {convertTemperature(
                          cityData.current_weather.main.temp_min
                        )}
                        °{unit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-md h-[96%] ">
              <h4 className="text-lg font-medium text-gray-800 mb-4">
                6-Day Forecast
              </h4>
              <div className="flex gap-4 overflow-auto " >
                {weatherData.daily_forecast &&
                  Object.keys(weatherData.daily_forecast)
                    .slice(0, 6) // Limit to first 5 days
                    .map((date, index) => {
                      // Get the day name from the date
                      const day = new Date(date).toLocaleString("en-US", {
                        weekday: "short",
                      });

                      // Check if the date is today
                      const isToday =
                        new Date(date).toDateString() ===
                        new Date().toDateString();

                      return (
                        <div
                          key={index}
                          className="flex flex-col gap-2 justify-between min-w-36 max-w-36 w-full items-center bg-[#E9F1EE] p-4 rounded-2xl shadow"
                        >
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <p className="text-gray-500" style={{ margin: 0 }}>
                              {isToday ? "Today" : day}
                            </p>
                            <span
                              style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: "2px", // Height of the underline
                                background:
                                  "linear-gradient(to right, #000, #aaa 50%, #000)", // Gradient for underline
                              }}
                            />
                          </div>

                          <p className="text-gray-800 text-sm">
                            {Math.round(
                              weatherData.daily_forecast[date].temp_min
                            )}
                            °C -{" "}
                            {Math.round(
                              weatherData.daily_forecast[date].temp_max
                            )}
                            °C
                          </p>

                          {getWeatherIconDays(
                            weatherData.daily_forecast[date].weather
                          )}
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
          {/* Hourly Forecast */}
          <div className="bg-white p-6 border rounded-lg shadow-lg w-full mt-4 mb-6">
            <h4 className="text-lg font-medium text-gray-800 mb-4">
              8-Hour Forecast(3Hrs interval)
            </h4>
            <div className="flex gap-4 overflow-x-auto py-4 scroll-smooth">
              {weatherData.hourly_forecast &&
                weatherData.hourly_forecast.slice(0, 8).map((hour, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 items-center bg-[#E9F1EE] p-4 rounded-lg shadow w-32"
                  >
                    <p
                      className="text-sm text-black"
                      style={{
                        display: "inline-block", // Ensures the underline is applied correctly
                        position: "relative",
                        paddingBottom: "5px", // Space between text and underline
                      }}
                    >
                      {getCurrentTemp(hour)}
                      <span
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "2px", // The height of the underline
                          background:
                            "linear-gradient(to right, #000, #aaa 50%, #000)", // Gradient for underline with dark center and light ends
                        }}
                      />
                    </p>

                    {getWeatherIcon(hour.weather[0].description)}
                    <p className="text-gray-800 font-bold">
                      {hour.main.temp}°C
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherApp;

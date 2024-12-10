from flask import Flask, jsonify, request
import requests
from datetime import datetime
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  
# OpenWeather API Key
API_KEY = "1b92526036aa6062b613216bc499b477"  # Replace with your actual API key

# Base URLs
CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"
HOURLY_FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"
UV_INDEX_URL = "https://api.openweathermap.org/data/2.5/uvi"

def get_current_weather(city_name):
    """Fetch current weather data."""
    params = {"q": city_name, "appid": API_KEY, "units": "metric"}
    response = requests.get(CURRENT_WEATHER_URL, params=params)
    if response.status_code == 200:
        return response.json()
    return None

def get_hourly_forecast(city_name):
    """Fetch 3-hour interval forecasts (up to 5 days)."""
    params = {"q": city_name, "appid": API_KEY, "units": "metric"}
    response = requests.get(HOURLY_FORECAST_URL, params=params)
    if response.status_code == 200:
        return response.json().get('list', [])
    return None

def get_daily_forecast(city_name):
    """Derive daily forecasts from 3-hour interval data."""
    hourly_forecast = get_hourly_forecast(city_name)
    if not hourly_forecast:
        return None

    daily_forecasts = {}
    for forecast in hourly_forecast:
        date = forecast['dt_txt'].split(' ')[0]  # Extract the date part
        if date not in daily_forecasts:
            daily_forecasts[date] = {
                "temp_min": forecast['main']['temp_min'],
                "temp_max": forecast['main']['temp_max'],
                "weather": forecast['weather'][0]['description'],
            }
        else:
            daily_forecasts[date]["temp_min"] = min(
                daily_forecasts[date]["temp_min"], forecast['main']['temp_min']
            )
            daily_forecasts[date]["temp_max"] = max(
                daily_forecasts[date]["temp_max"], forecast['main']['temp_max']
            )
    return daily_forecasts

def get_uv_index(lat, lon):
    """Fetch UV index based on latitude and longitude."""
    params = {"lat": lat, "lon": lon, "appid": API_KEY}
    response = requests.get(UV_INDEX_URL, params=params)
    if response.status_code == 200:
        return response.json()
    return None

@app.route('/weather', methods=['GET'])
def weather():
    city_name = request.args.get('city', 'Bangalore')  # Default city
    current_weather = get_current_weather(city_name)
    hourly_forecast = get_hourly_forecast(city_name)
    daily_forecast = get_daily_forecast(city_name)
    uv_index = None
    if current_weather:
        lat = current_weather['coord']['lat']
        lon = current_weather['coord']['lon']
        uv_index = get_uv_index(lat, lon) 
    
    # Format current date and day
    current_date = datetime.now().strftime("%A, %B %d, %Y") 
    
    return jsonify({
        "city": city_name,
        "current_weather": current_weather,
        "hourly_forecast": hourly_forecast,
        "daily_forecast": daily_forecast,
        "uv_index": uv_index,
        "current_date": current_date
    })

if __name__ == '__main__':
    app.run(debug=True)
import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherAlert = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/weather");
        const data = await response.json();
        setWeather(data);
        checkWeatherConditions(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 60000); // Refresh every 1 minute
    return () => clearInterval(interval);
  }, []);

  const checkWeatherConditions = (data) => {
    if (!data || !data.current) return;
    const severeConditions = ["Thunderstorm", "Heavy Rain", "Storm", "Cyclone"];
    
    if (severeConditions.includes(data.current.condition.text)) {
      sendNotification("Severe Weather Alert!", `Current weather: ${data.current.condition.text}`);
    }
  };

  const sendNotification = (title, message) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body: message });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, { body: message });
        }
      });
    }
  };

  return (
    <div>
      <h2>Chennai Weather</h2>
      {weather && weather.current ? (
        <div>
          <img src={`https:${weather.current.condition.icon}`} alt={weather.current.condition.text} />
          <p><strong>Condition:</strong> {weather.current.condition.text}</p>
          <p><strong>Temperature:</strong> {weather.current.temp_c}°C / {weather.current.temp_f}°F</p>
          <p><strong>Feels Like:</strong> {weather.current.feelslike_c}°C / {weather.current.feelslike_f}°F</p>
          <p><strong>Wind:</strong> {weather.current.wind_kph} kph ({weather.current.wind_dir})</p>
          <p><strong>Humidity:</strong> {weather.current.humidity}%</p>
          <p><strong>Visibility:</strong> {weather.current.vis_km} km</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherAlert;
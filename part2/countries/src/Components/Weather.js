import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ lat, lon }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState([]);
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;

  const weatherHook = () => {
    axios.get(api).then((response) => {
      console.log("data is :", response.data.main.temp);
      setWeather(response.data);
    });
  };
  useEffect(weatherHook, [api]);

  if (weather.length === 0) return <div>Loading</div>;
  const iconUrl =
    "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png";
  const celsius = (weather.main.temp - 272.15).toFixed(2);

  return (
    <div>
      <div>temperature: {celsius} celsius</div>
      <img src={iconUrl} alt="weather" />
      <div>wind: {weather.wind.speed}</div>
    </div>
  );
};

export default Weather;

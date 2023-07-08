/** @format */

import React, { useEffect, useState } from "react";
import { getCapitalWeather } from "../service/weather";

function WeatherCard({ capitalInfo }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (capitalInfo.latlng) {
      getCapitalWeather(capitalInfo.latlng[0], capitalInfo.latlng[1]).then(
        (data) => setWeatherData(data)
      );
    } else {
      setWeatherData(null);
    }
  }, [capitalInfo]);

  if (!weatherData) {
    return <span className='loading loading-bars loading-md'></span>;
  }
  return (
    <div>
      {weatherData && (
        <div className=' p-4 px-10 drop-shadow-xl bg-cyan-600 flex flex-col w-fit text-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-30 border border-cyan-900'>
          <div className='drop-shadow-lg'>
            <img
              className='h-full w-16'
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={`image of ${weatherData.weather[0].main}`}
            />
          </div>
          <div className='text-3xl py-2 font-mono drop-shadow-lg'>
            {weatherData.weather[0].description}
          </div>
          <div className='text-xl my-2 font-mono drop-shadow-lg'>
            <div>
              Feels like : {Math.round(weatherData.main.feels_like)}&#8451;
            </div>
            <div>
              Temperature : {Math.round(weatherData.main.temp_max)} &#8451;
            </div>
            <div>Humidity : {`${Math.round(weatherData.main.humidity)} %`}</div>
            <div> Wind speed : {Math.round(weatherData.wind.speed)} m/s</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;

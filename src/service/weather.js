/** @format */
import axios from "axios";

const Base_Url = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const getCapitalWeather = (lat, lon) => {
  return axios
    .get(`${Base_Url}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting weather data: ", error);
    });
};

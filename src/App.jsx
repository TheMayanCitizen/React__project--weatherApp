import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [weather, setWeather] = useState();
  const [coords, setCoords] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [temperature, setTemperature] = useState();
  const [city, setCity] = useState("");

  useEffect(() => {
    const success = (pos) => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setCoords(obj);
    };

    const error = (err) => {
      /* console.warn(`ERROR(${err.code}): ${err.message}`); */
      console.log(err);
      setIsLoading(false);
      setCity("Los Angeles");
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    if (coords) {
      const APIkey = "11852680f1c2f961aaccc9aec9d01462";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIkey}`;
      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(1),
            fahrenheit: (((res.data.main.temp - 273.15) * 9) / 5 + 32).toFixed(
              1
            ),
          };
          setTemperature(obj);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [coords]);
  /* console.log(weather); */

  useEffect(() => {
    if (city) {
      const APIKey = "11852680f1c2f961aaccc9aec9d01462";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(1),
            fahrenheit: (((res.data.main.temp - 273.15) * 9) / 5 + 32).toFixed(
              1
            ),
          };
          setTemperature(obj);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [city]);
  return (
    <div className="App">
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <section className="App__card">
          <Form setCity={setCity} />
          <WeatherCard weather={weather} temperature={temperature} />
        </section>
      )}
    </div>
  );
}

export default App;

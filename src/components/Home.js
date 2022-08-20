import React from "react";
import { useEffect, useState } from "react";

import { getData } from "../helpers/Api";
// "https://geolocation-db.com/json/d802faa0-10bd-11ec-b2fe-47a0872c6708"

const Home = () => {
  //date
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  //state
  const [query, setQuery] = useState("");
  const [DefaultCity, setDefaultCity] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState({});

  //Get Default City
  const geo = () => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const city = data.city;
        setDefaultCity(city);
        setQuery(city);
      });
  };

  // get data
  const getAllData = async (e) => {
    if (e ? e.key && e.key === "Enter" : "" || query) {
      try {
        let res = await getData(query);
        setWeather(res);
        setError("");
      } catch (e) {
        console.error(e.message);
        if (e.message === "Request failed with status code 404") {
          setError("The city does not exist");
        }
      }
      setQuery("");
      setDefaultCity("");
    }
  };

  useEffect(() => {
    geo();
  }, []);

  useEffect(() => {
    getAllData();
  }, [DefaultCity]);

  const pic = () =>
    // if()

    error
      ? "app notFound"
      : weather.main.temp > 29
      ? "app hot"
      : weather.main.temp <= 29 && weather.main.temp >= 15
      ? "app normal"
      : "app cold";

  //jsx
  return (
    <React.Fragment>
      {typeof weather.main === "undefined" ? (
        ""
      ) : (
        <div className={pic()}>
          <main>
            <div className="search-box">
              <div>
                <input
                  className="search-bar"
                  placeholder="Search..."
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={getAllData}
                />
              </div>
            </div>

            {error ? (
              <div className="location-box">
                <div className="location">{error}</div>
              </div>
            ) : (
              <div>
                <div>
                  <div className="location-box">
                    <div className="location">
                      {weather.name}, {weather.sys.country}
                    </div>
                    <div className="date">{dateBuilder(new Date())}</div>
                  </div>
                </div>
                <div className="weather-box">
                  <div>
                    <div className="temp">{weather.main.temp}°c</div>
                    <div className="weather">{weather.weather[0].main}</div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;

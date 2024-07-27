import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setdata] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.api_key}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setdata(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app w-screen h-screen relative bg-zinc-400 bg-[url('../src/assets/sunset.jpeg')] text-white bg-no-repeat bg-cover overflow-hidden">
      <div className="search text-center p-4 mt-5 ">
        <input
          className="px-5 w-80 py-3 text-lg rounded-3xl border-2 border-zinc-200 bg-yellow-300 bg-opacity-25 text-white placeholder:text-white outline-none"
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
        />
      </div>
      <div className="container max-h-screen max-w-2xl m-auto px-0 py-1 relative top-10 flex flex-col gap-56 ">
        <div className="top w-full mx-4 my-auto">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}℉</h1> : null}
          </div>
          <div className="description drop-shadow-lg relative right-[-90%] origin-left -rotate-90">
            {data.weather ? <p className="font-semibold text-3xl">{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && 
          <div className="bottom flex justify-evenly text-center mx-4 my-auto p-4 rounded-xl bg-yellow-400 bg-opacity-30 ">
            <div className="feels">
              {data.main ? (<p className="font-semibold">{data.main.feels_like.toFixed()}℉</p>) : null}
              <p>Feels Like </p>
            </div>
            <div className="humidity">
              {data.main ? (<p className="font-semibold">{data.main.humidity}%</p>) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (<p className="font-semibold">{data.wind.speed.toFixed()}MPH</p>) : null}
              <p>Winds</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;

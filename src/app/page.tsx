"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const response = await fetch(`/api/weather?city=${city}`);
    const data = await response.json();
    setWeather(data);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-blue-100 bg-cover bg-center"
      style={{ backgroundImage: "url('/path/to/clouds.jpg')" }}
    >
      <div className="bg-white bg-opacity-75 p-10 rounded-xl shadow-xl text-center">
        <h1 className="text-6xl font-bold mb-8 text-blue-800">Weather App</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="px-4 py-2 border rounded shadow-lg text-lg w-80 mb-4"
        />
        <button
          onClick={fetchWeather}
          className="px-6 py-2 bg-blue-600 text-white rounded shadow-lg text-lg hover:bg-blue-700"
        >
          Get Weather
        </button>
        {weather && (
          <div className="mt-6 text-center flex justify-center">
            <div>
              <Image
                src="/cloud.svg"
                width={130}
                height={130}
                alt="Picture of the author"
              />
            </div>
            <div>
              <h2 className="text-4xl font-semibold text-blue-900">
                {weather.name}
              </h2>
              <p className="text-3xl mt-2 text-blue-700">
                {weather.main.temp}°C
              </p>
              <p className="text-2xl mt-2 capitalize text-blue-600">
                {weather.weather[0].description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

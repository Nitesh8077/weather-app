"use client";
import { useState } from "react";
import Image from "next/image";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  weather: {
    description: string;
  }[];
}

export default function Home(): JSX.Element {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const fetchWeather = async () => {
    const response = await fetch(`/api/weather?city=${city}`);
    const data: WeatherData = await response.json();
    setWeather(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 bg-cover bg-center p-4">
      <div className="bg-white bg-opacity-80 p-10 rounded-xl shadow-xl text-center w-full max-w-2xl">
        <h1 className="text-6xl font-bold mb-8 text-yellow-800">Weather App</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="px-4 py-2 border rounded shadow-lg text-lg w-full mb-4 text-black"
        />
        <button
          onClick={fetchWeather}
          className="px-6 py-2 bg-blue-600 text-white rounded shadow-lg text-lg hover:bg-blue-700 w-full"
        >
          Get Weather
        </button>
        {weather && (
          <div className="mt-6 text-center flex flex-col items-center w-full">
            <Image
              src="/cloud.svg"
              width={130}
              height={130}
              alt="Weather icon"
              className="mb-4"
            />
            <h2 className="text-4xl font-semibold text-blue-900 mb-2">
              {weather.name}
            </h2>
            <div className="grid grid-cols-2 gap-4 w-full">
              <p className="text-2xl text-blue-700">
                Temperature:{" "}
                <span className="font-bold">{weather.main.temp}°C</span>
              </p>
              <p className="text-2xl text-blue-700">
                Feels Like:{" "}
                <span className="font-bold">{weather.main.feels_like}°C</span>
              </p>
              <p className="text-2xl text-blue-700">
                Min Temp:{" "}
                <span className="font-bold">{weather.main.temp_min}°C</span>
              </p>
              <p className="text-2xl text-blue-700">
                Max Temp:{" "}
                <span className="font-bold">{weather.main.temp_max}°C</span>
              </p>
              <p className="text-2xl text-blue-700">
                Pressure:{" "}
                <span className="font-bold">{weather.main.pressure} hPa</span>
              </p>
              <p className="text-2xl text-blue-700">
                Humidity:{" "}
                <span className="font-bold">{weather.main.humidity}%</span>
              </p>
              <p className="text-2xl text-blue-700">
                Sea Level:{" "}
                <span className="font-bold">{weather.main.sea_level} hPa</span>
              </p>
              <p className="text-2xl text-blue-700">
                Ground Level:{" "}
                <span className="font-bold">{weather.main.grnd_level} hPa</span>
              </p>
            </div>
            <p className="text-2xl capitalize text-blue-600 mt-4">
              {weather.weather[0].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

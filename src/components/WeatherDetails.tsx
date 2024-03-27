import { DropletIcon, EyeIcon, SunWindIcon, SunriseIcon, SunsetIcon, WindIcon } from "@/icons";
import React from "react";
import { SingleWeatherDetail } from "./SingleWeatherDetail";

export interface WeatherDetailsProps {
  visability: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export const WeatherDetails = ({
  visability,
  humidity,
  windSpeed,
  airPressure,
  sunrise,
  sunset,
}: WeatherDetailsProps) => {
  return (
    <>
      <SingleWeatherDetail icon={<EyeIcon />} information="Visability" value={visability} />
      <SingleWeatherDetail icon={<DropletIcon />} information="Humidity" value={humidity} />
      <SingleWeatherDetail icon={<WindIcon />} information="Wind Speed" value={windSpeed} />
      <SingleWeatherDetail icon={<SunWindIcon />} information="Air Pressure" value={airPressure} />
      <SingleWeatherDetail icon={<SunriseIcon />} information="Sunrice" value={sunrise} />
      <SingleWeatherDetail icon={<SunsetIcon />} information="Sunset" value={sunset} />
    </>
  );
};

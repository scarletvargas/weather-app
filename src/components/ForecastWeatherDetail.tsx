import React from "react";
import { Container, WeatherIcon } from ".";
import { WeatherDetails, WeatherDetailsProps } from "./WeatherDetails";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";

export interface ForecastWeatherDetailProps extends WeatherDetailsProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export const ForecastWeatherDetail = (props: ForecastWeatherDetailProps) => {
  const {
    weatherIcon = "02d",
    date = "19.09",
    day = "Tuesday",
    temp,
    feels_like,
    temp_min,
    temp_max,
    description,
  } = props;
  return (
    <Container className="gap-4 flex flex-col justify-between md:flex-row px-4 lg:px-10">
      <section className="flex flex-col gap-1 px-4 items-center md:items-start">
        <p className="font-light text-lg text-start">
          {date} {day}
        </p>
        <div className="flex gap-4">
          <WeatherIcon iconName={weatherIcon} />
          <div className="flex flex-col">
            <span className="text-5xl">{convertKelvinToCelsius(temp ?? 0)}°</span>
            <p className="capitalize font-light text-sm">{description}</p>
            <p className="text-xs space-x-1 whitespace-nowrap font-extralight">
              <span> Feels like</span>
              <span>{convertKelvinToCelsius(feels_like ?? 0)}°</span>
            </p>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
};

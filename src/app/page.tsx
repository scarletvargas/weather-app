"use client";
import { Container } from "@/components";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { list } from "postcss";
import { useQuery } from "react-query";

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=15`
      );
      return data;
    }
  );

  const firstData = data?.list[0];

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  return (
    <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
      <section>
        <div className="flex gap-1 text-2xl items-end">
          <p>({format(parseISO(firstData?.dt_txt ?? ""), "EEEE")})</p>
          <p className="text-">
            ({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})
          </p>
        </div>
        <Container className="px-6 items-center gap-10">
          <div className="flex flex-col px-4">
            <span className="text-5xl">
              {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°
            </span>
            <div className="text-xs space-x-1 whitespace-nowrap">
              <span>Feels like</span>
              <span>
                {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
              </span>
            </div>
            <div className="text-xs space-x-2">
              <span>
                {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓{" "}
              </span>
              <span>
                {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑{" "}
              </span>
            </div>
          </div>
          <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
            {data?.list.map((d, index) => (
              <div
                key={index}
                className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
              >
                <p className="whitespace-nowrap">
                  {format(parseISO(d.dt_txt), "h:mm a")}
                </p>
                <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section></section>
    </main>
  );
}

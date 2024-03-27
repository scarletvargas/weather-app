"use client";
import {
  Container,
  Navbar,
  WeatherIcon,
  ForecastWeatherDetail,
  WeatherDetails,
  Loader,
  Footer,
} from "@/components";
import {
  metersToKilometers,
  convertKelvinToCelsius,
  convertWindSpeed,
  getDayOrNightIcon,
} from "@/utils";
import { format, fromUnixTime, parseISO } from "date-fns";
import { useAtom } from "jotai";
import { useQuery } from "react-query";
import { loadingCityAtom, placeAtom } from "./atom";
import { useEffect } from "react";
import { CalendarIcon, ClockIcon } from "@/icons";
import { apiServices } from "@/services/api.services";

export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity, setLoadingCity] = useAtom(loadingCityAtom);

  const { isLoading, error, data, refetch } = useQuery<WeatherData>("repoData", async () => {
    try {
      const data = await apiServices.getWeatherForecast(place);
      return data;
    } catch (error) {
      throw new Error("Failed to fetch weather forecast");
    }
  });

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  const firstData = data?.list[0];

  const uniqueDates = [
    ...new Set(data?.list.map((entry) => new Date(entry.dt * 1000).toISOString().split("T")[0])),
  ];

  // Filtering data to get the first entry after 6 AM for each unique date
  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen h-full lg:h-screen min-w-80">
      <Navbar location={data?.city.name} />
      {loadingCity ? (
        <Loader />
      ) : (
        <main className="flex flex-col md:flex-row gap-4 px-3 max-w-7xl mx-auto w-full pb-4 pt-2 md:h-[90vh] text-gravel-950 dark:text-gray-50">
          <section className="space-y-4 w-full md:w-4/12 md:sticky top-10 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <Container className="min-w-64 px-4 flex-col pb-0">
                <p className="whitespace-nowrap font-light text-lg -mb-6 pl-2">
                  {format(parseISO(firstData?.dt_txt ?? ""), "EEEE, dd MMM yyyy.")}
                </p>
                <div className="justify-center flex items-center">
                  <WeatherIcon
                    className="h-44 w-44"
                    iconName={getDayOrNightIcon(
                      firstData?.weather[0].icon ?? "",
                      firstData?.dt_txt ?? ""
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="text-5xl">
                      {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°
                    </span>{" "}
                    <p className="capitalize font-light">{firstData?.weather[0].description} </p>
                    <div className="text-xs space-x-1 whitespace-nowrap font-extralight">
                      <span>Feels like</span>
                      <span>{convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°</span>
                      <span>
                        {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}
                        °↓{" "}
                      </span>
                      <span>
                        {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}
                        °↑{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </Container>
              <Container className="bg-gradient-to-br text-gravel-950 dark:text-gravel-50 from-sienna-300 dark:from-sienna-600 to-sienna-600 dark:to-black grid grid-cols-2 px-6 justify-between gap-4">
                <WeatherDetails
                  visability={metersToKilometers(firstData?.visibility ?? 10000)}
                  airPressure={`${firstData?.main.pressure} hPa`}
                  humidity={`${firstData?.main.humidity}%`}
                  sunrise={format(fromUnixTime(data?.city.sunrise ?? 1702949452), "H:mm")}
                  windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
                  sunset={format(fromUnixTime(data?.city.sunset ?? 1702517657), "H:mm")}
                />
              </Container>
            </div>
            <div className="hidden md:flex">
              <Footer />
            </div>
          </section>
          <section className="flex w-full md:w-8/12 flex-col gap-4 overflow-y-auto">
            <p className="text-xl font-light pt-1 -mb-3 flex items-center gap-2">
              <ClockIcon strokeWidth={1.5} />
              Hourly Forcast
            </p>
            <Container className="px-6 items-center gap-10 bg-gravel-800 dark:bg-gravel-600">
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((d, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between items-center text-xs font-semibold"
                  >
                    <p className="whitespace-nowrap">{format(parseISO(d.dt_txt), "h:mm a")}</p>
                    <p className="text-2xl">{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
                    <WeatherIcon iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)} />
                  </div>
                ))}
              </div>
            </Container>
            <p className="text-xl font-light pt-1 -mb-3 flex items-center gap-2">
              <CalendarIcon strokeWidth={1.5} /> 7 Day Forcast
            </p>
            {firstDataForEachDate.map((d, i) => (
              <ForecastWeatherDetail
                key={i}
                description={d?.weather[0].description ?? ""}
                weatherIcon={d?.weather[0].icon ?? "01d"}
                date={format(parseISO(d?.dt_txt ?? ""), "dd MMM,")}
                day={format(parseISO(d?.dt_txt ?? ""), "EEEE.")}
                feels_like={d?.main.feels_like ?? 0}
                temp={d?.main.temp ?? 0}
                temp_min={d?.main.temp_min ?? 0}
                temp_max={d?.main.temp_max ?? 0}
                airPressure={`${d?.main.pressure} hPa`}
                humidity={`${d?.main.humidity}% `}
                sunrise={format(fromUnixTime(data?.city.sunrise ?? 1702949452), "H:mm")}
                windSpeed={convertWindSpeed(d?.wind.speed ?? 1.64)}
                sunset={format(fromUnixTime(data?.city.sunset ?? 1702517657), "H:mm")}
                visability={`${metersToKilometers(d?.visibility ?? 10000)}`}
              />
            ))}
          </section>
          <div className="md:hidden text-center">
            <Footer />
          </div>
        </main>
      )}
    </div>
  );
}

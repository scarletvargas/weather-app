"use client";
import axios from "axios";
import { format, parseISO } from "date-fns";
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

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  return (
    <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
      <section>
        <div>
          <div className="flex gap-1 text-2xl items-end">
            <p>({format(parseISO(firstData?.dt_txt ?? ""), "EEEE")})</p>
            <p className="text-">({format(parseISO(firstData?.dt_txt ?? ""), "EEEE")})</p>
          </div>
        </div>
      </section>
      <section></section>
    </main>
  );
}

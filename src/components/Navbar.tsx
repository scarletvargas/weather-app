"use client";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { CurrentLocationIcon, MoonIcon, SunIcon } from "@/icons";
import { SearchBox } from "./SearchBox";
import { SuggestionsBox } from "./SuggetionBox";
import { loadingCityAtom, placeAtom } from "@/app/atom";
import { apiServices } from "@/services/api.services";

type Props = {
  location?: string;
};

export const Navbar = ({ location }: Props) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("light");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoadingCity] = useAtom(loadingCityAtom);

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const suggestions = await apiServices.searchCity(value);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestions(false);
  }

  function handleSubmiSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true);
    e.preventDefault();
    if (suggestions.length == 0) {
      setError("Location not found");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  }

  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLoadingCity(true);
          const cityName = await apiServices.getCurrentWeatherByLocation(latitude, longitude);
          setTimeout(() => {
            setLoadingCity(false);
            setPlace(cityName);
          }, 500);
        } catch (error) {
          setLoadingCity(false);
        }
      });
    }
  }

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <header className="bg-gravel-50 dark:bg-[#0F0E10] h-full w-full">
      <nav className="max-w-7xl py-2 px-4 flex flex-col gap-4 sm:flex-row justify-between items-center w-full mx-auto">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center justify-start gap-4 w-full">
            <h2 className="dark:text-gravel-50 text-[#0F0E10] text-3xl whitespace-nowrap font-medium">
              Weather App
            </h2>
            <button onClick={handleChangeTheme} className="">
              {theme === "light" ? (
                <MoonIcon className="fill-gray-300 hover:fill-gray-600 stroke-none" />
              ) : (
                <SunIcon
                  width={30}
                  height={30}
                  className="fill-yellow-300 hover:fill-yellow-600"
                  strokeWidth={0}
                />
              )}
            </button>
          </div>
          <button title="Your Current Location" onClick={handleCurrentLocation}>
            <CurrentLocationIcon
              strokeWidth={1.5}
              width={30}
              height={30}
              className="stroke-gravel-950 dark:stroke-gravel-50 hover:opacity-80 cursor-pointer"
            />
          </button>
        </div>
        <div className="relative w-full sm:w-fit">
          {/* SearchBox */}
          <SearchBox
            location={location ?? ""}
            value={city}
            onSubmit={handleSubmiSearch}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <SuggestionsBox
            {...{
              showSuggestions,
              suggestions,
              handleSuggestionClick,
              error,
            }}
          />
        </div>
      </nav>
    </header>
  );
};

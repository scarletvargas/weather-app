import axios from "axios";
import { env } from "@/config/env";

export const apiServices = {
  getWeatherForecast: async (place: string) => {
    try {
      const { data } = await axios.get(
        `${env.API_URL}forecast?q=${place}&appid=${env.API_KEY}&cnt=56`
      );
      return data;
    } catch (error) {
      throw new Error("Error fetching weather forecast");
    }
  },
  searchCity: async (value: string) => {
    try {
      const response = await axios.get(`${env.API_URL}find?q=${value}&appid=${env.API_KEY}`);
      return response.data.list.map((item: any) => item.name);
    } catch (error) {
      throw new Error("Error searching for city");
    }
  },
  getCurrentWeatherByLocation: async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        `${env.API_URL}weather?lat=${latitude}&lon=${longitude}&appid=${env.API_KEY}`
      );
      return response.data.name;
    } catch (error) {
      throw new Error("Error getting current weather");
    }
  },
};

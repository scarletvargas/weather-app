import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "sienna": {
          "50": "#fdf4ef",
          "100": "#fbe4d9",
          "200": "#f6c6b2",
          "300": "#f0a181",
          "400": "#e96e4b",
          "500": "#e44d2b",
          "600": "#d53521",
          "700": "#b1261d",
          "800": "#8d211f",
          "900": "#721e1c",
          "950": "#3d0d0e",
        },
        'gravel': {
          '50': '#f7f7f8',
          '100': '#efeef0',
          '200': '#dbdadd',
          '300': '#bbbabf',
          '400': '#96949c',
          '500': '#797780',
          '600': '#626168',
          '700': '#504f55',
          '800': '#48474c',
          '900': '#3c3b3f',
          '950': '#28272a',
      },
      
      },
    },
  },
  plugins: [],
};
export default config;

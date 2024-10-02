import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#ffffff", // Set the background color to white
        },
        foreground: {
          DEFAULT: "#000000", // Set the text color to black
        },
      },
    },
  },
  darkMode: "class", // Disable dark mode
  plugins: [require("daisyui")],
};

export default config;

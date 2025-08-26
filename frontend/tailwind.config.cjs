/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1565c0", // azul aerolínea
          50: "#eaf2fb",
          100: "#d8e6f8",
          200: "#b8d1f2",
          300: "#8db6ea",
          400: "#5b95de",
          500: "#1565c0",
          600: "#1154a3",
          700: "#0e488a",
          800: "#0d3d73",
          900: "#0c345f",
        },
        success: "#2ca87f",
        warning: "#f4b028",
        danger:  "#e53935",
        slate:   { 25: "#f6f8fb" }
      },
      boxShadow: {
        card: "0 12px 30px -12px rgba(10, 31, 68, .25)"
      }
    },
  },
  plugins: [],
};

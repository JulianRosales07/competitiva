/ @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src//*.{js,ts,jsx,tsx}",
    "./App.js",
    "./componentes//*.js",
    "./datos//*.js",
    "./utilidades//*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
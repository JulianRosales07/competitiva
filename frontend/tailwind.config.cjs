/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4680ff",
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#b6ceff",
          300: "#8db1ff",
          400: "#668fff",
          500: "#4680ff",
          600: "#2f6df5",
          700: "#2457d1",
          800: "#2048a8",
          900: "#1e3f88"
        },
        success: "#2ca87f",
        warning: "#f4c22b",
        danger:  "#ea4d4d",
        muted:   "#f3f5f9"
      },
      boxShadow: {
        card: "0 10px 25px -10px rgba(17,24,39,0.15)"
      }
    },
  },
  plugins: [],
};

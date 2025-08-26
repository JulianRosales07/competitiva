import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

/** @type {import('tailwindcss').Config} */
css: {
  preprocessorOptions: {
    tailwindcss: {
      content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",  // <-- importante para React
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    },
  },
},

})

/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./src/**/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Figtree: ['"Figtree", sans-serif', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}


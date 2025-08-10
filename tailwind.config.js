/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['attribute', 'data-theme'], 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

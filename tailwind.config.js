/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#3b82f6',
      },
    },
  },
  darkMode: 'class', // optional: enables dark mode
  plugins: [],
}

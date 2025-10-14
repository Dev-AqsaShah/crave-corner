/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0b4f3a',
          light: '#0f766e',
        },
      },
    },
  },
  plugins: [],
}


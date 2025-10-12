/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  // Safelist: force-generate all classes that start with "text-"
  safelist: [
    { pattern: /^text-/ }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

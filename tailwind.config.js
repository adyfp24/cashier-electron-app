/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // plugins: [
  //   require('flowbite/plugin')({
  //     charts: true,
  // }),
  // ],
}


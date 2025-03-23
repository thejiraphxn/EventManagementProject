const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content()
  ],
  theme: {
    extend: {
      screens: {
        'xs': { max: '639px' }, 
      },
    },
  },
  plugins: [require('flowbite/plugin'), flowbite.plugin()],
}
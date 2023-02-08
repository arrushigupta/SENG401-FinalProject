/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'grey': '#27272a',
        'white': '#f4f4f9',
        'black': '#000000',
        'primary': '#386F7C',
        'secondary': '#B8DBD9',
        'tertiary': '#04724D',

        // ...
      },
    },
  },
  plugins: [],
}

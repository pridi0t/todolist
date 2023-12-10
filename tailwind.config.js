/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./static/**/*.{html, js}",
    "./views/**/*.hbs"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}


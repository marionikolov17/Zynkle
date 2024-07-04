/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainGreen: "#0ebd60",
        darkGreen: "#184c34",
        darkGrey: "#cad1c9",
        mainWhite: "#eff4ed"
      },
      fontFamily: {
        montserrat: "'Montserrat', sans-serif"
      }
    },
  },
  plugins: [],
}

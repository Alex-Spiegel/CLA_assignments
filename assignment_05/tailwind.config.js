/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./**/*.html",
      "./script.js",
],
  
  theme: {
    extend: {
      colors: {
        primaryColor: "#8053FF",
        mainBodyColor: "#23155B",
        grayLightColor: "#817d8e",
        whiteColor: "#FDFDFD",
        backgroundColor: "#f4f4f4",


      }
    },
  },
  plugins: [],
}


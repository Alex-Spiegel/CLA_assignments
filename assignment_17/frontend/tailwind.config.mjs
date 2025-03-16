/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Custom colors - I changed some names/ values to better fit the template of the tasks. Some colors where quite off
        primary: "#8053FF",
        bodyMain: "#23155B",
        MyLightGray: "#817d8e",
        myWhite: "#FDFDFD",
        background: "#f4f4f4",

        navLight: "#E5E7EB", // Navbar background color (light-mode)
        navDark: "#23155B", // Navbar background color (dark-mode)
        mainLight: "#CBd5E1", // Main application background color (light-mode)
        mainDark: "#372687", // Main application background color (dark-mode)
        purple01: "#6b45fd", // für selections und so
        purple02: "#4426c3", // bg for boxes (dark-mode)
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

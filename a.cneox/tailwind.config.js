/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primaryColor: "#12CEF9",
        redColor: "#EB4654",
        greenColor: "#6DDE16",
        yellowColor: "#DBD62E",
        blueColor: "#6DB0D5",
        grayColor: "#C8C8C8",
        textColor: "#0F213C",
        subTextColor: "#84888E",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Nunito"],
        title: ["Dunkin"],
      },
      colors: {
        p1: "#e4fde1",
        p2: "#8acb88",
        p3: "#648381",
        p4: "#575761",
        p5: "#ffbf46",
      },
    },
  },
  plugins: [],
}

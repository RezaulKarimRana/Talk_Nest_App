/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      fontJotiOne: ["joti-one"],
      fontInter: ["inter"],
      fontInterBold: ["inter-bold"],
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

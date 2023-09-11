/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans"],
      },
      colors: {
        bodyhack: "#01feff",
      },
    },
  },
  plugins: [],
};

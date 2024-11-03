/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend Deca", "sans-serif"],
      },
      container: {
        padding: {
          md: "20rem",
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./views/**/*.html"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};


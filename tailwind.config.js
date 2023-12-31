/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: "true",
      padding: "1rem",
    },
    colors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
      tavanaGreen: "#000000",
      tavanBrown: "#F5BE32",
      border: "#eee",
      tavanaGray: "#666666",

      inputbg: "rgba(217, 217, 217, 0.36)",
      content: "#D9D9D9",
      tavanaPurple: "#82529A",
      bankCard: "rgba(30, 30, 30, 0.1)",
      tavanaRed: "#B84E4E",
    }),
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss"),
    require("autoprefixer"),
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "640px",
          },
          "@screen md": {
            maxWidth: "768px",
          },
          "@screen lg": {
            maxWidth: "990px",
          },
          "@screen xl": {
            maxWidth: "80%",
          },
        },
      });
    },
  ],
  daisyui: {
    rtl: true,
  },
});

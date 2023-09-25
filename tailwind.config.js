const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.scss"],
  theme: {
    screens: {
      xl: { max: "1919px" },
      lz: { max: "1439px" },
      lg: { max: "1335px" },
      md: { max: "1024px" },
      xs: { max: "767px" },
    },
    colors: {
      white: "#ffffff",
      black: "#2A271D"
    },
    extend: {
      boxShadow: {
        default: "0px 4px 12px rgba(0, 0, 0, 0.08)",
        focus: "0px 0px 0px 4px rgba(251, 216, 157, 0.8);",
      },
      fontSize: {
        "xs-10": ["0.625rem", "0.875rem"],
        sm: ["0.875rem", "1rem"],
      },
      spacing: {
        unset: "unset",
        4.5: "1.125rem",
        5.5: "1.375rem",
        7.5: "1.875rem",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

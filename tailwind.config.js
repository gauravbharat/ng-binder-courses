/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,ts}"];
export const theme = {
  screens: {
    xs: "280px",
    sm: "480px",
    md: "768px",
    lg: "976px",
    xl: "1440px",
  },
  extend: {
    colors: {
      lightGreen: "hsl(120, 60%, 95%)",
      primaryGreen: "hsl(120, 60%, 50%)",
      darkBlue2: "hsl(216, 53%, 9%)",
      darkBlue3: "hsl(219, 30%, 18%)",
      footerDarkBlue: "hsl(219, 30%, 11%)",
      accentCyan: "hsl(176, 68%, 64%)",
      accentBlue: "hsl(198, 60%, 50%)",
      lightRed: "hsl(0, 100%, 63%)",
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
  },
};
export const plugins = [];

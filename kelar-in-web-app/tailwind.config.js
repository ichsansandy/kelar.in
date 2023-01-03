/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // screens: {
    //   "2xl": { max: "1536px" },
    //   // => @media (max-width: 1535px) { ... }

    //   xl: { max: "1280px" },
    //   // => @media (max-width: 1279px) { ... }

    //   lg: { max: "1024px" },
    //   // => @media (max-width: 1023px) { ... }

    //   md: { max: "768px" },
    //   // => @media (max-width: 767px) { ... }

    //   sm: { max: "640px" },
    //   // => @media (max-width: 639px) { ... }
    // },
    extend: {
      colors: {
        "primary-color": "#D8D9CF",
        "secondary-color": "#EDEDED",
        "third-color": "#FF8787",
        "fourth-color": "#E26868",
      },
    },
  },
  plugins: [],
};

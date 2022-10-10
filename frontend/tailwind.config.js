/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sku: {
          light: "#EDF4FA",
          DEFAULT: "#D6E2EE",
          dark: "#BAC8D9",
          darker: "#788594",
        },
      },
      fontFamily: {
        futuristic: ["Orbitron", "Helvetica"],
        note: ["Merriweather", "Helvetica"],
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};

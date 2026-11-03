/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary navy blue, sampled from the Antlar Elite Services logo.
        brand: {
          50: "#eef3fb",
          100: "#d7e2f6",
          200: "#aec5ed",
          300: "#7fa2e0",
          400: "#4c77cf",
          500: "#12438f", // primary action color — matches the logo's navy blue
          600: "#0b2f6e",
          700: "#082356",
          800: "#061a40",
          900: "#04122e",
        },
        // Accent green, sampled from the logo's leaf.
        leaf: {
          400: "#7bc943",
          500: "#2f8a1f",
        },
        sand: "#f6f8fb",
        ink: "#0f1b2d",
      },
      fontFamily: {
        display: ["var(--font-baloo)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(15, 27, 45, 0.15)",
      },
    },
  },
  plugins: [],
};

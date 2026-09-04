/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f7f1",
          100: "#e1ecdf",
          200: "#c1d9bd",
          300: "#98bf90",
          400: "#6d9f63",
          500: "#3f7a34", // primary deep green (from logo)
          600: "#2f6127",
          700: "#254e20",
          800: "#1e3f1a",
          900: "#193416",
        },
        leaf: {
          400: "#6fbf3f",
          500: "#4fa524",
        },
        sand: "#f6f4ee",
        ink: "#14231a",
      },
      fontFamily: {
        display: ["var(--font-baloo)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(20, 35, 26, 0.15)",
      },
    },
  },
  plugins: [],
};

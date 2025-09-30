module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        accent: "var(--accent)"
      },
      container: {
        center: true
      }
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px"
    }
  },
  plugins: []
};

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        'custom-gray': '#37374A',
      },
      colors: {
        primary: "#2d2d3f",
        light: "#F0F0F0",
      },
    },
  },
  variants: {
    extend: {
      width: ["hover", "focus"],
    },
  },
  plugins: [],
}

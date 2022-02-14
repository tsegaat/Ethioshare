module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  variants: {
    extend: {}
  },
  theme: {
    extend: {
      colors: {
        blue: {
          '100': '#c8dbff',
          '700': '#1652f0'
        },
        gray: {
          '100': "#f8f8f8"
        }
      },
      fontSize: {
        '6xl': ['3.75rem', '1.5em']
      },
      screens: {
        'xs': '200px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}


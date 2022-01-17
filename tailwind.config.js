module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
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

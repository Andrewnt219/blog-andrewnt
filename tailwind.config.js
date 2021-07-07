const { fontFamily, colors } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#006ae6',
      current: 'current',
      transparent: 'transparent',
      white: '#fff',
      black: '#000',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: colors.gray[700],
            a: {
              color: colors.blue[600],
            },
          },
        },
        dark: {
          css: {
            color: colors.gray[300],
            a: {
              color: colors.blue[500],
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};

const { fontFamily, colors } = require('tailwindcss/defaultTheme');

const getColorFromCssVariable =
  (cssVariableName) =>
  ({ opacityVariable }) => {
    const cssVariable = `var(--${cssVariableName})`;

    if (opacityVariable === undefined) {
      return `hsl(${cssVariable})`;
    }

    return `hsla(${cssVariable}, var(${opacityVariable}, 1))`;
  };

module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      primary: getColorFromCssVariable('primary'),
      textcolor: getColorFromCssVariable('text-color'),
      bgcolor: getColorFromCssVariable('bg-color'),
      current: 'current',
      transparent: 'transparent',
      white: '#fff',
      black: colors.gray[900],
      gray: colors.gray,
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
              color: theme('colors.primary'),
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

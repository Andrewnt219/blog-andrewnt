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
      primarymuted: getColorFromCssVariable('primary-muted'),

      textcolor: getColorFromCssVariable('text-color'),
      textmuted: getColorFromCssVariable('text-muted'),

      bgcolor: getColorFromCssVariable('bg-color'),
      bgmuted: getColorFromCssVariable('bg-muted'),

      bordercolor: getColorFromCssVariable('border-color'),

      current: 'current',
      transparent: 'transparent',
      white: '#fff',
      black: colors.gray[900],
    },

    border: (theme) => ({
      DEFAULT: theme('colors.bordercolor'),
    }),

    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

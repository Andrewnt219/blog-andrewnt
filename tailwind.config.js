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
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
      },
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

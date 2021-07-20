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

    fontSize: {
      hero: 'clamp(2.5rem, 2.1rem + 2vw, 4.5rem)', // 40~72px
      h1: 'clamp(1.75rem, 1.5rem + 1.25vw, 3rem)', // 28~48px
      h2: 'clamp(1.5rem, 1.4rem + 0.5vw, 2rem)', // 24~32px,
      xl: '1.5rem',
      lg: '1.125rem',
      h3: 'clamp(1rem, 1rem + 0.2vw, 1.25rem)', // 16~20px
      body: '1rem',
      sm: '0.875rem',
      xs: '0.75rem',
    },

    extend: {
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
        '4xl': '5rem',
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },

      borderColor: (theme) => ({
        DEFAULT: theme('colors.bordercolor'),
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};

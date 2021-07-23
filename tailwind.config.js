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
      bglight: getColorFromCssVariable('bg-light'),
      bggray: getColorFromCssVariable('bg-gray'),

      bordercolor: getColorFromCssVariable('border-color'),

      current: 'current',
      transparent: 'transparent',
      white: '#fff',
      black: colors.gray[900],
    },

    fontSize: {
      hero: 'clamp(2.5rem, 2.1rem + 2vw, 4.5rem)', // 40~72px
      h1: 'clamp(2rem, 1.6666666666666667rem + 1.6666666666666667vw, 3rem)', // 32~48px
      h2: 'clamp(1.5rem, 1.1666666666666667rem + 1.6666666666666667vw, 2.5rem)', // 24~40px,
      xl: '1.5rem',
      h3: 'clamp(1.125rem, 0.8333333333333333rem + 1.4583333333333333vw, 2rem)', // 18~32px
      lg: '1.125rem',
      body: 'clamp(1rem, 0.9583333333333334rem + 0.20833333333333334vw, 1.125rem)', // 16~18px
      sm: '0.875rem',
      xs: '0.75rem',
    },

    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.textcolor'),
          },
        },
      }),

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

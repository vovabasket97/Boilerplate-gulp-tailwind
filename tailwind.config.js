const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.html', './src/**/*.js', './src/**/*.scss'],
  theme: {
    screens: {
      'xl': {'max': '1919px'},
      "lz": {'max': '1439px'},
      'lg': {'max': '1335px'},
      'md': {'max': '1024px'},
      "xs": {'max': '767px'}
    },
    colors: {
      "surface": "#FFFFFF",
      "background": "#E1E1E1",
      "accent": "#F58420",
      "accent-hover": "#FFA14F",
      "accent-click": "#E86D00",
      "dark": "#333333",
      "gray-light": "#F5F5F5",
      "gray": "#696969",
      "gray-dark": "#888888",
      "red": "#D55353",
      "green": "#33B667",
      "transparent": "transparent"
    },
    extend: {
      boxShadow: {
        "alert": "0px 8px 16px rgba(0, 0, 0, 0.08), 0px 4px 8px rgba(0, 0, 0, 0.08)"
      },
      fontSize: {
        "xs-10": ['0.625rem', '0.875rem'],
        "sm": ['0.875rem', '1rem']
      },
      spacing: {
        "unset": "unset",
        "4.5": "1.125rem",
        "5.5": "1.375rem",
        "7.5": "1.875rem"
      },
    },
  },
  plugins: [
    plugin(({
      addUtilities,
      e,
      theme,
      variants
    }) => {
      addUtilities({
        '.flex-gap-wrapper': {
          overflow: 'auto',
        },
        '[class*="flex-gap-"]:not([class*="flex-gap-wrapper"])': {
          margin: 'calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap))',
          '& > *': {
            margin: 'calc(var(--gap)) 0 0 calc(var(--gap))',
          },
        },
      });

      Object.entries(theme('gap')).forEach(([key, value]) => {
        addUtilities({
            [`.flex-gap-${e(key)}`]: {
              '--gap': value,
            },
          },
          variants('gap'),
        );
      });
    }),
    require('@tailwindcss/line-clamp'),
  ],
}
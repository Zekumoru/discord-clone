/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['gg sans', ...defaultTheme.fontFamily.sans],
        unisans: ['Uni Sans', ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        material:
          'rgba(0, 0, 0, 0.3) 0px 1px 2px 0px, rgba(35, 36, 38, 0.15) 0px 2px 6px 2px',
      },
      gridTemplateColumns: {
        'center-3': 'minmax(0, 1fr) 3fr minmax(0, 1fr)',
      },
      colors: {
        background: {
          100: '#383A40',
          300: '#313338',
          500: '#2C2D31',
          700: '#1E1F22',
          800: '#111214',
        },
        warmblue: {
          100: '#5A65EA',
        },
        dodgerblue: {
          100: '#00A8FC',
        },
        silvergrey: {
          100: '#D6DED6',
          300: '#B5BAC1',
          400: '#949BA4',
          600: '#6D6F78',
          800: '#4C4C4F',
        },
        jade: {
          100: '#23A55A',
        },
        crimson: {
          100: '#F23F42',
        },
        salmon: {
          100: '#FA777C',
          400: '#DF4F4B',
        },
      },
    },
  },
  plugins: [],
};

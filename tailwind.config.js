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
      colors: {
        background: {
          300: '#313338',
          700: '#1E1F22',
        },
        warmblue: {
          100: '#5865F2',
        },
        dodgerblue: {
          100: '#00A8FC',
        },
        silvergrey: {
          300: '#B5BAC1',
          400: '#949BA4',
        },
        crimson: {
          100: '#F23F42',
        },
      },
    },
  },
  plugins: [],
};

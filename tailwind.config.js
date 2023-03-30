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
        },
      },
    },
  },
  plugins: [],
};

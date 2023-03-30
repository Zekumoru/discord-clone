/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        unisans: ['Uni Sans', 'sans-serif'],
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

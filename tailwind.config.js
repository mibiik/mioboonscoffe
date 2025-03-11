/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5e9ff',
          100: '#ead4ff',
          200: '#d5a9ff',
          300: '#c07eff',
          400: '#ab53ff',
          500: '#9628ff',
          600: '#8520e0',
          700: '#7419c7',
          800: '#6213ae',
          900: '#510c95',
        },
        secondary: {
          50: '#e6f9ff',
          100: '#cdf3ff',
          200: '#9be7ff',
          300: '#69dbff',
          400: '#37cfff',
          500: '#06c3ff',
          600: '#00a9e0',
          700: '#0090c7',
          800: '#0077ae',
          900: '#005e95',
        },
        accent: {
          50: '#fff2e6',
          100: '#ffe5cc',
          200: '#ffcb99',
          300: '#ffb166',
          400: '#ff9733',
          500: '#ff7d00',
          600: '#e06d00',
          700: '#c75e00',
          800: '#ae4f00',
          900: '#954000',
        },
        tertiary: {
          50: '#e8fff0',
          100: '#d1ffe2',
          200: '#a3ffc5',
          300: '#75ffa8',
          400: '#47ff8b',
          500: '#19ff6e',
          600: '#00e057',
          700: '#00c74c',
          800: '#00ae41',
          900: '#009536',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 3s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Euclid Circular A', ...defaultTheme.fontFamily.sans],
      },
      backgroundColor: '#000000',
      colors: {
        primary: '#278ace',
        'primary-hover': '#226ea4',
        border: 'rgba(221, 218, 218, 0.2)',
        secondary: '#7EFFE8',
        blue: '#49DEFF',
        glow: '#278ace',
        'light-0': '#FFFFFF',
        'light-1': '#F0F1F3',
        'light-2': '#B1AFBB',
        'light-4': '#697b89',
        'medium-0': '#8D8B9B',
        'medium-1': '#6D6C7C',
        'dark-0': '#000000',
        'dark-1': '#0B0B0B',
        'dark-2': '#161616',
        'dark-3': '#333333',
        twitter: '#1DA1F2',
      },
    },
  },
  plugins: [],
}

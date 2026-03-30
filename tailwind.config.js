/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f5f2ec',
        'warm-black': '#0d0d0d',
        'warm-grey': '#9a9490',
        'mid-grey': '#d4cfc8',
        accent: '#c8b89a',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in-out': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollPulse: {
          '0%, 100%': { transform: 'scaleY(1)', opacity: '1' },
          '50%': { transform: 'scaleY(0.4)', opacity: '0.3' },
        },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        scrollPulse: 'scrollPulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

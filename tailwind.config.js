/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#005596',   // Habitat Blue
          green: '#54B948',  // Habitat Green
          black: '#0a0a0a',
        }
      },
      boxShadow: {
        card: '0 6px 24px -6px rgb(0 0 0 / 0.15)',
      }
    }
  },
  plugins: [],
}

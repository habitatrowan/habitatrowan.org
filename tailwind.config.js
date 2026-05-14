/** @type {import('tailwindcss').Config} */
export default {
content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          blue:  '#005596',
          green: '#54B948',
          black: '#0a0a0a',
        },
        warm: {
          50:  '#FAFAF6',
          100: '#F3F3EB',
          200: '#EAEAE0',
          300: '#D8D8CC',
          800: '#3A3A2E',
          900: '#1A1A14',
          950: '#0D1117',
        },
      },
      boxShadow: {
        card: '0 6px 24px -6px rgb(0 0 0 / 0.15)',
        'card-hover': '0 12px 40px -8px rgb(0 0 0 / 0.22)',
        warm: '0 6px 24px -6px rgba(26, 26, 20, 0.15)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #005596 0%, #54B948 100%)',
        'brand-gradient-r': 'linear-gradient(90deg, #005596 0%, #54B948 100%)',
      },
    },
  },
  plugins: [],
}

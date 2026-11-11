/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            DEFAULT: '#0A5CBA',
            light: '#0288D1',
            dark: '#063B7A',
            soft: '#E6F2FF',
          },
          green: {
            DEFAULT: '#0A8F4A',
            light: '#00C853',
            dark: '#065F31',
            soft: '#E6F7EE',
          },
          gold: {
            DEFAULT: '#C9A66B',
            light: '#DFC394',
            dark: '#9E7B42',
            soft: '#F9F3E8',
          },
          cream: {
            DEFAULT: '#F5EBDD',
            light: '#FBF7F1',
            dark: '#E8D8C1',
          },
          wood: {
            DEFAULT: '#8B5E3C',
            dark: '#5C3C24',
          },
          navy: {
            DEFAULT: '#06101E',
            card: '#0C1B30',
            border: '#172E4D',
          },
        },
      },
      fontFamily: {
        arabic: ['"Cairo"', '"Tajawal"', 'sans-serif'],
        english: ['"Poppins"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 12px 40px -10px rgba(10, 92, 186, 0.12)',
        'glass-dark': '0 16px 48px -12px rgba(0, 0, 0, 0.55)',
        gold: '0 8px 30px -6px rgba(201, 166, 107, 0.28)',
        glow: '0 0 28px rgba(2, 136, 209, 0.35)',
        'glow-green': '0 0 28px rgba(0, 200, 83, 0.35)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0A5CBA 0%, #0288D1 50%, #0A8F4A 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C9A66B 0%, #E6CFA3 50%, #9E7B42 100%)',
      },
    },
  },
  plugins: [],
};

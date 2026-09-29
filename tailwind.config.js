/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aia: {
          red: '#D31145',
          'red-dark': '#B00E3A',
          'red-light': '#FFF0F3',
          'red-subtle': '#FFE2E8',
          charcoal: '#1A1D20',
          muted: '#64748B',
          border: '#E2E8F0',
          surface: '#F8FAFC',
          card: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'aia': '0 4px 20px -2px rgba(211, 17, 69, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'aia-hover': '0 10px 25px -3px rgba(211, 17, 69, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}

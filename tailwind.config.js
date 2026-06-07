/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Calm, professional medical blue. Deep navy primary for trust,
        // chosen for strong contrast and readability for older patients.
        primary: {
          50: '#eef5fb',
          100: '#d8e8f5',
          200: '#b3d1ea',
          300: '#84b3da',
          400: '#5290c4',
          500: '#2f72ab',
          600: '#1f5a8f',
          700: '#1b4870',
          800: '#1a3c5c',
          900: '#16314b',
          950: '#0e2033',
        },
        // Soft, warm neutral for backgrounds — easier on the eye than pure white.
        sand: {
          50: '#faf9f6',
          100: '#f4f2ec',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(16, 32, 51, 0.06), 0 8px 24px -12px rgba(16, 32, 51, 0.12)',
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
}

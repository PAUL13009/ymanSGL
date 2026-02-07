/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bamboo': {
          50: '#f0f7f0',
          100: '#dce8dc',
          200: '#bdd1bd',
          300: '#96b396',
          400: '#6d8d6d',
          500: '#547154',
          600: '#425a42',
          700: '#384a38',
          800: '#2f3d2f',
          900: '#283328',
        },
        'bali': {
          50: '#fef7ed',
          100: '#fdedd3',
          200: '#fbd7a5',
          300: '#f8ba6d',
          400: '#f59433',
          500: '#f2750f',
          600: '#e35a05',
          700: '#bc4408',
          800: '#96360e',
          900: '#792f0f',
        },
        'gold': {
          DEFAULT: '#C9B037',
          light: '#D4C04A',
          dark: '#B8A030',
        },
        'beige': {
          DEFAULT: '#F5E6D3',
          50: '#F5E6D3',
          100: '#F0DDC4',
          200: '#E8D0B0',
        },
        'sable': {
          DEFAULT: '#F5E6D3',
          50: '#F5E6D3',
          100: '#F0DDC4',
          200: '#E8D0B0',
        }
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


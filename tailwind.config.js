/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans',  'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}


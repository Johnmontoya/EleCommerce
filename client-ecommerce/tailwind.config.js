/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',   // ← muy importante, usa 'class' en vez de 'media'
  theme: {
    extend: {
        backgroundImage: {
            'pending-gradient': 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
            'confirmed-gradient': 'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 100%)',
        },
    },
  },
  plugins: [],
}
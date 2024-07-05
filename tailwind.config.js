/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        custom:["Itim","cursive"]
      },
      boxShadow:{
        'customShadow2':'0 0 20px white',
        'customShadow3':'0 0 50px white'

      }
    },
  },
  plugins: [],
}
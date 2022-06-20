/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {   
      colors:{
        "main":'#DFF6FF',
        "primary":"#1363DF",
        "secondary":"#47B5FF",
        "navbar":"#06283D"
      },
  },
  },
  plugins: [],
}

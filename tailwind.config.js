/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lightgrey': 'hsl(236, 33%, 92%)', 
        'darkgreyblue': 'hsl(235, 24%, 19%)', 
        'light-grey-blue': 'hsl(234, 39%, 85%)', 
        'verydarkgreyblue': 'hsl(235, 19%, 35%)', 
        'custom-grey': '#989189', 
        'custom-tint': '#fff7f0', 
        'custom-red': '#ea7564', 
        'custom-purple': '#755cde'
      },
    },
  },
  plugins: [], 
 
}

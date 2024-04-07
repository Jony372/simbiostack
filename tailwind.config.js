/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      maxHeight:{
        '9/10':'90%',
        '7/10':'70%',
        '1/2':'50%',
        '1/3' : '33.333333%'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: ['variant', [
    '@media (prefers-color-scheme: dark) { &:not(.light *) }',
    '&:is(.dark *)',
  ]],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
  ],
  plugins: [
    require("./src/lib/tailwind"),
  ],
  safelist: [
    'btn-info',
    'btn-warn',
    'btn-error',
    'btn-alpha',
  ],
};
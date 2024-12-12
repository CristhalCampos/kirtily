/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        'bg-light': '[#F0F0F0]',
        'bg-dark': '[#1E1E1E]',
        'text-light': '[#000000]',
        'text-dark': '[#FFFFFF]',
        'title-light': '[#3B8AD9]',
        'title-dark': '[#FFD27F]',
        'btn-light': '[#FF9E4D]',
        'btn-dark': '[#3B8AD9]',
      },
    },
  },
  plugins: [],
}


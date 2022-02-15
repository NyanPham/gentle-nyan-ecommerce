module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.5s ease-in forwards",
        spinner: 'spinner 2s linear infinite'
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: 'translateY(20px)' },
          "100%": { opacity: 1, transform: 'translateY(0)' } 
        },
        spinner: {
          "0%": { transform: 'rotate(0deg)' },
          "100%": { transform: 'rotate(360deg)' }
        }
      },
    },
  },
  variants: {
    animation: ["motion-safe"]
  },
  plugins: [],
}

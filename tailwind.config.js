module.exports = {
  content: [
    "./client/index.html",
    "./client/app.js",
    "./client/src/**/*.{js,html}"
  ],
  theme: {
    extend: {
      borderColor: {
        border: 'hsl(20, 5.9%, 90%)',
        'accent-cyan': 'hsl(180, 100%, 50%)',
        'accent-orange': 'hsl(30, 100%, 50%)'
      },
      colors: {
        'primary-bg': 'hsl(214, 67%, 14%)',
        'accent-cyan': 'hsl(180, 100%, 50%)',
        'accent-orange': 'hsl(30, 100%, 50%)',
        'card-bg': 'hsl(211, 59%, 25%)',
        'text-light': 'hsl(210, 20%, 88%)',
      }
    }
  },
  plugins: [],
} 
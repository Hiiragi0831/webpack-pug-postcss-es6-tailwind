module.exports = {
  mode: 'jit',
  purge: {
    enabled: 'webpack --mode=production',
    content: [
      './src/views/*.pug',
      './src/views/blog/*.pug'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary-color': 'var(--primary-color)',
        'text-color': 'var(--text-color)',
        'accent-color': 'var(--accent-color)',
        'color-color': 'var(--bg-color)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}

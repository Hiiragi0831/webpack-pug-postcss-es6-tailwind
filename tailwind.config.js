module.exports = {
  mode: 'jit',
  purge: {
    enabled: 'webpack --mode=production',
    content: [
      './src/views/*.pug',
      './src/views/*/*.pug',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        cyan: '#9cdbff',
        'lightseagreen': '#29c59c',
        'darkslategray': '#1f273e',
      },
      spacing: {
        '96': '24rem',
        '128': '32rem',
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}

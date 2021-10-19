module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-nested': {},
    'postcss-extend': {},
    'postcss-simple-vars': {},
    'postcss-preset-env': {
      browsers: ['last 2 versions', '> 5%'],
    },
    'tailwindcss': { config: './tailwind.config.js' },
  },
};

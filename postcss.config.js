module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-preset-env': {
      browsers: ['last 2 versions', '> 5%'],
    },
    'tailwindcss': { config: './tailwind.config.js' },
  },
};

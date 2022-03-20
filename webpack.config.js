const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{test: /\.txt$/, use: 'raw-loader'}],
  },
};

module.exports = {
  resolve: {
    extensions: ['js', 'ts'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets/*': path.resolve(__dirname, './src/assets/*'),
      '@components/*': path.resolve(__dirname, './src/components/*'),
      '@services/*': path.resolve(__dirname, './src/services/*'),
      '@utils/*': path.resolve(__dirname, './src/utils/*'),
      '@views/*': path.resolve(__dirname, './src/views/*'),
    },
  },
};

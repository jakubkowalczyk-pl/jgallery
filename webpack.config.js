const path = require('path');
const WrapperPlugin = require('wrapper-webpack-plugin');

module.exports = (params = {}) => ({
  mode: params.mode || 'development',
  entry: './src/index.ts',
  output: {
    filename: params.filename || 'jgallery.js',
    publicPath: 'js/',
    library: 'JGallery',
    libraryTarget: 'var',
    path: path.resolve(__dirname, 'dist', 'js')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    contentBase: 'dist/',
    overlay: {
      errors: true,
      warnings: true
    }
  },
  plugins: [
    new WrapperPlugin({
      test: /\.js$/,
      header: '(function(){',
      footer: 'if (typeof window !== "undefined") window.JGallery = JGallery.default; if (typeof module !== "undefined") module.exports = JGallery; })()'
    })
  ],
  module: {
    rules: [
      { test: /\.ts$/, use: ['ts-loader'], exclude: /node_modules/ },
    ]
  }
});
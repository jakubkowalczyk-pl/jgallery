var path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    publicPath: '/assets/',
    path: path.resolve(__dirname, 'dist', 'assets')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    overlay: {
      errors: true,
      warnings: true
    }
  },
  module: {
    rules: [
      { test: /\.ts$/, use: ['ts-loader'], exclude: /node_modules/ },
      { test: /\.scss$/, use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]'
          }
        },
        {
          loader: "sass-loader"
        }
      ], exclude: /node_modules/ }
    ]
  }
};
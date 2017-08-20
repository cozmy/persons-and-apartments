const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: './app.ts'
  },
  externals: [nodeExternals()],
  module: {
    rules: [{
      exclude: /node_modules/,
      loader: 'ts-loader',
      test: /\.ts$/
    }]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};

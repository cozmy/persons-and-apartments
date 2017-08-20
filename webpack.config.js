const path = require('path');
const nodeExternals = require('webpack-node-externals');

const inProduction = process.env.NODE_ENV === 'production';

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
  node: false,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, inProduction ? 'docker/node' : 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};

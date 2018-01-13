const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: './index',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js'
  },
  
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2017', 'react']
        }
      },
      {
        test: /\.css$/,
        loaders: 'style-loader!css-loader'
      }
    ]
  },
}
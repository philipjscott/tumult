const path = require('path')

module.exports = {
  entry: './docs/demo.js',
  output: {
    filename: 'tumult.js',
    path: path.resolve(__dirname, 'docs')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './docs'
  }
}


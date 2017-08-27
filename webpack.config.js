const path = require('path')

module.exports = {
  entry: './docs/demo.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './docs'
  }
}


// webpack.config.js

module.exports = {
  entry: './lib/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      }
    ]
  }

}

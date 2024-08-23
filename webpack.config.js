const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, 'src/index.js'),
  },
  output: {
    path: path.join(__dirname, 'public/javascripts'),
    filename: '[name].js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/, // Tambahkan exclude untuk mempercepat proses build
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Gunakan 'use' alih-alih 'loader' untuk array loaders
      }
    ]
  }
};

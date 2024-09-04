// const path = require('path');

// module.exports = {
//   mode: 'development',
//   entry: {
//     app: path.join(__dirname, 'src/index.js'),
//   },
//   output: {
//     path: path.join(__dirname, 'public/javascripts'),
//     filename: '[name].js'
//   },
//   devtool: 'inline-source-map',
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/, 
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react'],
//           },
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'], 
//       }
//     ]
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'], 
//   },
// };

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
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], 
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], 
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, 
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]', 
            },
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'], 
  },
};

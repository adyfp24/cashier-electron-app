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
    app: path.join(__dirname, 'src/index.js'), // or index.jsx if that's your entry
  },
  output: {
    path: path.join(__dirname, 'public/javascripts'),
    filename: '[name].js',
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
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader', // ✅ Add this for Tailwind support
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, 
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              esModule: false,
            },
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'], 
  },
};

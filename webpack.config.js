const path = require("path");
const autoprefixer = require('autoprefixer');
const Html = require('html-webpack-plugin');
const MiniCSS = require("mini-css-extract-plugin");


const entryPath = "development";
const entryFile = "app.js";

module.exports = {
  entry: `./${entryPath}/js/${entryFile}`,
  output: {
    filename: "out.js",
    path: path.resolve(__dirname, `./build`)
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, `${entryPath}`),
    publicPath: "/build/",
    compress: true,
    port: 3005,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          // MiniCSS.loader,
          {
            loader:'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          publicPath: `./images/`,
          outputPath: `/images/`
        }
      }
    ]
  },
  plugins: [
    new Html({
      filename: `index.html`,
      template: `${entryPath}/index.html`
    }),
    new MiniCSS({
      filename: "main.css",
    })
  ]
};
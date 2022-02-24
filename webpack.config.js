const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve("dist"),
    publicPath: "/",
  },
  devServer: {
    port: 8001,
    historyApiFallback: true,
  },
  module: {
    rules:[
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
      }
    ], 
  },
  externals: {
        'ConfigData': {
            studentapi: 'http://127.0.0.1:5000/api/student/',
            citzenapi: 'http://127.0.0.1:5001/api/citizen_of/'
        }
    }
}
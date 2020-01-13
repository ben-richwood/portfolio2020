const path = "/Library/WebServer/Documents/php/portfolio2019/";
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // entry: "./src/assets/js/**/*.js",
  context: path,
  entry: "./src/assets/js/main.js",
  // watch: true,
  output: {
    path: path + "dist/assets/js",
    filename: "bundle.js"
  },
  optimization: {
    minimizer: [new UglifyJsPlugin(
      {sourceMap: true}
    )],
  },

  devtool: "cheap-eval-source-map",
  // plugins: [
  //   new webpack.SourceMapDevToolPlugin({})
  // ],

  // Required for Vue
  resolve: {
      alias: {
          vue: 'vue/dist/vue.js'
      },
  }

}
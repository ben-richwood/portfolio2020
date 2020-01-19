const path = "/Library/WebServer/Documents/php/portfolio2019/";
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// const env = process.env.NODE_ENV
//
//   const config = {
//    mode: env || 'development'
// }

module.exports = (env, options) => {
    console.log(`This is the Webpack 4 'mode': ${options.mode}`);
    return {

    // module.exports = {
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
      },
      watch: options.mode === "development" ? true : false
    }

}
const path = require('path')
var webpack = require('webpack')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// const env = process.env.NODE_ENV
//
//   const config = {
//    mode: env || 'development'
// }

module.exports = (env, options) => {
    console.log(`This is the Webpack 4 'mode': ${options.mode}`);

    return {

      context: path.resolve(__dirname),
      entry: path.resolve(__dirname, 'src/assets/js/main_timeline.js'),
      output: {
        path: path.resolve(__dirname, 'dist/assets/js'),
        // path: path + "dist/assets/js",
        filename: "bundle_project.js"
      },
      optimization: {
        minimizer: [new UglifyJsPlugin(
          {sourceMap: true}
        )],
      },
      target: "web",
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
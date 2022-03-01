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
      // mode: 'production',
      context: path.resolve(__dirname),
      entry: path.resolve(__dirname, 'src/assets/js/app.js'),
      output: {
        path: path.resolve(__dirname, 'dist/assets/js'),
        // path: path + "dist/assets/js",
        filename: "bundle_project.js"
      },
      optimization: {
        minimizer: [new UglifyJsPlugin(
          {sourceMap: true}
        )],
        usedExports: true,
      },
      target: "web",
      devtool: process.env.NODE_ENV === 'production' ? false : "cheap-eval-source-map",


      // Required for Vue
      resolve: {
          alias: {
            vue: process.env.NODE_ENV === 'production' ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js'
          },
      },
      watch: options.mode === "development" ? true : false
    }
}
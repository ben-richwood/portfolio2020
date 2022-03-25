
const path = require('path')
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const logger = require('node-color-log');

const packageJson = require("./package.json");

// const env = process.env.NODE_ENV
//
//   const config = {
//    mode: env || 'development'
// }

var environment = "local" // Default value
var baseUrl = "http://127.0.0.1:8080/";

var setupAPI = function () {
  switch(process.env.NODE_ENV){
    case 'production':
      environment = "production";
      baseUrl = "https://richebois.fr/"
      break;
  }
}

setupAPI();

module.exports = (env, options) => {
    // LOGS
  logger.color('green').log("Webpack 5 running. 'mode' ").joint().bgColor('green').color('black').bold().log(environment);
  logger.color('black').bgColor('cyan').log("")
  logger.bgColor('yellow').color('black').log("PLEASE run PHP server simulteaneously");
  logger.color('yellow').log("baseUrl.....................................").joint().bgColor('yellow').color('black').bold().log(baseUrl);

  logger.color('black').bgColor('cyan')
  if (environment === "local") {
    logger.color('black').bgColor('cyan').bold()
      .log('\nWatching files...............................\n');
  }

  return {
    // mode: 'production',
    mode: environment === "production" ? 'production' : 'development',
    context: path.resolve(__dirname),
    target: 'web',
    entry: path.resolve(__dirname, 'src/assets/js/app.js'),
    output: {
      path: path.resolve(__dirname, 'dist/assets/js'),
      // path: path + "dist/assets/js",
      filename: "bundle_project.js"
    },
    devServer: {
      contentBase: path.join(__dirname, "dist/"),
      port: 8080,
      publicPath: "http://localhost:3000/dist/",
    },
    optimization: {
      usedExports: true, // Tree Shaking
			minimize: environment !== "local",
			minimizer: [new TerserPlugin()] // required for security issue thrown by NPM
    },
    // devtool: process.env.NODE_ENV === 'production' ? false : "cheap-eval-source-map",
    devtool: process.env.NODE_ENV === 'production' ? false : "inline-source-map",
    stats: 'errors-warnings', // detailed, errors-only, errors-warnings, verbose
    watch: environment === "local" ? true : false,

    // Required for Vue
    resolve: {
      alias: {
        // 'vue$': 'vue/dist/vue.esm.js',
        vue: process.env.NODE_ENV === 'production' ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js'
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }, {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
				BASEURL: JSON.stringify(baseUrl),
        DEBUG: environment === "local" ? true : false,
				ENV: JSON.stringify(environment),
				THREE_VERSION: JSON.stringify(packageJson.dependencies["three"]),
				VUE_VERSION: JSON.stringify(packageJson.dependencies["vue"]),
      }),
    ],
  }
}

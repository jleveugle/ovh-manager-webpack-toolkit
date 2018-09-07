const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RemcalcPlugin = require('less-plugin-remcalc');
const WebpackBar = require('webpackbar');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const _ = require('lodash');

module.exports = (opts) => ({
  plugins: [
    new CopyWebpackPlugin(_.get(opts, "assets.files", []), _.get(opts, "assets.options", {})),
    new HtmlWebpackPlugin({
      template: opts.template,
    }),
    new WebpackBar(),
  ],
  resolveLoader: {
    modules: [ path.resolve('./node_modules') ]
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          }, {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'resolve-url-loader',
            options: {
                root: opts.root,
            },
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              sourceMap: true,
              plugins: [
                RemcalcPlugin,
              ],
              paths: opts.lessPath,
              relativeUrls: false,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS
        ],
      },
      {
        test: /\.xml$/,
        loader: path.resolve(__dirname, './loaders/translations.js'),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'angular-template-url-loader',
            options: {
                basePath: opts.basePath,
            }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                'angularjs-annotate',
              ],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{
            loader: path.resolve(__dirname, './loaders/ui-router-translations.js'),
            options: {
                root: opts.root,
            }
        }]
        },
    //   {
    //     // ESLint is only used for the packages folder, at this moment, we can't merge rules
    //     // because we want to use babel and ngAnnotate all our code and dependencies if needed
    //     // But we don't want to check all our dependencies with ESLint
    //     // (+ webpack follow symlinks by default)
    //     // If you use this rule for babel, we will have some issues in production with obfuscation
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     include: /packages/,
    //     enforce: 'pre',
    //     use: [
    //       {
    //         loader: 'eslint-loader',
    //         options: {
    //           configFile: path.join(__dirname, '../../.eslintrc'),
    //         },
    //       },
    //     ],
    //   },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: path.resolve(process.cwd(), "node_modules"),
          name: "vendor",
          enforce: true
        }
      }
    }
  }
});

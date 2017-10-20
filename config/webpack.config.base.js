const helpers = require('./helpers'),
  CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
  entry: {
    'main': helpers.root('/src/main.ts'),
    'file': helpers.root('/src/pages/file/main.ts'),
    'login': helpers.root('/src/pages/login/main.ts'),
  },
  output: {
    path: helpers.root('/dist'),
    filename: 'js/[name].[hash].js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.html'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': helpers.root('/src'),
      'common': helpers.root('/src/common'),
      'components': helpers.root('/src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: ['./src/index.html']
      }
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: './assets'
    }, ]),
  ],
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

module.exports = config;

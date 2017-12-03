const helpers = require('./helpers'),
  webpackConfig = require('./webpack.config.base'),
  DefinePlugin = require('webpack/lib/DefinePlugin'),
  env = require('../environment/dev.env');

webpackConfig.module.rules = [...webpackConfig.module.rules,
  {
    test: /\.scss$/,
    use: [{
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'sass-loader'
      }
    ]
  },
  {
    test: /\.css$/,
    loader: ['style-loader', 'css-loader']
  },
  // {
  //   test: /\.(html)$/,
  //   use: {
  //     loader: 'html-loader'
  //   }
  // },
  {
    test: /\.(ico|jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
    loader: "file-loader"
  }
];

webpackConfig.plugins = [...webpackConfig.plugins,
  new DefinePlugin({
    'process.env': env
  })
];

webpackConfig.devServer = {
  port: 8080,
  disableHostCheck: true,
  host: 'localhost',
  historyApiFallback: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  contentBase: './src',
  open: true
};

module.exports = webpackConfig;

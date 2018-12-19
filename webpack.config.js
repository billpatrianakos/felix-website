const path                  = require('path');
const CleanWebpackPlugin    = require('clean-webpack-plugin');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const webpack               = require('webpack');

module.exports = (env, argv) => {
  console.log('ENV is: ', argv.mode);

  const apiUrl = argv.mode === 'production' ? 'https://felixandfriends.net' : 'http://localhost:9000';

  return {
    context: path.resolve(__dirname, 'client'),
    entry: {
      main: './js/main.js',
      admin: './js/admin.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader", "eslint-loader"]
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'less-loader'
          ]
        },
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" }
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: true
              }
            }
          ]
        },
        {
          test: /\.(png|jp(e*)g|svg)$/,  
          use: [{
            loader: 'url-loader',
            options: { 
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]'
            }
          }]
        }
      ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'client'),
      historyApiFallback: true,
      port: 8080,
      open: true,
      proxy: {
        '/api': 'http://localhost:9000'
      }
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        template: 'index.html',
        chunks: ['main']
      }),
      new HtmlWebpackPlugin({
        filename: 'admin/index.html',
        template: 'admin/index.html',
        chunks: ['admin']
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(apiUrl),
        'process.env.ABOUT_TEXT': JSON.stringify('The about text'),
        'process.env.SITE_TITLE': JSON.stringify('Site Title')
      })
    ]
  }
};

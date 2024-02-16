const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/script.tsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.[contenthash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@components': path.resolve('./src/Components'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new EslintWebpackPlugin({
      files: '{**/*,*}.{tsx,js,ts}',
    }),
    new StylelintWebpackPlugin({
      files: '{**/*,*}.css',
    }),
  ],
  devServer: {
    open: true,
    overlay: true,
    historyApiFallback: true,
  },
  performance: {
    hints: false,
  },
};

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?modules'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    // node_modulesで使用する js ファイル用の拡張子も必要
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'React Boilerplate',
      multiStep: true,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
  ],
};

export default config;

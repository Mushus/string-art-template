import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import { Configuration } from 'webpack';

const outputPath = path.join(__dirname, 'docs');

const config: Configuration = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: outputPath,
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
    new WebpackPwaManifest({
      name: '糸掛けテンプレート',
      short_name: '糸掛け',
      description: '糸掛け用のテンプレートを作成します',
      background_color: '#fff',
      display: 'standalone',
      orientation: 'landscape',
      icons: [
        {
          src: path.resolve('src/assets/icon.png'),
          sizes: [512],
        },
      ],
      inject: true,
      ios: true,
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: path.join(outputPath, 'sw.js'),
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};

export default config;

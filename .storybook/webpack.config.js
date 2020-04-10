const path = require('path');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      },
    ],
  });
  config.resolve.alias['~'] = path.resolve(__dirname, '../src');
  config.resolve.alias['@'] = path.resolve(__dirname, '../');
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};

const path = require('path');

const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

const srcPath = path.resolve(__dirname, '..', 'src')

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  config.module.rules.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
    include: srcPath,
  });

  config.resolve.modules = [srcPath, 'node_modules']

  return config;
};

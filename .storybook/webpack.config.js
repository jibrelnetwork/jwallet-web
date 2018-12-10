const path = require('path');

const srcPath = path.resolve(__dirname, '..', 'src')

module.exports = (baseConfig) => {
  baseConfig.module.rules.push({
    test: /\.s?css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
        }
      },
      'sass-loader'
    ],
  })
  baseConfig.module.rules.push({
    test: /\.svg$/,
    loader: 'file-loader',
    options: {
      name: 'static/media/[name].[hash:8].[ext]',
    }
  })

  baseConfig.resolve.modules = [srcPath, 'node_modules']

  return baseConfig
};

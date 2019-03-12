const path = require('path');
const webpack = require('webpack')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

const srcPath = path.resolve(__dirname, '..', 'src')

module.exports = (baseConfig, env) => {
  baseConfig.module.rules.push({
    test: /\.scss$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 2,
        },
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('autoprefixer')({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 11',
              ],
              flexbox: 'no-2009',
            }),
          ],
        },
      },
      {
        loader: require.resolve('sass-loader'),
        options: {
          includePaths: [
            path.resolve('src'),
          ],
        },
      },
    ],
  })

  baseConfig.module.rules.push({
    test: /\.svg$/,
    exclude: [
      path.resolve(srcPath, 'public/assets/icons/sprite-pack'),
      path.resolve(srcPath, 'public/assets/tokens'),
    ],
    loader: 'file-loader',
    options: {
      name: 'static/media/[name].[hash:8].[ext]',
    }
  })

  baseConfig.module.rules.push({
    test: /\.svg$/,
    include: [
      path.resolve(srcPath, 'public/assets/icons/sprite-pack'),
      path.resolve(srcPath, 'public/assets/tokens'),
    ],
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          spriteFilename: '[hash:8].sprite.svg',
          publicPath: '/static/media/',
        },
      },
      {
        loader: 'svgo-loader',
        options: {
          plugins: [
            { removeTitle: true },
            { removeDoctype: true },
            { removeComments: true },
            { collapseGroups: true },
            { convertPathData: true },
            { removeDimensions: true },
            { convertTransform: true },
            { removeUselessDefs: true },
            { removeUselessStrokeAndFill: true },
            { removeNonInheritableGroupAttrs: true },
            { removeStyleElement: true },
            { removeAttrs: { attrs: '(fill|stroke)' } },
          ],
        },
      },
    ],
  })

  baseConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BUILD_NUMBER': 'dev',
      '__DEV__': true,
      '__PROD__': false,
      '__DEFAULT_TICKER_API__': '{}',
      '__DEFAULT_BLOCKEXPLORER_API__': '{}',
    })
  )

  baseConfig.plugins.push(
    new SpriteLoaderPlugin()
  )

  baseConfig.resolve.modules = [
    ...baseConfig.resolve.modules,
    srcPath
  ]

  return baseConfig
}
